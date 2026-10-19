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

The sample tree includes `Projects/Marker/Release/Checklist.md` for nested-folder
navigation and a separate `Quick note.md` tab for standalone-file filtering and
removal. Workspace lookup and relative document links use complete paths, not
basenames. Removing the standalone sample closes it without touching local files;
reset restores both the folder samples and the standalone tab.

When embedded, the adapter confines app `scrollIntoView` calls to the nearest
scrolling pane, using the native `container: 'nearest'` option when supported and
a local-pane fallback in older browsers. Root overscroll containment prevents
wheel/touch gestures at the app's edge from scrolling the surrounding website.
Standalone app scrolling is unchanged; preferences flow from the host into the
demo and are kept in memory inside the demo.
