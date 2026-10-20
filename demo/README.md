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

The search dialog supports tree and list views with a shared query and selection.
Folders can be expanded or collapsed without changing the sidebar. Searching
reveals matching paths, including files in collapsed folders. The host
`marker-demo:search-files` message opens the app’s file picker through its file
search shortcut; the ready message is sent after the app mounts. The website’s
Search sample files button stays disabled until that message arrives. Reset also
closes an open dialog before restoring the sample workspace.
