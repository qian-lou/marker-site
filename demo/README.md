# Marker Live Workspace Adapter (`site/demo`)

This directory contains the browser adapter that compiles the real Marker desktop frontend (`@marker/desktop`) into the interactive web experience hosted on the public website. All UI components, reader skins, the Markdown engine, visual studios, outline, and settings come directly from the private desktop codebase—no separate mock or imitation UI is maintained.

---

## 1. Build Pipeline & Security Guardrails

Install the private project's locked dependencies first, then build from the `site/` repository root:

```sh
# When site/ is checked out inside the private monorepo:
node .github/scripts/build-demo.mjs

# Or specify an explicit path to the private marker repository:
node .github/scripts/build-demo.mjs /absolute/path/to/private/marker
```

### How `build-demo.mjs` Works

1. **Isolated Compilation**: Copies `site/demo` into a temporary working directory, typechecks against `@marker/desktop`, and runs a production Vite build targeting `assets/demo/`.
2. **Fixture & Runtime Bundling**: Aliases `@marker/fixtures` to public sample fixtures (`fixtures.ts`), copies sandbox/network runtime scripts (`javascript-sandbox.js`, `preview-network.js`, `preview-size.js`), and bundles required export font licenses (`MarkerExport-OFL.txt`, `MarkerExport-Symbols-OFL.txt`).
3. **Zero-Leak Verification**:
   - Disables `.env` loading and sourcemaps (`sourcemap: false`).
   - Enforces a strict file-extension whitelist (`.html`, `.js`, `.css`, `.woff`, `.woff2`, `.ttf`, `.png`, `.svg`, `.txt`).
   - Scans emitted `.js`, `.css`, and `.html` bundles to reject any `sourceMappingURL`, local `/Users/` paths, or private key headers.
   - Emits `assets/demo/build.json` recording the source commit revision and asset count.
4. **Independent Pages Deployment**: GitHub Pages (`pages.yml`) stages only the static site root and `assets/demo/`, excluding `site/demo/` so the website deploys without requiring private-repo credentials at Pages deploy time.

---

## 2. Architecture & Capability Mapping

### Sample Workspace Corpus (`documents.ts`)

The adapter preloads a bilingual (`zh-CN` / `en`) virtual workspace demonstrating core Marker workflows:

| Virtual Path | Purpose & Featured Capabilities |
| :--- | :--- |
| `Welcome.md` | Quick orientation, mode switching, selection formatting (`Alt+F10`), block drag reordering, and sidebar divider alignment. |
| `Markdown.md` | Comprehensive showcase: Data Charts (`chart`), Mind Maps (`mindmap`), Callouts & nested `<details>` Disclosures, Infinite Canvas (`canvas`), Visual Flowcharts (`mermaid`), LaTeX Formula Studio, resizable Tables & inline bitmap Images, and interactive HTML / JavaScript sandboxes. |
| `Workspace.md` | Multi-document split panes via tab edge-drop, bottom-left quick preferences menu, searchable categorized Settings, selected-text font sizes, simulated terminal commands, and active code-line focus. |
| `Mindmap.md` | Mind map clipboard image copy, standalone SVG / PNG downloads, SVG control hints, and light/dark nested blockquote typography. |
| `Layout.md` | Width/height resize handles on visual blocks, side-by-side prose and diagram flow, narrow-viewport stacking, and two-step `Backspace` / `Delete` block deletion. |
| `Reading.md` | Long-form typography, 12 reading skins, decoupled Chinese/Latin content vs. UI fonts, and rounded multi-block text selections across scroll and resize. |
| `Projects/Marker/Release/Checklist.md` | Nested directory navigation and bilingual `LaunchReady` targets for full-text content search (`⌘/Ctrl+Shift+F`). |
| `Quick note.md` | Standalone file tab lifecycle (closing retains sidebar entry; explicit removal clears it). |

### Browser Adapter Boundaries vs. Native Desktop

| Subsystem | Browser Adapter Behavior (`site/demo`) | Native Desktop Behavior (`apps/desktop`) |
| :--- | :--- | :--- |
| **Session & Draft Storage** | Page-scoped in memory; reload or *Reset demo* restores defaults. Untouched samples translate dynamically when switching site language. | Persistent disk recovery log (`SQLite` + atomic snapshots) across restarts and crashes. |
| **Browser-Persisted Preferences** | Formula library snippets/pins/layout, source-preview split ratio, and recent custom colors persist in `localStorage`. | Persisted in the native user data directory across restarts and app updates. |
| **Full-Text Search** | Bounded in-memory raw-text search across virtual samples and imported browser files (no disk index). | Persistent local index using path hashes, file fingerprints, and Bloom filters. |
| **Document Export** | Browser-side PDF, HTML, and PNG generation via host-iframe `postMessage` coordination. | 12+ offline formats via bundled `marker-pandoc` and native atomic file replacement. |
| **Code & Network Sandboxes** | Manual execution in `javascript-sandbox.js`; HTML previews use standard browser CORS; terminal runner uses deterministic simulation. | HTML previews route `fetch` / `XHR` through a token-authenticated local proxy (`8 MiB` request / `16 MiB` response cap, `30s` timeout). |

---

## 3. Host-to-Iframe Integration Protocol

Embed the workspace using `assets/demo/index.html?locale=zh-CN&theme=light` (supports `zh-CN`, `en`, `en-US` and `light`, `dark`). Prefer a viewport width of at least `1100px` for the full three-pane layout.

### `postMessage` Contract (Same-Origin Only)

- **Iframe → Host (`marker-demo:ready`)**: Sent once the React application mounts, enabling the host page's export, file search, and content search controls.
- **Host → Iframe (`marker-site:preferences` / `marker-demo:preferences`)**:
  ```js
  iframe.contentWindow.postMessage(
    { type: 'marker-site:preferences', language: 'en', theme: 'dark' },
    location.origin
  );
  ```
- **Host → Iframe Actions**:
  - `{ type: 'marker-demo:reset' }`: Closes active modals, waits for pending fold state writes, and restores default sample documents while preserving the user's personal formula library.
  - `{ type: 'marker-demo:search-files' }`: Opens the quick file search dialog (`⌘/Ctrl+P`).
  - `{ type: 'marker-demo:search-content' }`: Opens the cross-document content search dialog (`⌘/Ctrl+Shift+F`).
  - `{ type: 'marker-demo:export', format: 'pdf' | 'html' | 'png' | 'settings' }`: Triggers the export pipeline for the active document session (rejecting concurrent exports or stale sessions).
- **Scroll Containment**: `scroll-boundary.ts` confines internal `scrollIntoView` calls and edge wheel/touch gestures to the nearest scrollable pane so interacting with the embedded workspace never unexpectedly scrolls the outer marketing page.
