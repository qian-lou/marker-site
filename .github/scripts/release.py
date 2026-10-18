"""Validate release metadata and stage only desktop installers for publication."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess


BUNDLES: dict[str, tuple[tuple[str, str], ...]] = {
    "macos-arm64": (("dmg", ".dmg"),),
    "macos-x64": (("dmg", ".dmg"),),
    "windows-x64": (("nsis", ".exe"),),
    "linux-x64": (("deb", ".deb"), ("appimage", ".AppImage")),
}
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
        raise ValueError("An installer is missing, empty, or a symbolic link")
    return {"name": path.name, "size": path.stat().st_size, "sha256": sha256(path)}


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
    root = Path(os.environ["BUNDLE_ROOT"]).resolve(strict=True)
    destination = Path("release-assets")
    destination.mkdir()
    files: list[dict[str, object]] = []
    for folder, suffix in BUNDLES[platform]:
        candidates = sorted((root / folder).glob(f"*{suffix}"))
        if len(candidates) != 1:
            raise ValueError(f"Expected exactly one {platform} {suffix} installer")
        source = candidates[0]
        if not source.resolve().is_relative_to(root):
            raise ValueError("Installer resolves outside the bundle directory")
        file_record(source)
        target = destination / f"Marker_{version}_{platform}{suffix}"
        shutil.copyfile(source, target)
        files.append(file_record(target))
    files.sort(key=lambda item: str(item["name"]))
    manifest = {"version": version, "source_commit": commit, "platform": platform, "files": files}
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
    for platform, bundles in BUNDLES.items():
        folder = downloads / f"installer-{platform}"
        manifest = json.loads((folder / "manifest.json").read_text(encoding="utf-8"))
        if not isinstance(manifest, dict) or (
            manifest.get("version"), manifest.get("source_commit"), manifest.get("platform")
        ) != (version, commit, platform):
            raise ValueError(f"The {platform} artifact has different release metadata")
        expected_names = {f"Marker_{version}_{platform}{suffix}" for _, suffix in bundles}
        if {path.name for path in folder.iterdir()} != expected_names | {"manifest.json"}:
            raise ValueError(f"The {platform} artifact contains unexpected or missing files")
        actual = [file_record(folder / name) for name in sorted(expected_names)]
        if manifest.get("files") != actual:
            raise ValueError(f"The {platform} installer checksum or size does not match")
        for item in actual:
            name = str(item["name"])
            shutil.copyfile(folder / name, destination / name)
        files.extend(actual)
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
    print(f"Verified {len(files) - 1} installers across {len(BUNDLES)} platforms")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=("metadata", "collect", "verify"))
    command = parser.parse_args().command
    {"metadata": metadata, "collect": collect, "verify": verify}[command]()


if __name__ == "__main__":
    main()
