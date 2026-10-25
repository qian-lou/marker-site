/** Website-only adapter. All workspace, reader, editor and settings UI comes from Marker. */
import React from 'react';
import ReactDOM from 'react-dom/client';
import type { CodeFoldSnapshot, ReadingPosition, RenderDocument, UserPreferences, WorkspaceEntry, WorkspaceTree } from '@marker/contracts';
import { App } from '@/app/app';
import { ipcClient } from '@/ipc/client';
import { createBrowserRenderDocument } from '@/ipc/browser-markdown';
import { parseDocumentLink, resolveBrowserDocumentLink } from '@/ipc/document-links';
import { parseReadingPosition, serializeReadingPosition } from '@/ipc/reading-position';
import { useDocumentStore } from '@/stores/document-store';
import { useWorkspaceStore } from '@/stores/workspace-store';
import { usePreferencesStore } from '@/stores/preferences-store';
import { useCodeFoldStore } from '@/components/code/code-fold-state';
import { useCodeFoldPersistenceStatus } from '@/components/code/code-fold-persistence';
import { getSampleDocuments, type DemoLocale } from './documents';
import { installEmbeddedScrollBoundary } from './scroll-boundary';
import { TEXT_FORMATTING_CSS } from '@/editor/text-colors';
import '@/styles/index.css';

installEmbeddedScrollBoundary();

const textFormattingStyle = document.createElement('style');
textFormattingStyle.textContent = TEXT_FORMATTING_CSS;
document.head.append(textFormattingStyle);

const search = new URLSearchParams(window.location.search);
const detectLocale = (value: unknown): DemoLocale | null =>
  value === 'zh-CN' ? 'zh-CN' : value === 'en' || value === 'en-US' ? 'en-US' : null;
let locale: DemoLocale = detectLocale(search.get('locale') ?? search.get('language')) ??
  (navigator.language.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en-US');
const initialTheme = search.get('theme');
const theme = initialTheme === 'dark' || initialTheme === 'light'
  ? initialTheme : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const workspaceId = 'marker-website-samples';
const browserIpc = { ...ipcClient };
const documents = new Map<string, RenderDocument>();
const folds = new Map<string, CodeFoldSnapshot>();
const positions = new Map<string, ReadingPosition>();
const recentDocuments = new Map<string, number>();
let preferences: UserPreferences = {
  ...usePreferencesStore.getState().preferences,
  language: locale,
  theme: theme === 'dark' ? 'charcoal' : 'ivory',
  showLeftSidebar: window.innerWidth >= 800,
  showRightSidebar: window.innerWidth >= 1050,
};

function createWorkspace(): WorkspaceTree {
  const entries: WorkspaceEntry[] = [];
  const folders = new Map<string, WorkspaceEntry & { children: WorkspaceEntry[] }>();
  for (const sample of getSampleDocuments(locale)) {
    if (sample.standalone) continue;
    const segments = sample.path.split('/');
    let children = entries;
    let relativePath = '';
    for (let index = 0; index < segments.length - 1; index += 1) {
      relativePath += `${index > 0 ? '/' : ''}${segments[index]}`;
      let folder = folders.get(relativePath);
      if (!folder) {
        folder = { id: `folder:${relativePath}`, name: segments[index], relativePath, isDirectory: true, children: [] };
        folders.set(relativePath, folder);
        children.push(folder);
      }
      children = folder.children;
    }
    children.push({
      id: sample.id, name: segments[segments.length - 1], relativePath: sample.path,
      isDirectory: false, size: sample.markdown.length, modifiedAt: 0,
    });
  }
  for (const siblings of [entries, ...Array.from(folders.values(), folder => folder.children)]) {
    siblings.sort((a, b) => {
      if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
      const readmeOrder = Number(b.name.toLowerCase() === 'readme.md') - Number(a.name.toLowerCase() === 'readme.md');
      return readmeOrder || a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
  }
  return {
    workspaceId,
    rootName: locale === 'zh-CN' ? '我的工作空间' : 'My workspace',
    rootDisplayPath: 'Marker samples',
    entries,
  };
}

function requireDocument(documentId: string): RenderDocument {
  const document = documents.get(documentId);
  if (!document) throw { code: 'NOT_FOUND', message: 'Sample document not found.', recoverable: true };
  return document;
}

/** Keep a bounded sample history in memory, separate from visitors' local files. */
function rememberSample(document: RenderDocument): RenderDocument {
  recentDocuments.delete(document.documentId);
  recentDocuments.set(document.documentId, Date.now());
  if (recentDocuments.size > 5) recentDocuments.delete(recentDocuments.keys().next().value!);
  return document;
}

function documentAtPath(path: string): RenderDocument {
  const relativePath = path.replace(/\\/g, '/').replace(/^\.\//, '');
  const sample = getSampleDocuments(locale).find(item => item.path === relativePath);
  if (!sample) throw { code: 'NOT_FOUND', message: 'Sample document not found.', recoverable: true };
  return requireDocument(sample.id);
}

/** Preserve visitor edits on language changes; only untouched sample content is translated. */
function seedDocuments(nextLocale: DemoLocale, reset = false): void {
  const previousSamples = new Map(getSampleDocuments(locale).map(sample => [sample.id, sample.markdown]));
  const dirtyDocuments = new Set(useDocumentStore.getState().tabs.filter(tab => tab.isDirty).map(tab => tab.documentId));
  for (const sample of getSampleDocuments(nextLocale)) {
    const existing = documents.get(sample.id);
    const hasDraft = dirtyDocuments.has(sample.id);
    if (reset || !existing || (!hasDraft && existing.rawMarkdown === previousSamples.get(sample.id))) {
      documents.set(sample.id, createBrowserRenderDocument(sample.id, sample.title, sample.markdown, sample.path));
    }
  }
  locale = nextLocale;
}

seedDocuments(locale);

// Keep website edits and preferences inside this page, separate from desktop and local files.
ipcClient.getPreferences = async () => preferences;
ipcClient.savePreferences = async next => { preferences = { ...next }; };
ipcClient.restoreWorkspaces = async () => [createWorkspace()];
ipcClient.saveWorkspaceSession = async () => {};
// Samples and visitor drafts remain page-scoped, including editor history.
// 示例和访客草稿（包括编辑历史）仅保留在当前页面，不写入浏览器恢复存储。
ipcClient.restoreReaderSession = async () => ({ documents: [], activeDocumentId: null });
ipcClient.saveReaderSession = async () => {};
ipcClient.openWorkspaceByPath = async () => createWorkspace();
ipcClient.openWorkspaceDocument = async (id, path) => {
  if (id !== workspaceId) return browserIpc.openWorkspaceDocument(id, path);
  return rememberSample(documentAtPath(path));
};
ipcClient.openFileByPath = async path => {
  const relativePath = path.replace(/\\/g, '/').replace(/^\.\//, '');
  return getSampleDocuments(locale).some(sample => sample.path === relativePath)
    ? rememberSample(documentAtPath(path)) : browserIpc.openFileByPath(path);
};
ipcClient.getRenderDocument = async id => {
  const document = documents.get(id);
  return document ? rememberSample(document) : browserIpc.getRenderDocument(id);
};
ipcClient.navigateDocumentLink = async (id, href, sourceWorkspaceId) => {
  if (!documents.has(id)) return browserIpc.navigateDocumentLink(id, href, sourceWorkspaceId);
  const link = parseDocumentLink(href);
  if (link.kind === 'external') {
    window.open(link.url, '_blank', 'noopener,noreferrer');
    return { external: true, url: link.url };
  }
  if (link.kind === 'anchor') return { documentId: id, anchor: link.anchor, external: false };
  if (sourceWorkspaceId && sourceWorkspaceId !== workspaceId) {
    throw { code: 'PERMISSION_DENIED', message: 'The source document is not in this sample workspace.', recoverable: true };
  }
  const relativePath = resolveBrowserDocumentLink(requireDocument(id).displayPath, link.path);
  const target = documentAtPath(relativePath);
  const standalone = getSampleDocuments(locale).find(sample => sample.id === target.documentId)?.standalone;
  return {
    documentId: target.documentId, anchor: link.anchor, external: false,
    ...(!standalone ? { workspaceId, relativePath } : {}),
  };
};
ipcClient.getRecentItems = async () => [...recentDocuments].reverse().flatMap(([id, lastOpenedAt]) => {
  const document = documents.get(id);
  return document ? [{ id, name: document.displayPath.split('/').pop() || document.title,
    path: document.displayPath, isFolder: false, lastOpenedAt }] : [];
});
ipcClient.clearRecentItems = async () => { recentDocuments.clear(); };
ipcClient.getReadingPosition = async id => {
  const position = positions.get(id);
  return position ? { ...position } : null;
};
ipcClient.saveReadingPosition = async (id, position) => {
  const saved = parseReadingPosition(serializeReadingPosition(position));
  if (saved) positions.set(id, { ...saved, documentId: id });
};
ipcClient.getCodeFolds = async id => documents.has(id) ? folds.get(id) ?? null : browserIpc.getCodeFolds(id);
ipcClient.saveCodeFolds = async (id, snapshot) => {
  if (documents.has(id)) folds.set(id, snapshot);
  else await browserIpc.saveCodeFolds(id, snapshot);
};
ipcClient.saveDocument = async (id, markdown) => {
  if (!documents.has(id)) return browserIpc.saveDocument(id, markdown);
  const old = requireDocument(id);
  const next = createBrowserRenderDocument(id, old.title, markdown, old.displayPath);
  documents.set(id, next);
  return next;
};
ipcClient.renderMarkdownPreview = async (markdown, id = 'preview', path = 'Preview.md') =>
  createBrowserRenderDocument(id, documents.get(id)?.title ?? path, markdown, path);

const workspace = createWorkspace();
useWorkspaceStore.getState().addWorkspace(workspace);
for (const sample of getSampleDocuments(locale)) {
  if (sample.standalone) useDocumentStore.getState().openDocument(rememberSample(requireDocument(sample.id)));
}
useWorkspaceStore.getState().registerDocument('welcome', workspaceId, 'Welcome.md');
useDocumentStore.getState().openDocument(rememberSample(requireDocument('welcome')));
await usePreferencesStore.getState().loadPreferences();

usePreferencesStore.subscribe((state, previous) => {
  if (state.preferences.language !== previous.preferences.language) {
    const nextLocale = detectLocale(state.preferences.language);
    if (nextLocale && nextLocale !== locale) void synchronize({ language: nextLocale });
  }
});

async function synchronize(next: { language?: unknown; locale?: unknown; theme?: unknown }): Promise<void> {
  const nextLocale = detectLocale(next.language ?? next.locale);
  if (nextLocale && nextLocale !== locale) {
    seedDocuments(nextLocale);
    useWorkspaceStore.getState().addWorkspace(createWorkspace());
    const active = useDocumentStore.getState();
    if (active.activeDocument && !active.isDirty && documents.has(active.activeDocument.documentId)) {
      active.openDocument(requireDocument(active.activeDocument.documentId));
    }
  }
  await usePreferencesStore.getState().updatePreferences({
    ...(nextLocale ? { language: nextLocale } : {}),
    ...(next.theme === 'light' ? { theme: 'ivory' as const } : next.theme === 'dark' ? { theme: 'charcoal' as const } : {}),
  });
}

let resetting = false;

async function resetDemo(): Promise<void> {
  const demoRoot = document.getElementById('root');
  if (resetting || !demoRoot) return;
  resetting = true;
  const wasInert = demoRoot.inert;
  demoRoot.inert = true;
  try {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', cancelable: true }));
    useDocumentStore.getState().closeAllTabs();
    // Drain writes from closed documents before clearing sample metadata.
    // 先排空已关闭文档的写入，避免异步保存重新填入已清空的示例记录。
    if (useCodeFoldPersistenceStatus.getState().saving) {
      await new Promise<void>(resolve => {
        const unsubscribe = useCodeFoldPersistenceStatus.subscribe(state => {
          if (!state.saving) { unsubscribe(); resolve(); }
        });
      });
    }
    useCodeFoldStore.getState().clear();
    folds.clear();
    positions.clear();
    recentDocuments.clear();
    seedDocuments(locale, true);
    useWorkspaceStore.getState().clearWorkspace();
    useWorkspaceStore.getState().addWorkspace(createWorkspace());
    for (const sample of getSampleDocuments(locale)) {
      if (sample.standalone) useDocumentStore.getState().openDocument(rememberSample(requireDocument(sample.id)));
    }
    useWorkspaceStore.getState().registerDocument('welcome', workspaceId, 'Welcome.md');
    useDocumentStore.getState().openDocument(rememberSample(requireDocument('welcome')));
    useDocumentStore.getState().setViewMode('preview');
  } finally {
    demoRoot.inert = wasInert;
    resetting = false;
  }
}

window.addEventListener('message', event => {
  if (event.origin !== window.location.origin || event.source !== window.parent ||
      !event.data || typeof event.data !== 'object') return;
  if (event.data.type === 'marker-site:preferences' || event.data.type === 'marker-demo:preferences') {
    void synchronize(event.data);
  } else if (event.data.type === 'marker-demo:search-files') {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'p', ctrlKey: true, cancelable: true }));
  } else if (event.data.type === 'marker-demo:reset') {
    void resetDemo();
  }
});

const root = document.getElementById('root');
if (!root) throw new Error('Marker demo root is missing.');
function DemoApp() {
  React.useEffect(() => {
    let focusedDialog: Element | null = null;
    const revealDialog = (event: FocusEvent) => {
      const dialog = event.target instanceof Element
        ? event.target.closest('[role="dialog"][aria-modal="true"], dialog[open]') : null;
      if (dialog && dialog !== focusedDialog) {
        window.parent.postMessage({ type: 'marker-demo:dialog-open' }, window.location.origin);
      }
      focusedDialog = dialog;
    };
    document.addEventListener('focusin', revealDialog);
    window.parent.postMessage({ type: 'marker-demo:ready' }, window.location.origin);
    return () => document.removeEventListener('focusin', revealDialog);
  }, []);
  return <App />;
}
ReactDOM.createRoot(root).render(<React.StrictMode><DemoApp /></React.StrictMode>);
