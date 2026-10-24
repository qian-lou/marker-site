# Marker live workspace

This adapter builds the actual desktop frontend for the public website. Components,
reader styles, the Markdown engine, editors, outline and settings come directly
from the private project; the website does not maintain a separate imitation.

## Build

Install the private project's locked dependencies, then run from the website repo:

```sh
node .github/scripts/build-demo.mjs /absolute/path/to/private/marker
```

When this repository is the private project's `site/` folder, omit the path.
The script typechecks the adapter, compiles the frontend in a temporary directory,
removes that directory, and writes only distributable browser resources to
`assets/demo/`. It disables environment-file loading and sourcemaps. A public
fixture alias replaces internal test samples. Never copy the private project or
its `node_modules` into this repository.

The Pages staging whitelist publishes `assets/demo/`, not this adapter directory.
The checked-in output lets the website deploy independently of private-source
access. Rebuild it after a desktop UI change to keep the experience current.

The 0.1.23 experience adds Mermaid block collapse controls. Collapse state shares
the existing per-document folding metadata and survives file and mode changes.
Sample folding stays in memory for this page session; resetting the demo or
reloading clears it. Reset waits for pending fold saves before clearing sample
metadata, so late writes cannot restore the old state. The desktop app saves the
same metadata on disk. The chrome
uses fewer decorative borders, subtle sidebar and status-bar dividers, and softer
dark-appearance selection highlights. Both languages include collapse guidance
in Markdown.md.

The experience also anchors the Export dropdown below its trigger and keeps it
inside viewport bounds. New-tab and insert-block controls use distinct icons.
The tab list includes the owning workspace path and omits a duplicate subtitle
when only a filename is available. Operation results use compact colored,
non-modal toasts that dismiss automatically, pause on hover or focus, and can be
closed manually. The sample instructions describe these interactions in both
languages.

The experience also synchronizes rounded text selections across Read, Edit,
Source, and code blocks, compact editor menus and dialogs, and improved light
appearance contrast for text, quotes, and tables. The diagram popout fits its
canvas on opening and resizing. Its compact toolbar provides zoom, fit, source
copying, and close controls. Drag to pan, scroll to zoom, and double-click or
press 0 to fit again; + / - zoom and Escape closes the dialog. Both languages
include matching instructions in the sample documents.

The experience also includes the grouped selection toolbar, paragraph styles,
underline, theme-aware text colors and highlights, custom hex colors, and bounded
recent colors saved in browser storage. The adapter installs the same formatting
CSS as the desktop bootstrap so preset colors render in both appearances and
persist across editing and reading. Alt+F10 enters the toolbar; menu actions,
undo, and redo preserve the selection. Paragraph handles reorder sibling blocks
with undo and redo. The welcome document includes instructions in both languages.

The experience also includes the desktop app's compact controls, shared tooltips,
and document tabs. Tabs support reordering, pinning, context actions, and a
searchable list with keyboard selection. The Export menu downloads PDF, HTML,
and PNG in the browser; formats requiring the bundled desktop converter show
the app's desktop-required message. PDF fonts and rendering load on demand.
Windows native menus remain specific to the installed app.

The generated output includes `MarkerExport-OFL.txt` for the renamed Noto Sans
SC export fonts and `MarkerExport-Symbols-OFL.txt` for Noto Sans Symbols 2.
These unmodified licenses ship alongside the fonts on every rebuild.

The experience uses the compact desktop toolbar, with Insert, Undo and
Redo at the top and no secondary writing toolbar. Insert uses a searchable
single-column menu; typing `/` opens the compact document menu. Dialog actions
use consistent dark gray surfaces in dark mode. Source and preview can be resized
by dragging or with arrow keys, and double-clicking restores equal panes. The
split ratio is kept in browser local storage across mode changes and reloads;
viewport fitting never replaces the saved preference. Sample content still
remains in memory for the current page.

The single-row code toolbar, task-list checkbox styling, rounded tables and
editor focus stability remain available. Open `Markdown.md` and switch to Edit
to try these interactions. Mode changes preserve the draft. On narrow reading
panes, code actions scroll horizontally between the language picker and Copy
button; keyboard focus also brings hidden actions into view.
Mermaid diagrams retain continuous zoom, horizontal scrolling, percentage reset
and popout preview. Editor menus remain above code block controls in both light
and dark appearances. Native desktop menus remain part of the installed app.

## Embed

Use `assets/demo/index.html?locale=zh-CN&theme=light`. Supported locale values are
`zh-CN`, `en`, and `en-US`; theme values are `light` and `dark`. Prefer a desktop
viewport of at least 1100 pixels for the full three-pane layout, scaling the
iframe container on narrow screens. The same URL also works as a standalone page.

The iframe announces readiness with:

```js
{ type: 'marker-demo:ready' }
```

Send preferences through `iframe.contentWindow.postMessage(message, location.origin)`:

```js
{ type: 'marker-site:preferences', language: 'en', theme: 'dark' }
```

`marker-demo:preferences` with `locale` is also supported. Only messages from the
same-origin parent window are accepted. `{ type: 'marker-demo:reset' }` restores
the sample documents. Changing language translates untouched samples and keeps
visitor edits. Sample documents, edits and code folding remain in memory for the
current page session. Reading positions also stay in memory and reset with the
sample documents. The app's real browser file/folder pickers remain available.
Closing a document retains its sidebar entry and reading position. Reopening it
from the sidebar or the in-memory recent-file list resumes reading. The recent
list contains only visited samples and clears on reset or page refresh.

The sample tree includes `Projects/Marker/Release/Checklist.md` for nested-folder
navigation and a separate `Quick note.md` tab for standalone-file search and
removal. Workspace lookup and relative document links use complete paths, not
basenames. Removing the standalone sample closes it without touching local files;
reset restores both the folder samples and the standalone tab.

Removing a workspace also removes its visited file records from the sidebar.
Unsaved workspace edits prompt for Save, Don't Save, or Cancel before removal;
other workspaces and standalone files retain their current state. The desktop
app persists the cleaned session so removed files do not return after restart.

When embedded, the adapter confines app `scrollIntoView` calls to the nearest
scrolling pane, using the native `container: 'nearest'` option when supported and
a local-pane fallback in older browsers. Root overscroll containment prevents
wheel/touch gestures at the app's edge from scrolling the surrounding website.
Standalone app scrolling is unchanged; preferences flow from the host into the
demo and are kept in memory inside the demo.

The appearance settings also expose the desktop toolbar's always-visible and
auto-hide modes. Move the pointer to the top of the demo viewport to reveal it;
leaving starts a one-second hide delay, and returning cancels that delay. The
toolbar overlays the document without moving its content. As with the other
demo preferences, this selection stays in memory for the current page.

The compact settings header matches the desktop app. Font size adjusts in 0.1px
steps and line height in 0.01 steps. Clicking a numeric value selects it for
replacement; valid input immediately updates the document and its slider while
preserving partial decimal input. Empty or incomplete input keeps the last valid
value, and leaving the field clamps out-of-range values to the supported bounds.

The search dialog supports tree and list views with a shared query and selection.
Folders can be expanded or collapsed without changing the sidebar. Searching
reveals matching paths, including files in collapsed folders. The host
`marker-demo:search-files` message opens the app’s file picker through its file
search shortcut; the ready message is sent after the app mounts. The website’s
Search sample files button stays disabled until that message arrives. Reset also
closes an open dialog before restoring the sample workspace.
