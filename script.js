(() => {
  'use strict';

  function publicUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
    } catch {
      return null;
    }
  }

  const config = window.MARKER_SITE;
  const downloadUrl = publicUrl(config?.downloadUrl);
  const contactUrl = publicUrl(config?.contactUrl);
  const discordUrl = publicUrl(config?.discordUrl);
  const downloadLink = document.getElementById('download-link');
  const pending = document.getElementById('download-pending');
  const contactLink = document.getElementById('contact-link');
  if (downloadUrl && downloadLink) {
    downloadLink.href = downloadUrl;
    downloadLink.hidden = false;
    if (pending) pending.hidden = true;
  }
  if (contactUrl && contactLink) {
    contactLink.href = contactUrl;
    contactLink.hidden = false;
  }

  async function updateDiscordVisibility() {
    const link = document.getElementById('discord-link');
    if (!discordUrl || !link || typeof fetch !== 'function' || typeof AbortController !== 'function') return;

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 3000);
    try {
      const response = await fetch('https://api.country.is/', {
        signal: controller.signal,
        cache: 'no-store',
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
      });
      if (!response.ok) return;
      const data = await response.json();
      const country = typeof data?.country === 'string' ? data.country.trim().toUpperCase() : '';
      if (controller.signal.aborted || !/^[A-Z]{2}$/.test(country) || ['CN', 'XX', 'ZZ'].includes(country)) return;
      link.href = discordUrl;
      link.hidden = false;
    } catch {
      // Keep the link hidden when the region is unknown. / 地区未知时保持入口隐藏。
    } finally {
      window.clearTimeout(timeout);
    }
  }
  void updateDiscordVisibility();

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const languageControl = document.querySelector('.language-control');
  const languageToggle = document.getElementById('language-toggle');
  const languageMenu = document.getElementById('language-menu');
  const languageOptions = [...document.querySelectorAll('#language-menu [data-language]')];
  if (languageControl && languageToggle && languageMenu && languageOptions.length > 0) {
    const closeMenu = (restoreFocus = false) => {
      if (restoreFocus) languageToggle.focus();
      languageMenu.hidden = true;
      languageToggle.setAttribute('aria-expanded', 'false');
    };
    const openMenu = (index) => {
      languageMenu.hidden = false;
      languageToggle.setAttribute('aria-expanded', 'true');
      languageOptions[index]?.focus();
    };
    languageToggle.addEventListener('click', () => {
      if (!languageMenu.hidden) return closeMenu();
      const selected = languageOptions.findIndex(option => option.getAttribute('aria-checked') === 'true');
      openMenu(Math.max(0, selected));
    });
    languageToggle.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      event.preventDefault();
      openMenu(event.key === 'ArrowDown' ? 0 : languageOptions.length - 1);
    });
    languageMenu.addEventListener('keydown', (event) => {
      const index = languageOptions.indexOf(document.activeElement);
      let next;
      if (event.key === 'ArrowDown') next = (index + 1) % languageOptions.length;
      else if (event.key === 'ArrowUp') next = (index - 1 + languageOptions.length) % languageOptions.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = languageOptions.length - 1;
      else if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu(true);
      } else if (event.key === 'Tab') {
        // Resume the normal tab order from the trigger before hiding the focused item.
        closeMenu(true);
      }
      if (next !== undefined) {
        event.preventDefault();
        languageOptions[next]?.focus();
      }
    });
    for (const option of languageOptions) {
      option.addEventListener('click', () => {
        window.MarkerSite?.setLanguage(option.dataset.language);
        closeMenu(true);
      });
    }
    document.addEventListener('pointerdown', (event) => {
      if (!languageControl.contains(event.target)) closeMenu();
    });
    document.addEventListener('focusin', (event) => {
      if (!languageControl.contains(event.target)) closeMenu();
    });
    // Pointer events inside the embedded workspace do not reach this document.
    window.addEventListener('blur', () => closeMenu());
  }

  const viewport = document.getElementById('demo-viewport');
  const frame = document.getElementById('marker-demo');
  const fullscreen = document.getElementById('demo-fullscreen');
  const searchFiles = document.getElementById('demo-search');
  const exportDocument = document.getElementById('demo-export');
  let exportSession = null;
  frame?.addEventListener('load', () => {
    exportSession = null;
    if (searchFiles) searchFiles.disabled = true;
    if (exportDocument) exportDocument.disabled = true;
    frame.contentWindow?.postMessage({ type: 'marker-demo:query-state' }, window.location.origin);
  });
  if (viewport && frame) {
    const resize = () => {
      frame.style.setProperty('--demo-scale', String(viewport.clientWidth / 1100));
    };
    resize();
    if (typeof ResizeObserver === 'function') new ResizeObserver(resize).observe(viewport);
    else window.addEventListener('resize', resize);
  }

  function updateDemoLink() {
    if (!fullscreen) return;
    const url = new URL(frame?.getAttribute('src') || './assets/demo/index.html', document.baseURI);
    url.searchParams.set('locale', window.MarkerSite?.language === 'en' ? 'en-US' : 'zh-CN');
    url.searchParams.set('theme', window.MarkerSite?.theme === 'dark' ? 'dark' : 'light');
    fullscreen.href = url.href;
  }
  updateDemoLink();
  window.MarkerSite?.subscribe(updateDemoLink);

  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin || event.source !== frame?.contentWindow) return;
    if (event.data?.type === 'marker-demo:ready' && searchFiles) searchFiles.disabled = false;
    if (event.data?.type === 'marker-demo:export-state' && exportDocument) {
      exportSession = event.data.session;
      exportDocument.disabled = event.data.available !== true;
      exportDocument.setAttribute('aria-busy', String(event.data.busy === true));
    }
    if (event.data?.type === 'marker-demo:dialog-open' && viewport) {
      const bounds = viewport.getBoundingClientRect();
      // Keep embedded modal actions visible. / 确保嵌入弹窗的操作按钮留在屏幕内。
      if (bounds.top < 0 || bounds.bottom > window.innerHeight) {
        viewport.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'instant' });
      }
    }
  });
  searchFiles?.addEventListener('click', () => {
    if (!frame?.contentWindow) return;
    viewport?.scrollIntoView({ block: 'center' });
    frame.focus({ preventScroll: true });
    frame.contentWindow.postMessage({ type: 'marker-demo:search-files' }, window.location.origin);
  });

  exportDocument?.addEventListener('change', () => {
    const format = exportDocument.value;
    exportDocument.value = '';
    if (!frame?.contentWindow || exportDocument.disabled || !['pdf', 'html', 'png', 'settings'].includes(format)) return;
    viewport?.scrollIntoView({ block: 'center' });
    frame.contentWindow.postMessage({ type: 'marker-demo:export', format, session: exportSession }, window.location.origin);
  });

  document.getElementById('demo-reset')?.addEventListener('click', () => {
    if (!frame?.contentWindow) return;
    frame.contentWindow.postMessage({ type: 'marker-demo:reset' }, window.location.origin);
  });
})();
