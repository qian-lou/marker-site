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

- **HTML preview and code block sizing**: Switch between static HTML preview and source in the code block. In Edit mode, drag the bottom edge or use up and down arrows to resize it. Heights survive document switches, and the desktop app restores them after a restart.
- **Right-click insertion and an optional status bar**: Right-click the editor body for a searchable insert menu with arrow-key, Enter, and Esc support. Toggle the status bar under Settings → Appearance, or use the desktop View menu.
- **Image editing and consistent layout**: Adjust captions, scale, and image-area dimensions, or drag an edge or corner. Reading, preview, and exports preserve the whole image and its proportions; paged exports keep image blocks together.
- **Draft and editing recovery**: Keep each document's draft, visual/source undo and redo, cursor, selection, and scroll position when switching tabs. The desktop app restores unsaved and untitled documents after restart, shows protection status, and uses committed recovery records after an unexpected exit.
- **A clear document workspace**: Browse files, content, and the outline in separate panes. Drag the dividers or collapse the sidebars to give your content more room.
- **Local files and multi-folder workspaces**: Open existing files or folders and browse nested directories. Standalone files and workspace documents share the same sidebar for easy switching.
- **Quick file search**: Use the top search button or ⌘/Ctrl+P to find files by name or path. Switch between tree and list views, expand folders, and open files with the keyboard while keeping your query and selected file.
- **Document tabs**: Switch, reorder, and pin open tabs. Right-click to close other tabs or reopen a closed document. Search the tab list by filename or path and switch with the keyboard.
- **Offline export**: Export your current draft to PDF, HTML, PNG, Word, OpenOffice, RTF, EPUB, LaTeX, MediaWiki, reStructuredText, Textile, or OPML. The desktop app includes its converters with no extra installation. Adjust paper size, orientation, margins, font size, and image scale.
- **Native Windows menus**: Use the File, Edit, View, and Help menus for common actions. macOS uses the system menu bar.
- **Workspace file management**: Removing a workspace also clears its open-file records, so the desktop app will not restore them after a restart. You are prompted about unsaved changes first; other workspaces and standalone files are unaffected.
- **Pick up where you left off**: Hover over the filename at the top to close the current document while keeping it in the sidebar. Reopening or switching back to a document restores its reading position. The desktop app also restores the file list, active file, and expanded or collapsed folders after a restart.
- **A compact writing surface**: Insert, Undo, and Redo share the top toolbar, leaving more space for the document. Filter content in the insert menu and use consistent dark gray dialog buttons in dark mode.
- **Selection formatting and block dragging**: Select text to change paragraph styles, bold, underline, text colors, and highlights, including custom and recent colors. Drag the handle beside a paragraph to reorder sibling blocks, then undo or redo your changes.
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
| macOS 15+ | Apple Silicon / ARM64, Intel / x64 | `.dmg` |
| Windows | x64 | `.exe` |
| Linux | x64 | `.deb`, `.AppImage` |

1. Install and open Marker. No account is required.
2. Open a local Markdown file or add a folder as a workspace.
3. Use the outline and search to read, switch to Edit or Source to make changes, and save the document locally.

The desktop app supports in-app updates. When a new version is available, an update prompt lets you confirm before downloading and installing it. External links, remote images, and app updates require an internet connection.

## Try it in your browser

The [interactive workspace on the website](https://qian-lou.github.io/marker-site/#experience) runs the actual Marker frontend. Use the mode icons to switch between reading, editing, and source, and explore the file tree, file switching, outline, and reading settings.

- Open `Markdown.md` to see code, tables, math notation, and Mermaid diagrams.
- Use Render HTML above the HTML code block and View source to switch back. In Edit mode, drag the bottom edge or use up and down arrows, then switch files and return to check the remembered height.
- Right-click the editor body and filter the insert menu by Table. Use arrow keys and Enter to insert or Esc to return. Toggle Show status bar under Settings → Appearance.
- Adjust the sample image caption, scale, and area dimensions, then compare Read and Source. Image changes support undo/redo and browser exports.
- Edit a document, switch tabs, and return to its draft, cursor, and mode-specific undo/redo history. Unsaved indicators remain visible. Web records clear on reload or Reset demo; use the desktop app for restart and crash recovery.
- Click a diagram title to collapse or expand the block. The state survives file and mode changes, and clears on reload or Reset demo. The interface also uses softer dark selections and subtle dividers.
- Switch to Edit to try the single-row code toolbar, task checkboxes, and tables. Switch back to Read or Source with your current draft preserved.
- Select text to try paragraph styles, underline, text colors, and highlights in the floating toolbar. Enter a custom hex color, then reopen the panel to use a recent color. Press Alt+F10 to focus the toolbar and Esc to return to the document.
- Try the shared rounded selection in Read, Edit, Source, and code blocks. Switch between light and dark appearances to compare text, quotes, and tables.
- Drag the six-dot handle beside a paragraph to reorder sibling blocks, then undo or redo. Switch to Read or Source to review the formatting and draft.
- Use Insert at the top and type Table or Math to filter content blocks. Typing `/` in the document also opens the compact insert menu.
- Switch to Source, drag the middle divider, then change modes or reload. The split ratio is kept in your current browser.
- Use the diagram’s ＋ / − controls to zoom, scroll horizontally to explore an enlarged diagram, click the percentage to reset, or open its popout preview.
- The diagram popout fits the canvas on opening and resizing, with drag-to-pan, scroll-to-zoom, and source copying. Choose Fit to window, double-click the canvas, or press 0 to fit again; press Esc to close.
- Expand `Projects → Marker → Release` to explore nested folders. Open `Quick note.md` to try switching, searching, and removing standalone files.
- Click Search sample files and enter `Checklist`. Switch between Tree and List and open a deeply nested file, or search `Quick note` to open a standalone file.
- Open several documents, switch tabs, right-click to pin a frequent document, and search the tab list for an open file.
- The tab list includes the workspace path and omits a duplicate filename subtitle. New tab and Insert use distinct icons.
- Use Export in the toolbar to download PDF, HTML, or PNG, or adjust export settings. Use the desktop app for Word, EPUB, and other formats.
- The Export dropdown opens below its button and stays within the viewport. Operation results use compact colored toasts that dismiss automatically, pause on hover or focus, and can be closed manually.
- Hover over the filename at the top and click `×` to close the document. Reopen it from the sidebar or recent files to resume at your previous reading position.
- Open Settings and drag a slider, or click a numeric value to select and replace the font size or line height. The document updates as you type.
- Edit a sample document, change the reading theme, or choose a local file to try in the browser. Your local files are never uploaded.

Sample edits stay in the current page. Refresh the page or click Reset demo to restore the samples; the split ratio and recent colors stay in your browser. Use the desktop app for full disk saving, workspace restoration, and in-app updates.
