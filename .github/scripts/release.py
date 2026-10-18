"""Validate release metadata and stage signed desktop updates for publication."""

from __future__ import annotations

import argparse
import base64
import binascii
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess


BUNDLES: dict[str, tuple[tuple[str, str], ...]] = {
    "macos-arm64": (("dmg", ".dmg"), ("macos", ".app.tar.gz"), ("macos", ".app.tar.gz.sig")),
    "macos-x64": (("dmg", ".dmg"), ("macos", ".app.tar.gz"), ("macos", ".app.tar.gz.sig")),
    "windows-x64": (("nsis", ".exe"), ("nsis", ".exe.sig")),
    "linux-x64": (
        ("deb", ".deb"), ("deb", ".deb.sig"),
        ("appimage", ".AppImage"), ("appimage", ".AppImage.sig"),
    ),
}
UPDATER_TARGETS: dict[str, tuple[tuple[str, str], ...]] = {
    "macos-arm64": (("darwin-aarch64-app", ".app.tar.gz"),),
    "macos-x64": (("darwin-x86_64-app", ".app.tar.gz"),),
    "windows-x64": (("windows-x86_64-nsis", ".exe"),),
    "linux-x64": (("linux-x86_64-deb", ".deb"), ("linux-x86_64-appimage", ".AppImage")),
}
RELEASE_DOWNLOADS = "https://github.com/qian-lou/marker-site/releases/download"
MAX_SIGNATURE_BYTES = 16 * 1024
VERSION_PATTERN = re.compile(
    r"(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)"
    r"(?:-(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)"
    r"(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*)?"
)


def release_identity() -> tuple[str, str]:
    version = os.environ.get("RELEASE_VERSION", "")
    commit = os.environ.get("SOURCE_COMMIT", "")
    if not VERSION_PATTERN.fullmatch(version) or not re.fullmatch(r"[0-9a-f]{40}", commit):
        raise ValueError("Release version or source commit is invalid")
    return version, commit


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def file_record(path: Path) -> dict[str, object]:
    if path.is_symlink() or not path.is_file() or path.stat().st_size == 0:
        raise ValueError("A release asset is missing, empty, or a symbolic link")
    return {"name": path.name, "size": path.stat().st_size, "sha256": sha256(path)}


def updater_key_metadata() -> tuple[str, str]:
    config = json.loads(Path("source/apps/desktop/src-tauri/tauri.conf.json").read_text(encoding="utf-8"))
    plugins = config.get("plugins") if isinstance(config, dict) else None
    updater = plugins.get("updater") if isinstance(plugins, dict) else None
    pubkey = updater.get("pubkey") if isinstance(updater, dict) else None
    if not isinstance(pubkey, str) or len(pubkey) > MAX_SIGNATURE_BYTES:
        raise ValueError("The source updater public key is missing or invalid")
    try:
        lines = base64.b64decode(pubkey, validate=True).decode("utf-8").splitlines()
        public_key = base64.b64decode(lines[1], validate=True)
    except (binascii.Error, UnicodeError, ValueError, IndexError) as error:
        raise ValueError("The source updater public key is not in the Tauri minisign format") from error
    if not lines[0].startswith("untrusted comment: ") or len(public_key) != 42 or public_key[:2] != b"Ed":
        raise ValueError("The source updater public key is not in the Tauri minisign format")
    return hashlib.sha256(public_key).hexdigest(), public_key[2:10].hex()


def read_signature(path: Path, expected_key_id: str | None = None) -> str:
    if path.stat().st_size > MAX_SIGNATURE_BYTES:
        raise ValueError("An updater signature exceeds the size limit")
    signature = path.read_text(encoding="utf-8").strip()
    try:
        decoded = base64.b64decode(signature, validate=True).decode("utf-8")
    except (binascii.Error, UnicodeError, ValueError) as error:
        raise ValueError("An updater signature is not valid base64-encoded text") from error
    if not decoded.startswith("untrusted comment: ") or "\ntrusted comment: " not in decoded:
        raise ValueError("An updater signature is not in the Tauri minisign format")
    try:
        signature_bytes = base64.b64decode(decoded.splitlines()[1], validate=True)
    except (binascii.Error, ValueError, IndexError) as error:
        raise ValueError("An updater signature is not in the Tauri minisign format") from error
    if len(signature_bytes) != 74 or signature_bytes[:2] not in (b"Ed", b"ED"):
        raise ValueError("An updater signature is not in the Tauri minisign format")
    if expected_key_id is not None and signature_bytes[2:10].hex() != expected_key_id:
        raise ValueError("An updater signature does not match the configured updater public key")
    return signature


def metadata() -> None:
    source = Path("source")
    config = json.loads((source / "apps/desktop/src-tauri/tauri.conf.json").read_text(encoding="utf-8"))
    version = config.get("version") if isinstance(config, dict) else None
    if not isinstance(version, str) or not VERSION_PATTERN.fullmatch(version):
        raise ValueError("tauri.conf.json must contain a semantic version string")
    commit = subprocess.check_output(
        ["git", "-C", str(source), "rev-parse", "HEAD"], text=True
    ).strip()
    if not re.fullmatch(r"[0-9a-f]{40}", commit):
        raise ValueError("Source checkout did not resolve to a commit")
    expected = os.environ.get("SOURCE_COMMIT")
    if expected and (commit != expected or version != os.environ.get("RELEASE_VERSION")):
        raise ValueError("Source checkout does not match the resolved release")
    with Path(os.environ["GITHUB_OUTPUT"]).open("a", encoding="utf-8") as output:
        output.write(f"version={version}\ncommit={commit}\ntag=v{version}\n")


def collect() -> None:
    version, commit = release_identity()
    platform = os.environ.get("RELEASE_PLATFORM", "")
    if platform not in BUNDLES:
        raise ValueError("Unknown release platform")
    public_key_sha256, key_id = updater_key_metadata()
    root = Path(os.environ["BUNDLE_ROOT"]).resolve(strict=True)
    destination = Path("release-assets")
    destination.mkdir()
    files: list[dict[str, object]] = []
    for folder, suffix in BUNDLES[platform]:
        candidates = sorted((root / folder).glob(f"*{suffix}"))
        if len(candidates) != 1:
            raise ValueError(f"Expected exactly one {platform} {suffix} release asset")
        source = candidates[0]
        if not source.resolve().is_relative_to(root):
            raise ValueError("Release asset resolves outside the bundle directory")
        file_record(source)
        if suffix.endswith(".sig"):
            if not source.with_name(source.name[:-4]).is_file():
                raise ValueError("An updater signature has no matching package")
            read_signature(source, key_id)
        target = destination / f"Marker_{version}_{platform}{suffix}"
        shutil.copyfile(source, target)
        files.append(file_record(target))
    files.sort(key=lambda item: str(item["name"]))
    manifest = {
        "version": version, "source_commit": commit, "platform": platform,
        "updater_public_key_sha256": public_key_sha256, "updater_key_id": key_id, "files": files,
    }
    (destination / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


def verify() -> None:
    version, commit = release_identity()
    downloads = Path("downloads")
    expected_folders = {f"installer-{platform}" for platform in BUNDLES}
    if {path.name for path in downloads.iterdir()} != expected_folders:
        raise ValueError("The complete set of platform artifacts is required")
    destination = Path("release")
    destination.mkdir()
    files: list[dict[str, object]] = []
    updater_platforms: dict[str, dict[str, str]] = {}
    expected_key_metadata: tuple[str, str] | None = None
    for platform, bundles in BUNDLES.items():
        folder = downloads / f"installer-{platform}"
        manifest = json.loads((folder / "manifest.json").read_text(encoding="utf-8"))
        if not isinstance(manifest, dict) or (
            manifest.get("version"), manifest.get("source_commit"), manifest.get("platform")
        ) != (version, commit, platform):
            raise ValueError(f"The {platform} artifact has different release metadata")
        public_key_sha256 = manifest.get("updater_public_key_sha256")
        key_id = manifest.get("updater_key_id")
        if (
            not isinstance(public_key_sha256, str) or not re.fullmatch(r"[0-9a-f]{64}", public_key_sha256)
            or not isinstance(key_id, str) or not re.fullmatch(r"[0-9a-f]{16}", key_id)
        ):
            raise ValueError(f"The {platform} artifact is missing valid updater public key metadata")
        key_metadata = (public_key_sha256, key_id)
        if expected_key_metadata is not None and key_metadata != expected_key_metadata:
            raise ValueError("The platform artifacts were built with different updater public keys")
        expected_key_metadata = key_metadata
        expected_names = {f"Marker_{version}_{platform}{suffix}" for _, suffix in bundles}
        if {path.name for path in folder.iterdir()} != expected_names | {"manifest.json"}:
            raise ValueError(f"The {platform} artifact contains unexpected or missing files")
        actual = [file_record(folder / name) for name in sorted(expected_names)]
        if manifest.get("files") != actual:
            raise ValueError(f"The {platform} release asset checksum or size does not match")
        for item in actual:
            name = str(item["name"])
            shutil.copyfile(folder / name, destination / name)
        files.extend(actual)
        for target, suffix in UPDATER_TARGETS[platform]:
            name = f"Marker_{version}_{platform}{suffix}"
            updater_platforms[target] = {
                "url": f"{RELEASE_DOWNLOADS}/v{version}/{name}",
                "signature": read_signature(folder / f"{name}.sig", key_id),
            }
    latest = destination / "latest.json"
    latest.write_text(
        json.dumps({"version": version, "platforms": updater_platforms}, indent=2) + "\n",
        encoding="utf-8",
    )
    files.append(file_record(latest))
    checksums = destination / "SHA256SUMS.txt"
    checksums.write_text(
        "".join(f"{item['sha256']}  {item['name']}\n" for item in sorted(files, key=lambda item: str(item["name"]))),
        encoding="utf-8",
    )
    files.append(file_record(checksums))
    Path("release-manifest.json").write_text(
        json.dumps({"version": version, "source_commit": commit, "files": files}, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Verified signed release assets across {len(BUNDLES)} platforms and {len(updater_platforms)} updater targets")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=("metadata", "collect", "verify"))
    command = parser.parse_args().command
    {"metadata": metadata, "collect": collect, "verify": verify}[command]()


if __name__ == "__main__":
    main()
