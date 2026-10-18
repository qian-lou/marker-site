"""Exercise signed release staging with temporary build artifacts."""

from __future__ import annotations

import base64
import json
import os
from pathlib import Path
import shutil
import tempfile
import unittest
from unittest.mock import patch

import release


VERSION = "0.2.0"
COMMIT = "a" * 40
PUBLIC_KEY = base64.b64encode(
    b"untrusted comment: minisign public key: A49EF4746FA6E6D7\n"
    b"RWTX5qZvdPSepDGWg2bz8n6ArQnBMwgQK1geVosorcbLzcunD+KJ+cYe\n"
).decode("ascii")
SIGNATURE = base64.b64encode(
    b"untrusted comment: signature from tauri secret key\n"
    b"RUTX5qZvdPSepPF2zsjvP/L/TQtBLRnWRvaq+4omK1UEugtQp/USrGiI1v762sDy3id3aor7bRC9ETyeot6lMHHrWoZ5hjUM1Qc=\n"
    b"trusted comment: timestamp:1791649051\tfile:payload\tversion:2.0.0\n"
    b"DDq2CLOEl5cQmC2eJRHlnZPVViOZsu1CjpPKQoei4A/XBfkDqGO0B+QMrcrHgEQ5qV3mne75tdFWhJpqUXh9AA=="
).decode("ascii")


class ReleaseTests(unittest.TestCase):
    def setUp(self) -> None:
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        previous = Path.cwd()
        self.addCleanup(os.chdir, previous)
        os.chdir(temporary.name)
        self.root = Path.cwd()
        environment = patch.dict(os.environ, {"RELEASE_VERSION": VERSION, "SOURCE_COMMIT": COMMIT})
        environment.start()
        self.addCleanup(environment.stop)
        self.config = Path("source/apps/desktop/src-tauri/tauri.conf.json")
        self.config.parent.mkdir(parents=True)
        self.config.write_text(json.dumps({"plugins": {"updater": {"pubkey": PUBLIC_KEY}}}), encoding="utf-8")

    def create_bundle(self, platform: str) -> Path:
        root = self.root / f"bundle-{platform}"
        for folder, suffix in release.BUNDLES[platform]:
            path = root / folder / f"Original{suffix}"
            path.parent.mkdir(parents=True, exist_ok=True)
            contents = f"{SIGNATURE}\n" if suffix.endswith(".sig") else f"{platform} {suffix} package"
            path.write_text(contents, encoding="utf-8")
        return root

    def collect_bundle(self, platform: str, root: Path) -> None:
        with patch.dict(os.environ, {"RELEASE_PLATFORM": platform, "BUNDLE_ROOT": str(root)}):
            release.collect()

    def prepare_downloads(self) -> None:
        downloads = self.root / "downloads"
        downloads.mkdir()
        for platform in release.BUNDLES:
            self.collect_bundle(platform, self.create_bundle(platform))
            shutil.move("release-assets", downloads / f"installer-{platform}")

    def update_manifest(self, folder: Path) -> None:
        path = folder / "manifest.json"
        manifest = json.loads(path.read_text(encoding="utf-8"))
        manifest["files"] = [
            release.file_record(file)
            for file in sorted(folder.iterdir())
            if file.name != "manifest.json"
        ]
        path.write_text(json.dumps(manifest), encoding="utf-8")

    def test_collect_and_verify_produce_correct_signed_update_targets(self) -> None:
        self.prepare_downloads()
        shutil.rmtree("source")
        release.verify()
        latest = json.loads(Path("release/latest.json").read_text(encoding="utf-8"))
        self.assertEqual(latest["version"], VERSION)
        expected = {
            "darwin-aarch64-app": "macos-arm64.app.tar.gz",
            "darwin-x86_64-app": "macos-x64.app.tar.gz",
            "windows-x86_64-nsis": "windows-x64.exe",
            "linux-x86_64-deb": "linux-x64.deb",
            "linux-x86_64-appimage": "linux-x64.AppImage",
        }
        self.assertEqual(set(latest["platforms"]), set(expected))
        for target, filename in expected.items():
            self.assertEqual(latest["platforms"][target], {
                "url": f"https://github.com/qian-lou/marker-site/releases/download/v{VERSION}/Marker_{VERSION}_{filename}",
                "signature": SIGNATURE,
            })
        manifest = json.loads(Path("release-manifest.json").read_text(encoding="utf-8"))
        self.assertEqual(manifest["source_commit"], COMMIT)
        self.assertEqual(manifest["version"], VERSION)
        actual_files = [release.file_record(path) for path in Path("release").iterdir()]
        self.assertEqual(
            sorted(manifest["files"], key=lambda item: item["name"]),
            sorted(actual_files, key=lambda item: item["name"]),
        )
        checksums = Path("release/SHA256SUMS.txt").read_text(encoding="utf-8")
        self.assertIn(f"{release.sha256(Path('release/latest.json'))}  latest.json\n", checksums)
        for record in manifest["files"]:
            if record["name"] != "SHA256SUMS.txt":
                self.assertIn(f"{record['sha256']}  {record['name']}\n", checksums)

    def test_collect_requires_an_updater_signature(self) -> None:
        root = self.create_bundle("macos-arm64")
        (root / "macos/Original.app.tar.gz.sig").unlink()
        with self.assertRaisesRegex(ValueError, "Expected exactly one"):
            self.collect_bundle("macos-arm64", root)

    def test_collect_rejects_duplicate_updater_packages(self) -> None:
        root = self.create_bundle("macos-arm64")
        (root / "macos/Second.app.tar.gz").write_bytes(b"another package")
        with self.assertRaisesRegex(ValueError, "Expected exactly one"):
            self.collect_bundle("macos-arm64", root)

    def test_collect_rejects_symbolic_links(self) -> None:
        root = self.create_bundle("windows-x64")
        installer = root / "nsis/Original.exe"
        real = self.root / "outside.exe"
        installer.rename(real)
        installer.symlink_to(real)
        with self.assertRaisesRegex(ValueError, "outside the bundle directory"):
            self.collect_bundle("windows-x64", root)

    def test_collect_rejects_malformed_signatures(self) -> None:
        root = self.create_bundle("windows-x64")
        (root / "nsis/Original.exe.sig").write_text("not a Tauri signature", encoding="utf-8")
        with self.assertRaisesRegex(ValueError, "signature"):
            self.collect_bundle("windows-x64", root)

    def test_collect_rejects_signatures_for_a_different_package(self) -> None:
        root = self.create_bundle("windows-x64")
        (root / "nsis/Original.exe.sig").rename(root / "nsis/Different.exe.sig")
        with self.assertRaisesRegex(ValueError, "no matching package"):
            self.collect_bundle("windows-x64", root)

    def test_collect_rejects_a_signing_key_different_from_source_config(self) -> None:
        public_lines = base64.b64decode(PUBLIC_KEY).decode("ascii").splitlines()
        key = bytearray(base64.b64decode(public_lines[1]))
        key[2] ^= 1
        public_lines[1] = base64.b64encode(key).decode("ascii")
        other_key = base64.b64encode("\n".join(public_lines).encode("ascii")).decode("ascii")
        self.config.write_text(json.dumps({"plugins": {"updater": {"pubkey": other_key}}}), encoding="utf-8")
        with self.assertRaisesRegex(ValueError, "does not match the configured updater public key"):
            self.collect_bundle("windows-x64", self.create_bundle("windows-x64"))

    def test_verify_requires_all_platforms(self) -> None:
        self.prepare_downloads()
        shutil.rmtree("downloads/installer-macos-x64")
        with self.assertRaisesRegex(ValueError, "complete set"):
            release.verify()

    def test_verify_rejects_missing_signatures(self) -> None:
        self.prepare_downloads()
        Path(f"downloads/installer-linux-x64/Marker_{VERSION}_linux-x64.deb.sig").unlink()
        with self.assertRaisesRegex(ValueError, "unexpected or missing files"):
            release.verify()

    def test_verify_rejects_unexpected_files(self) -> None:
        self.prepare_downloads()
        Path("downloads/installer-windows-x64/private-source.rs").write_bytes(b"not publishable")
        with self.assertRaisesRegex(ValueError, "unexpected or missing files"):
            release.verify()

    def test_verify_rejects_tampered_packages(self) -> None:
        self.prepare_downloads()
        Path(f"downloads/installer-linux-x64/Marker_{VERSION}_linux-x64.AppImage").write_bytes(b"changed")
        with self.assertRaisesRegex(ValueError, "checksum or size"):
            release.verify()

    def test_verify_rejects_different_source_commit(self) -> None:
        self.prepare_downloads()
        path = Path("downloads/installer-macos-arm64/manifest.json")
        manifest = json.loads(path.read_text(encoding="utf-8"))
        manifest["source_commit"] = "b" * 40
        path.write_text(json.dumps(manifest), encoding="utf-8")
        with self.assertRaisesRegex(ValueError, "different release metadata"):
            release.verify()

    def test_verify_rejects_different_release_version(self) -> None:
        self.prepare_downloads()
        path = Path("downloads/installer-windows-x64/manifest.json")
        manifest = json.loads(path.read_text(encoding="utf-8"))
        manifest["version"] = "0.1.0"
        path.write_text(json.dumps(manifest), encoding="utf-8")
        with self.assertRaisesRegex(ValueError, "different release metadata"):
            release.verify()

    def test_verify_requires_one_public_key_fingerprint_across_platforms(self) -> None:
        self.prepare_downloads()
        path = Path("downloads/installer-windows-x64/manifest.json")
        manifest = json.loads(path.read_text(encoding="utf-8"))
        manifest["updater_public_key_sha256"] = "b" * 64
        path.write_text(json.dumps(manifest), encoding="utf-8")
        with self.assertRaisesRegex(ValueError, "different updater public keys"):
            release.verify()

    def test_verify_rejects_missing_public_key_metadata(self) -> None:
        self.prepare_downloads()
        path = Path("downloads/installer-macos-arm64/manifest.json")
        manifest = json.loads(path.read_text(encoding="utf-8"))
        del manifest["updater_public_key_sha256"]
        path.write_text(json.dumps(manifest), encoding="utf-8")
        with self.assertRaisesRegex(ValueError, "missing valid updater public key metadata"):
            release.verify()

    def test_verify_rejects_signing_key_changes_even_when_checksums_match(self) -> None:
        self.prepare_downloads()
        folder = Path("downloads/installer-linux-x64")
        signature = folder / f"Marker_{VERSION}_linux-x64.AppImage.sig"
        lines = base64.b64decode(signature.read_text(encoding="utf-8")).decode("ascii").splitlines()
        raw_signature = bytearray(base64.b64decode(lines[1]))
        raw_signature[2] ^= 1
        lines[1] = base64.b64encode(raw_signature).decode("ascii")
        signature.write_bytes(base64.b64encode("\n".join(lines).encode("ascii")))
        self.update_manifest(folder)
        with self.assertRaisesRegex(ValueError, "does not match the configured updater public key"):
            release.verify()

    def test_verify_rejects_invalid_signature_even_when_checksums_match(self) -> None:
        self.prepare_downloads()
        folder = Path("downloads/installer-linux-x64")
        (folder / f"Marker_{VERSION}_linux-x64.AppImage.sig").write_text("bad signature", encoding="utf-8")
        self.update_manifest(folder)
        with self.assertRaisesRegex(ValueError, "signature"):
            release.verify()

    def test_signature_size_is_bounded(self) -> None:
        path = Path("oversized.sig")
        path.write_bytes(b"a" * (release.MAX_SIGNATURE_BYTES + 1))
        with self.assertRaisesRegex(ValueError, "size limit"):
            release.read_signature(path)

    def test_invalid_release_identity_is_rejected(self) -> None:
        for version, commit in (("not-semver", COMMIT), (VERSION, "short")):
            with self.subTest(version=version, commit=commit):
                with patch.dict(os.environ, {"RELEASE_VERSION": version, "SOURCE_COMMIT": commit}):
                    with self.assertRaisesRegex(ValueError, "identity|version or source commit"):
                        release.release_identity()


if __name__ == "__main__":
    unittest.main()
