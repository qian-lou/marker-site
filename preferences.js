(() => {
  'use strict';

  const languageKey = 'marker-site-language';
  const themeKey = 'marker-site-theme';
  const root = document.documentElement;
  const listeners = new Set();
  const systemTheme = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : { matches: false };

  function normalizeLanguage(value) {
    if (typeof value !== 'string') return null;
    if (/^zh(?:-|$)/i.test(value)) return 'zh-CN';
    if (/^en(?:-|$)/i.test(value)) return 'en';
    return null;
  }

  function normalizeTheme(value) {
    return value === 'light' || value === 'dark' ? value : null;
  }

  function readPreference(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function savePreference(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Preferences remain available for this page when storage is disabled.
    }
  }

  const query = new URLSearchParams(window.location.search);
  const browserLanguages = Array.isArray(navigator.languages) && navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language];
  const browserLanguage = browserLanguages.map(normalizeLanguage).find(Boolean) || 'en';
  let language = normalizeLanguage(query.get('lang'))
    || normalizeLanguage(readPreference(languageKey))
    || browserLanguage;
  let explicitTheme = normalizeTheme(query.get('theme'))
    || normalizeTheme(readPreference(themeKey));
  let theme = explicitTheme || (systemTheme.matches ? 'dark' : 'light');

  function state() {
    return { language, theme };
  }

  function syncDocument() {
    root.lang = language;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === 'dark' ? '#111315' : '#faf9f6';
  }

  function sendToDemo() {
    const frame = document.getElementById('marker-demo');
    if (!frame || !frame.contentWindow || !frame.getAttribute('src')) return;
    try {
      const frameOrigin = new URL(frame.getAttribute('src'), document.baseURI).origin;
      if (frameOrigin !== window.location.origin || frameOrigin === 'null') return;
      frame.contentWindow.postMessage({ type: 'marker-site:preferences', ...state() }, frameOrigin);
    } catch {
      // An unavailable preview must not block page preferences.
    }
  }

  function publish() {
    syncDocument();
    const detail = state();
    window.dispatchEvent(new CustomEvent('marker:preferences', { detail }));
    for (const listener of [...listeners]) {
      try {
        listener(detail);
      } catch (error) {
        console.error('Marker preference listener failed.', error);
      }
    }
    sendToDemo();
  }

  window.MarkerSite = {
    get language() { return language; },
    get theme() { return theme; },
    t(key) { return key; },
    setLanguage(value) {
      const next = normalizeLanguage(value);
      if (!next) return false;
      savePreference(languageKey, next);
      if (next !== language) {
        language = next;
        publish();
      }
      return true;
    },
    setTheme(value) {
      const next = normalizeTheme(value);
      if (!next) return false;
      explicitTheme = next;
      savePreference(themeKey, next);
      if (next !== theme) {
        theme = next;
        publish();
      }
      return true;
    },
    subscribe(listener) {
      if (typeof listener !== 'function') return () => {};
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };

  syncDocument();

  const onSystemThemeChange = (event) => {
    if (explicitTheme) return;
    theme = event.matches ? 'dark' : 'light';
    publish();
  };
  if (typeof systemTheme.addEventListener === 'function') {
    systemTheme.addEventListener('change', onSystemThemeChange);
  } else if (typeof systemTheme.addListener === 'function') {
    systemTheme.addListener(onSystemThemeChange);
  }

  window.addEventListener('storage', (event) => {
    if (event.key === languageKey) {
      language = normalizeLanguage(event.newValue) || browserLanguage;
      publish();
    } else if (event.key === themeKey) {
      explicitTheme = normalizeTheme(event.newValue);
      theme = explicitTheme || (systemTheme.matches ? 'dark' : 'light');
      publish();
    }
  });

  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin || event.data?.type !== 'marker-demo:ready') return;
    const frame = document.getElementById('marker-demo');
    if (frame && event.source === frame.contentWindow) sendToDemo();
  });

  const connectDemo = () => {
    const frame = document.getElementById('marker-demo');
    if (frame) frame.addEventListener('load', sendToDemo);
    sendToDemo();
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', connectDemo, { once: true });
  } else {
    connectDemo();
  }
})();
