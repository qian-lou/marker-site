<img src="./assets/marker-icon.png" alt="Marker icon" width="80" height="80">

# Marker

[简体中文](./README.md) · **English**

> Make room for your words.

Marker is a local-first Markdown reader and editor for macOS, Windows, and Linux. Read without distractions, write in a WYSIWYG editor, or refine your content with Markdown source and live preview side by side. No account is required, everyday reading and writing works offline, and your documents remain standard Markdown files on your own computer.

[Website](https://qian-lou.github.io/marker-site/) · [Try it online](https://qian-lou.github.io/marker-site/#experience) · [Download](https://github.com/qian-lou/marker-site/releases) · [Report a bug](https://github.com/qian-lou/marker-site/issues/new?template=bug_report.yml) · [Request a feature](https://github.com/qian-lou/marker-site/issues/new?template=feature_request.yml)

## Read and write in one place

Whether you are reading a project README, organizing meeting notes, or writing technical documentation with code and diagrams, start by opening a Markdown file.

| Mode | How it works |
| --- | --- |
| Read | Focus on the rendered document, navigate sections with the outline, and find content with in-document search. |
| Edit | Edit the rendered text directly, using selection formatting tools and the insert menu to structure your content. |
| Source | Edit Markdown source with a live preview in a split view. |

Your current draft is preserved when switching between the three modes, so you can move between reading and writing at your own pace.

## Key features

- **A clear document workspace**: Browse files, content, and the outline in separate panes. Drag the dividers or collapse the sidebars to give your content more room.
- **Local files and multi-folder workspaces**: Open existing files or folders and browse nested directories. Standalone files and workspace documents share the same sidebar for easy switching.
- **Quick file search**: Use the top search button or ⌘/Ctrl+P to find files by name or path. Switch between tree and list views, expand folders, and open files with the keyboard while keeping your query and selected file.
- **Workspace file management**: Removing a workspace also clears its open-file records, so the desktop app will not restore them after a restart. You are prompted about unsaved changes first; other workspaces and standalone files are unaffected.
- **Pick up where you left off**: Hover over the filename at the top to close the current document while keeping it in the sidebar. Reopening or switching back to a document restores its reading position. The desktop app also restores the file list, active file, and expanded or collapsed folders after a restart.
- **A compact writing surface**: Insert, Undo, and Redo share the top toolbar, leaving more space for the document. Filter content in the insert menu and use consistent dark gray dialog buttons in dark mode.
- **A split that remembers**: Drag the source-preview divider, adjust with arrow keys, or double-click for equal panes. The ratio survives mode changes and reopening; narrow windows adapt without overwriting it.
- **Built for technical documents**: Supports code highlighting and folding, GFM tables, task lists, math notation, and Mermaid diagrams.
- **Reading settings that suit you**: Choose from 12 reading themes, light and dark appearances, and settings for font, font size, line height, and content width. Fine-tune font size in 0.1px steps and line height in 0.01 steps with synchronized sliders and live numeric inputs. Click a value to select it for replacement.
- **Show the top toolbar when you need it**: Set the toolbar to always stay visible or hide automatically. Move the pointer to the top of the window to reveal it; it hides one second after the pointer leaves, and returning cancels the hide. The document layout stays stable. The desktop app preserves this setting across restarts and updates.
- **Chinese and English interfaces**: Read, write, and adjust settings in your preferred language.
- **Your files stay yours**: No sign-up is needed, and everyday reading and writing happens locally. Standard Markdown files remain compatible with other tools. Remote images are disabled by default and can be enabled when needed.

## Download and get started

Visit the [downloads page](https://github.com/qian-lou/marker-site/releases) and choose the installer for your operating system and processor architecture.

| System | Architecture | Installer format |
| --- | --- | --- |
| macOS | Apple Silicon / ARM64, Intel / x64 | `.dmg` |
| Windows | x64 | `.exe` |
| Linux | x64 | `.deb`, `.AppImage` |

1. Install and open Marker. No account is required.
2. Open a local Markdown file or add a folder as a workspace.
3. Use the outline and search to read, switch to Edit or Source to make changes, and save the document locally.

The desktop app supports in-app updates. When a new version is available, an update prompt lets you confirm before downloading and installing it. External links, remote images, and app updates require an internet connection.

## Try it in your browser

The [interactive workspace on the website](https://qian-lou.github.io/marker-site/#experience) runs the actual Marker frontend. Use the mode icons to switch between reading, editing, and source, and explore the file tree, file switching, outline, and reading settings.

- Open `Markdown.md` to see code, tables, math notation, and Mermaid diagrams.
- Switch to Edit to try the single-row code toolbar, task checkboxes, and tables. Switch back to Read or Source with your current draft preserved.
- Use Insert at the top and type Table or Math to filter content blocks. Typing `/` in the document also opens the compact insert menu.
- Switch to Source, drag the middle divider, then change modes or reload. The split ratio is kept in your current browser.
- Use the diagram’s ＋ / − controls to zoom, scroll horizontally to explore an enlarged diagram, click the percentage to reset, or open its popout preview.
- Expand `Projects → Marker → Release` to explore nested folders. Open `Quick note.md` to try switching, searching, and removing standalone files.
- Click Search sample files and enter `Checklist`. Switch between Tree and List and open a deeply nested file, or search `Quick note` to open a standalone file.
- Hover over the filename at the top and click `×` to close the document. Reopen it from the sidebar or recent files to resume at your previous reading position.
- Open Settings and drag a slider, or click a numeric value to select and replace the font size or line height. The document updates as you type.
- Edit a sample document, change the reading theme, or choose a local file to try in the browser. Your local files are never uploaded.

Sample edits stay in the current page. Refresh the page or click Reset demo to restore the samples. Use the desktop app for full disk saving, workspace restoration, and in-app updates.
