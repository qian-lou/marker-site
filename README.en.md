<div align="center">
  <img src="./assets/marker-icon.png" alt="Marker icon" width="88" height="88">

  # Marker

  **Make room for your words.**

  A local-first Markdown reading and authoring workspace for macOS, Windows, and Linux.<br>
  Read without distractions, write in a WYSIWYG editor, or refine content with live source preview—no account required, offline-ready, and your files always stay yours.

  [简体中文](./README.md) · **English**

  [Website](https://qian-lou.github.io/marker-site/) · [Try it online](https://qian-lou.github.io/marker-site/#experience) · [Download](https://github.com/qian-lou/marker-site/releases) · [Report a bug](https://github.com/qian-lou/marker-site/issues/new?template=bug_report.yml) · [Request a feature](https://github.com/qian-lou/marker-site/issues/new?template=feature_request.yml)
</div>

---

## Philosophy: Read and Write in One Place

Whether you are reading a project `README`, organizing meeting notes, or authoring technical documentation with code, math equations, and architecture diagrams, Marker starts simply by opening a local Markdown file.

| Mode | Focus | Experience |
| :--- | :--- | :--- |
| **Read** | Distraction-free reading | Focus on the rendered typography, jump across sections via the outline, and locate details with in-document search. |
| **Edit** | WYSIWYG authoring | Write directly on the rendered canvas using `/` slash commands, context menus, floating format tools, and visual studios. |
| **Source** | Precision syntax control | Edit raw Markdown side by side with a live preview, with a resizable split divider that remembers your preferred ratio. |

> **Seamless Mode Switching**: Moving between Read, Edit, and Source—or switching across open document tabs—preserves each document's unsaved draft, independent undo/redo history, cursor position, selection, and scroll offset.

---

## Key Capabilities

### 1. Immersive Reading & Refined Typography

- **12 Reading Themes & Adaptive Appearances**: Soft warm-white paper tones in Light mode with enhanced contrast for prose, quotes, and tables; calm highlights and unified dark-gray controls in Dark mode. Read, Edit, Source, and code blocks share cohesive rounded text selections.
- **Decoupled Content & Interface Fonts**: Under *Settings → Appearance → Font settings*, configure independent Chinese and Latin fonts for document content (prose, headings, code) and workspace UI (file tree, outline, toolbar, settings). Shared monospace choices include `Menlo`, `Monaco`, `Inconsolata`, and `Space Grotesk` with live previews and clean system fallbacks.
- **Sub-pixel Typographic Controls**: Adjust content width, fine-tune font size in `0.1px` increments, and adjust line height in `0.01` increments with synchronized sliders and click-to-select numeric inputs.
- **Unobtrusive Chrome**: Set the top toolbar to stay visible or auto-hide (revealing on top-edge hover and hiding 1 second after leaving without shifting document layout). Toggle the bottom status bar anytime via Settings or the View menu.

### 2. WYSIWYG Authoring & Structured Blocks

- **Searchable Insert Menu & Block Reordering**: Type `/` or right-click in the editor to open a single-column searchable insert menu supporting English, Chinese, pinyin, and common aliases (`todo`, `warning`, `zhedie`). Drag the six-dot handle beside any paragraph to reorder sibling blocks.
- **Selection Formatting & Custom Palette**: Select text to adjust paragraph styles, bold, underline, selected-text font sizes, text colors, and highlights—complete with custom hex colors, recent swatches, and `Alt+F10` keyboard toolbar access.
- **Callouts & Nested Disclosures**: Edit titles and bodies directly, switch across 4 callout types (`[!NOTE]`, etc.), and expand or collapse nested `<details>` disclosures. Inserting inside a block preserves its current nesting level; Read mode retains interactive styling while exports expand full content.
- **Visual Table & Image Layout**:
  - **Table Controls**: Add or remove rows and columns via edge `+ / −` buttons, right-click actions, or `Shift+F10`. Select or clear cells, drag or use arrow keys to resize columns and rows, and double-click to auto-fit.
  - **Image & Side-by-Side Block Layout**: Edit image captions, scale, and frame dimensions; resize visual blocks by their right or bottom edge to place prose or diagrams side by side (automatically stacking on narrow viewports).
  - **Two-Step Safe Deletion & Comment Persistence**: Click a visual block preview to select it; pressing `Backspace` or `Delete` at adjacent text boundaries selects first and deletes on the second press. All table, image, and block geometry travels losslessly in Markdown comments across Read and exports.

### 3. Five Visual Creation Studios

- **Data Charts Studio (`chart`)**: Edit a built-in table or paste TSV (Excel/WPS), CSV, and Markdown table data to preview live **bar, line, and pie charts**. Customize titles, units, theme-aware palettes, legends, and value labels with missing-value preservation, data validation, independent undo/redo, and shared offline SVG rendering across Read and exports.
- **Mind Map Studio (`mindmap`)**: Switch seamlessly between Map canvas, Outline, and Mermaid source. Add, reorder, and drag topics across Balanced, Rightward, or Top-down layouts and 8 themes—with animated tidying, search, folding, a minimap, Mermaid `mindmap` persistence, clipboard image copy, and standalone SVG / PNG export.
- **Visual Flowchart Editor (`mermaid`)**: Build diagrams with 26 standard flow symbols, double-click inline text editing, 8-way resizing, marquee multi-selection, alignment/distribution, magnetic connection ports, orthogonal/curved routing, and rulers/grids. Layout and styles persist in Mermaid comments while advanced syntax retains source editing and live preview without lossy conversion. Supports whole-block folding, remembered preview heights, and an interactive popout viewer (pan, scroll-to-zoom, `0` or double-click to fit).
- **Infinite Canvas (`canvas`)**: Organize sticky notes, frames, cards, text, smart connectors, and freehand drawings using brainstorming, architecture, or agile board templates. Features multi-select alignment, layer ordering, context menus, and lossless `canvas` JSON vector rendering.
- **LaTeX Formula Workspace & Snippet Library**: Edit inline or expand the focus workspace with LaTeX syntax highlighting, command completion, parameter jumping, error location, and independent undo/redo. Organize reusable formulas in *My formulas* by category, tags, and pins with JSON import/export backup.

### 4. Interactive Code Sandbox & Technical Documentation

- **Isolated JavaScript Sandbox**: Manually run JavaScript blocks in Read or Edit mode to inspect live DOM interactions, Canvas rendering, and `console` output inside a sandboxed page with dynamic height adaptation and execution guards—never executing code automatically.
- **Live HTML Preview**: Toggle between raw HTML and an interactive preview supporting inline scripts, events, external CDN assets, and dynamic sizing. Web previews follow browser CORS while the desktop app provides a token-isolated local proxy.
- **Developer-Ready Code Blocks**: Syntax highlighting, code folding, compact single-row action bars, focused active-line highlighting, resizable source block heights, and interactive terminal command simulation.

### 5. Multi-Workspace Management & Instant Search

- **Three-Pane Workspace & Split Views**: Navigate files, prose, and the outline in aligned panes with synchronized header controls, pointer/keyboard divider resizing, and reduced-motion support. Drag any tab to the editor edge to arrange multi-document split panes.
- **Workspaces & Smart Tabs**: Combine multiple folder workspaces and standalone files in one sidebar. Reorder or pin tabs, search open tabs with workspace path disambiguation, and close tabs while keeping sidebar entries and remembered reading positions intact.
- **File Tree Context Actions**: Open to the side, pin tabs, copy names or paths, and refresh or collapse folders; the desktop app also supports creating, renaming, duplicating, and deleting files or folders inside authorized workspaces.
- **Quick File Search (`⌘/Ctrl+P`)**: Find files instantaneously by name, path, multi-word query, or ordered-character abbreviation with filename matches ranked first and tree/list view toggling.
- **Full-Text Content Search (`⌘/Ctrl+Shift+F`)**: Search across all workspaces, a specific workspace, or open documents (including unsaved drafts) with case sensitivity, highlighted snippets, and line/column coordinates. Press `Enter` to jump straight to the selected source. The desktop app accelerates lookup via a privacy-preserving local index of path hashes, file fingerprints, and Bloom filters.

### 6. Offline Exports & Local-First Reliability

- **12+ Bundled Offline Export Formats**: Export your current draft to **PDF, HTML, PNG, Word (DOCX), OpenOffice (ODT), RTF, EPUB, LaTeX, MediaWiki, reStructuredText, Textile, or OPML** with built-in converters—no external setup required. Configure paper size, orientation, margins, font size, and image scale with automatic page-break protection for images.
- **Crash Recovery & Session Persistence**: The desktop app commits edits to a verified local recovery log (displaying protection status in the status bar) and restores unsaved documents, untitled drafts, folder expansion states, split ratios, and reading positions after a restart or unexpected exit.
- **Strictly Local-First**: Zero sign-up required. Files stay in standard Markdown on your disk, and remote images are blocked by default until explicitly enabled.

---

## Download & Get Started

Visit the [GitHub Releases page](https://github.com/qian-lou/marker-site/releases) and choose the installer for your platform:

| Operating System | Architecture | Installer Format | Native Integration |
| :--- | :--- | :--- | :--- |
| **macOS 15+** | Apple Silicon (`arm64`) / Intel (`x64`) | `.dmg` | System menu bar, window controls & shortcuts |
| **Windows** | `x64` | `.exe` | Native File, Edit, View, and Help menus |
| **Linux** | `x64` | `.deb`, `.AppImage` | Standard desktop environment integration |

### Quick Start in 3 Steps

1. **Install & Launch**: Open Marker—no account creation or external runtime needed.
2. **Open Content**: Open any local `.md` file or add a folder as a workspace.
3. **Read, Write & Export**: Navigate with the outline and search, switch to *Edit* or *Source* to write, save locally, or export via *File → Export*.

> **In-App Updates**: The desktop app checks for signed updates and prompts for confirmation before downloading and installing. Everyday reading, writing, and exporting work completely offline; internet access is only used for external links, optional remote images, and update checks.

---

## Try It in Your Browser

Explore the **[Interactive Web Workspace](https://qian-lou.github.io/marker-site/#experience)**—running the actual Marker frontend directly in your browser. You can also open local Markdown files from your computer to preview and edit in memory without ever uploading them.

### Guided Tour

| Sample Document / Entry | Featured Capabilities | What to Try |
| :--- | :--- | :--- |
| **`Markdown.md`**<br>All-in-One Showcase | Data charts, mind maps, flowcharts, infinite canvas, callouts, formula studio, tables, images, and code sandboxes | Switch to **Edit**:<br>• Click **Visual editor** above any chart, mind map, flowchart, or canvas to drag nodes, paste table data, switch themes, or export SVG/PNG.<br>• Click a math block to expand the **Formula workspace** with completion and snippet management.<br>• Click **Run JavaScript** or **Render HTML** above code blocks to test interactive DOM and console output.<br>• Resize tables via `+ / −` edge buttons, or press `/` / right-click to filter the insert menu. |
| **`Workspace.md`**<br>Split Panes & Preferences | Multi-document split panes, bottom-left quick menu, text-size formatting, terminal simulation, code line focus | • Drag a tab to the editor edge to create side-by-side panes and resize the divider.<br>• Open the bottom-left menu to switch languages, toggle light/dark themes, or search categorized Settings.<br>• In Edit mode, try selected-text font sizes, simulated terminal commands, and focused code lines. |
| **`Mindmap.md`**<br>Mind Maps & Quotes | Mind map image copy/export, light/dark quote hierarchy | • Edit a mind map topic or source and copy it as an image or download SVG / PNG.<br>• Compare light and dark appearances and inspect nested blockquotes across Read and Edit. |
| **`Layout.md`**<br>Side-by-Side Geometry | Resizable visual blocks, side-by-side prose/diagrams, two-step block deletion | • Drag a visual block's right or bottom edge (or use arrow keys) and place text or another diagram beside it.<br>• Click a block preview to select it, then test two-step `Backspace` / `Delete` protection and undo/redo. |
| **`Reading.md`**<br>Long-Form Typography | 12 reading themes, rounded multi-block selections, sub-pixel typography | • Select across paragraphs, lists, and tables; scroll and resize the window to observe aligned rounded highlights.<br>• Fine-tune font size (`0.1px`) and line height (`0.01`) in Settings and compare content vs. UI fonts. |
| **Global Search & Export**<br>Top & Bottom Controls | Quick file open, full-text content search, browser export | • Click **Search sample files** (`⌘/Ctrl+P`) and type `Checklist` or `chkl`.<br>• Click **Search document contents** (`⌘/Ctrl+Shift+F`), search `LaunchReady`, and press `Enter` to jump to the source.<br>• Use **Export current document** below the workspace to download PDF, HTML, or PNG. |

### Web Experience vs. Desktop App

| Capability | Interactive Web Workspace | Desktop Application |
| :--- | :--- | :--- |
| **Read, Edit & Source Split View** | Full support (real desktop frontend) | Full support |
| **Visual Studios & Code Sandboxes** | Full support (browser CORS for HTML) | Full support (with local network proxy) |
| **File I/O & Workspace Actions** | In-memory page session only (no disk writes) | Native disk read/write, create/rename/delete |
| **Draft Persistence & Crash Recovery** | Page session only (resets on reload; formula library & preferences stay in browser storage) | Verified disk recovery log across restarts and unexpected exits |
| **Offline Export Formats** | PDF, HTML, PNG | 12+ bundled formats (including Word, EPUB, LaTeX, ODT, RTF) |
| **Updates** | Always serves latest web build | Signed in-app auto-updater |
