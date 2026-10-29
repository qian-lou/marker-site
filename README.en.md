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

- **Data charts**: Edit a table or paste TSV, CSV, and Markdown data. Preview bar, line, and pie charts; adjust titles, units, palettes, legends, and values. Charts follow the current reading skin, preserve missing values, validate data, and support independent undo, applying to the document, reading, and document exports.

- **Mind maps**: Switch between Map, Outline, and Mermaid source; add, delete, reorder, and drag topics. Choose Balanced, Rightward, or Top-down layouts and eight themes, with animated tidying, search, folding, a minimap, and independent undo/redo. Apply stores Mermaid mindmap syntax; Read and document exports share vector rendering, with separate SVG and PNG export.

- **Callouts and disclosures**: Edit titles and bodies, choose four callout types, and expand or collapse nested content with undo/redo. Read preserves styling; exports expand the full content. Insert accepts Chinese, English, pinyin, and common aliases; insertion within a body keeps its current callout or disclosure level.
- **Infinite canvas**: Arrange sticky notes, frames, cards, text, smart connectors, and freehand drawings. Use templates, alignment, layer ordering, element context actions, and independent undo/redo. Save a canvas JSON block and render the same vector drawing in Read and exports.
- **Table editing and layout**: Add or remove rows and columns through edge buttons, right-click actions, or Shift+F10. Select and clear cells, resize columns and rows with a pointer or arrow keys, and double-click for automatic sizing. Layout travels in Markdown comments for reading and export, with undo/redo.
- **Shared font choices**: Choose Menlo, Monaco, Inconsolata, or Space Grotesk for Chinese, English, and code. Code previews use the chosen font, with CSS fallbacks when it is not installed.
- **Visual flowcharts**: Insert, move, and resize flow symbols, double-click to edit text, connect or reconnect nodes, and adjust routes, arrows, and labels. Multi-selection, alignment, distribution, styles, and undo/redo are available. Apply changes to Mermaid with layout/style comments; advanced syntax keeps source editing and a live preview.
- **Remembered diagram heights**: Drag the editor preview's bottom edge or use arrow keys to resize it. Read mode uses the same height and fits the diagram; the desktop app restores it after restart. Read and Edit also share tighter spacing above the document.
- **Formula workspace and snippet library**: Edit in place or expand to the focus workspace, with highlighted LaTeX, command completion, parameter navigation, and independent undo/redo. Organize reusable formulas by category, tags, and pins, and import/export JSON backups. The desktop app also restores unconfirmed formula drafts and workspace layout.
- **Interactive HTML and JavaScript**: Run JavaScript manually with a page, click interactions, and console output. HTML previews support inline scripts, events, CDN resources, and dynamic height. Web requests follow browser CORS; the desktop app provides a local proxy. Code runs in a separate sandbox and never executes automatically.
- **File tree actions**: Open to the side, pin tabs, copy names or paths, and refresh or collapse folders. The desktop app can create, rename, duplicate, and delete entries inside authorized workspaces. The default light appearance uses soft warm whites.
- **Right-click insertion and an optional status bar**: Right-click the editor body for a searchable insert menu with arrow-key, Enter, and Esc support. Toggle the status bar under Settings → Appearance, or use the desktop View menu.
- **Image editing and consistent layout**: Adjust captions, scale, and image-area dimensions, or drag an edge or corner. Reading, preview, and exports preserve the whole image and its proportions; paged exports keep image blocks together.
- **Draft and editing recovery**: Keep each document's draft, visual/source undo and redo, cursor, selection, and scroll position when switching tabs. The desktop app restores unsaved and untitled documents after restart, shows protection status, and uses committed recovery records after an unexpected exit.
- **A clear document workspace**: Browse files, content, and the outline in separate panes. Open, Search, and the file tree toggle align with the left pane. Header and pane transition together, with direct tracking during divider drags and alignment at the minimum width. Resize with arrow keys or double-click for the default width; reduced motion disables transitions.
- **Local files and multi-folder workspaces**: Open existing files or folders and browse nested directories. Standalone files and workspace documents share the same sidebar for easy switching.
- **Quick file search**: Use the top search button or ⌘/Ctrl+P to find files by name or path. Switch between tree and list views, expand folders, and open files with the keyboard while keeping your query and selected file.
- **Document tabs**: Switch, reorder, and pin open tabs. Right-click to close other tabs or reopen a closed document. Search the tab list by filename or path and switch with the keyboard.
- **Offline export**: Export your current draft to PDF, HTML, PNG, Word, OpenOffice, RTF, EPUB, LaTeX, MediaWiki, reStructuredText, Textile, or OPML. The desktop app includes its converters with no extra installation. Adjust paper size, orientation, margins, font size, and image scale.
- **Native Windows menus**: Use the File, Edit, View, and Help menus for common actions. macOS uses the system menu bar.
- **Workspace file management**: Removing a workspace also clears its open-file records, so the desktop app will not restore them after a restart. You are prompted about unsaved changes first; other workspaces and standalone files are unaffected.
- **Pick up where you left off**: Hover over the filename at the top to close the current document while keeping it in the sidebar. Reopening or switching back to a document restores its reading position. The desktop app also restores the file list, active file, and expanded or collapsed folders after a restart.
- **A compact writing surface**: Undo, Redo, and reading modes stay in the top toolbar. Right-click or type / in the document to open the searchable insert menu. The desktop app exports through File → Export.
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

- Open Compare data with charts in Markdown.md, choose Edit and Visual editor, and try pasted data, chart types, titles, and styles. Choose Done to review in Read or a document export.
- Open Organize ideas with a mind map in Markdown.md, choose Edit, then Visual editor above the map. Try topic editing, branch dragging, themes, Outline/Source synchronization, applying to the document, and SVG or PNG export.
- Open Give notes and details their own space in Markdown.md. In Edit, try callout types, disclosure toggles, warning / zhedie search, and context insertion within the current body. Hover over the long file name to reveal it.
- Open Think on an infinite canvas in `Markdown.md`, choose Edit, then Visual editor above the canvas block. Try a template, duplicate or edit an element, then choose Done and review in Read or an HTML export.
- Open `Markdown.md` to see code, tables, math notation, and Mermaid diagrams.
- Toggle the file tree to see its header and pane move together. Drag the divider to its minimum to check alignment, fine-tune it with arrow keys, or double-click for the default width.
- Close every tab, then use New tab in the toolbar to create a blank document in Edit.
- Try the table's ＋ / − edge buttons in Edit, or open Table actions with right-click or Shift+F10. Resize columns and rows, then review in Read or an HTML export. Choose text and code fonts in Settings and check the live preview.
- Choose Edit and open Visual editor above the diagram. Move shapes, double-click text, try selection and alignment, and adjust connections. Choose Done, review in Read, then return to Edit to undo the document change. Resize the preview's bottom edge and switch modes to check its shared height.
- Choose Edit and click a formula, expand the focus workspace, and try command completion, parameter navigation, undo/redo, and error location. Save a custom formula, filter My formulas by category or tag, pin it, and export or import a JSON backup.
- Choose Run JavaScript above the sample, click the button in its result, and inspect the console. Stop keeps the page. Choose Render HTML to add ideas and watch the preview grow, then View source to return.
- Right-click a sample file or folder to open to the side, pin, copy paths, or refresh. Disk modification is disabled in the web sample.
- Right-click the editor body and filter the insert menu by Table. Use arrow keys and Enter to insert or Esc to return. Toggle Show status bar under Settings → Appearance.
- Adjust the sample image caption, scale, and area dimensions, then compare Read and Source. Image changes support undo/redo and browser exports.
- Edit a document, switch tabs, and return to its draft, cursor, and mode-specific undo/redo history. Unsaved indicators remain visible. Web records clear on reload or Reset demo; use the desktop app for restart and crash recovery.
- Click a diagram title to collapse or expand the block. The state survives file and mode changes, and clears on reload or Reset demo. The interface also uses softer dark selections and subtle dividers.
- Switch to Edit to try the single-row code toolbar, task checkboxes, and tables. Switch back to Read or Source with your current draft preserved.
- Select text to try paragraph styles, underline, text colors, and highlights in the floating toolbar. Enter a custom hex color, then reopen the panel to use a recent color. Press Alt+F10 to focus the toolbar and Esc to return to the document.
- Try the shared rounded selection in Read, Edit, Source, and code blocks. Switch between light and dark appearances to compare text, quotes, and tables.
- Drag the six-dot handle beside a paragraph to reorder sibling blocks, then undo or redo. Switch to Read or Source to review the formatting and draft.
- Right-click or type `/` in the document, then search for Table or Math. Use arrow keys and Enter to insert, or Esc to return to the document.
- Switch to Source, drag the middle divider, then change modes or reload. The split ratio is kept in your current browser.
- Use the diagram’s ＋ / − controls to zoom, scroll horizontally to explore an enlarged diagram, click the percentage to reset, or open its popout preview.
- The diagram popout fits the canvas on opening and resizing, with drag-to-pan, scroll-to-zoom, and source copying. Choose Fit to window, double-click the canvas, or press 0 to fit again; press Esc to close.
- Expand `Projects → Marker → Release` to explore nested folders. Open `Quick note.md` to try switching, searching, and removing standalone files.
- Click Search sample files and enter `Checklist`. Switch between Tree and List and open a deeply nested file, or search `Quick note` to open a standalone file.
- Open several documents, switch tabs, right-click to pin a frequent document, and search the tab list for an open file.
- The tab list includes the workspace path and omits a duplicate filename subtitle. Hover over tab bar buttons for their hints.
- Use Export current document below the website workspace to download PDF, HTML, or PNG, or choose Export settings. Return from a separate demo window to the website for export controls. The desktop app provides more formats through File → Export.
- Export controls pause during a download to prevent duplicate operations. Operation results use compact colored toasts that dismiss automatically, pause on hover or focus, and can be closed manually.
- Hover over the filename at the top and click `×` to close the document. Reopen it from the sidebar or recent files to resume at your previous reading position.
- Open Settings and drag a slider, or click a numeric value to select and replace the font size or line height. The document updates as you type.
- Edit a sample document, change the reading theme, or choose a local file to try in the browser. Your local files are never uploaded.

Document and unconfirmed formula edits stay in the current page. Refresh or click Reset demo to restore the samples; formula snippets, recent items, favorites, workspace layout, and recent colors stay in your browser. Reset demo keeps the formula library. Use the desktop app for full disk saving, restart recovery, and in-app updates.
