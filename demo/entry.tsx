/** Website-only adapter. All workspace, reader, editor and settings UI comes from Marker. */
import React from 'react';
import ReactDOM from 'react-dom/client';
import type { CodeFoldSnapshot, RenderDocument, UserPreferences, WorkspaceTree } from '@marker/contracts';
import { App } from '@/app/app';
import { ipcClient } from '@/ipc/client';
import { createBrowserRenderDocument } from '@/ipc/browser-markdown';
import { useDocumentStore } from '@/stores/document-store';
import { useWorkspaceStore } from '@/stores/workspace-store';
import { usePreferencesStore } from '@/stores/preferences-store';
import { getSampleDocuments, type DemoLocale } from './documents';
import { installEmbeddedScrollBoundary } from './scroll-boundary';
import '@/styles/index.css';

installEmbeddedScrollBoundary();

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
let preferences: UserPreferences = {
  ...usePreferencesStore.getState().preferences,
  language: locale,
  theme: theme === 'dark' ? 'charcoal' : 'ivory',
  showLeftSidebar: window.innerWidth >= 800,
  showRightSidebar: window.innerWidth >= 1050,
};

function createWorkspace(): WorkspaceTree {
  return {
    workspaceId,
    rootName: locale === 'zh-CN' ? '我的工作空间' : 'My workspace',
    rootDisplayPath: 'Marker samples',
    entries: getSampleDocuments(locale).map(sample => ({
      id: sample.id, name: sample.path, relativePath: sample.path,
      isDirectory: false, size: sample.markdown.length, modifiedAt: 0,
    })),
  };
}

function requireDocument(documentId: string): RenderDocument {
  const document = documents.get(documentId);
  if (!document) throw { code: 'NOT_FOUND', message: 'Sample document not found.', recoverable: true };
  return document;
}

function documentAtPath(path: string): RenderDocument {
  const filename = path.split(/[\\/]/).pop();
  const sample = getSampleDocuments(locale).find(item => item.path === filename);
  if (!sample) throw { code: 'NOT_FOUND', message: 'Sample document not found.', recoverable: true };
  return requireDocument(sample.id);
}

/** Preserve visitor edits on language changes; only untouched sample content is translated. */
function seedDocuments(nextLocale: DemoLocale, reset = false): void {
  const previousSamples = new Map(getSampleDocuments(locale).map(sample => [sample.id, sample.markdown]));
  for (const sample of getSampleDocuments(nextLocale)) {
    const existing = documents.get(sample.id);
    const active = useDocumentStore.getState();
    const hasDraft = active.activeDocument?.documentId === sample.id && active.isDirty;
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
ipcClient.openWorkspaceByPath = async () => createWorkspace();
ipcClient.openWorkspaceDocument = async (id, path) => {
  if (id !== workspaceId) return browserIpc.openWorkspaceDocument(id, path);
  return documentAtPath(path);
};
ipcClient.openFileByPath = async path => {
  const filename = path.split(/[\\/]/).pop();
  return getSampleDocuments(locale).some(sample => sample.path === filename)
    ? documentAtPath(path) : browserIpc.openFileByPath(path);
};
ipcClient.getRenderDocument = async id => documents.get(id) ?? browserIpc.getRenderDocument(id);
ipcClient.getRecentItems = async () => [];
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
useWorkspaceStore.getState().registerDocument('welcome', workspaceId, 'Welcome.md');
useDocumentStore.getState().openDocument(requireDocument('welcome'));
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

window.addEventListener('message', event => {
  if (event.origin !== window.location.origin || event.source !== window.parent ||
      !event.data || typeof event.data !== 'object') return;
  if (event.data.type === 'marker-site:preferences' || event.data.type === 'marker-demo:preferences') {
    void synchronize(event.data);
  } else if (event.data.type === 'marker-demo:reset') {
    useDocumentStore.getState().closeAllTabs();
    folds.clear();
    seedDocuments(locale, true);
    useWorkspaceStore.getState().clearWorkspace();
    useWorkspaceStore.getState().addWorkspace(createWorkspace());
    useWorkspaceStore.getState().registerDocument('welcome', workspaceId, 'Welcome.md');
    useDocumentStore.getState().openDocument(requireDocument('welcome'));
    useDocumentStore.getState().setViewMode('preview');
  }
});

const root = document.getElementById('root');
if (!root) throw new Error('Marker demo root is missing.');
ReactDOM.createRoot(root).render(<React.StrictMode><App /></React.StrictMode>);
window.parent.postMessage({ type: 'marker-demo:ready' }, window.location.origin);
