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
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    // Native selects can match :focus-visible even after a pointer click.
    const clearPointerFocus = () => delete languageSelect.dataset.pointerFocus;
    languageSelect.addEventListener('pointerdown', () => {
      languageSelect.dataset.pointerFocus = '';
    });
    languageSelect.addEventListener('blur', clearPointerFocus);
    document.addEventListener('keydown', clearPointerFocus, true);
  }

  const viewport = document.getElementById('demo-viewport');
  const frame = document.getElementById('marker-demo');
  const fullscreen = document.getElementById('demo-fullscreen');
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

  document.getElementById('demo-reset')?.addEventListener('click', () => {
    if (!frame?.contentWindow) return;
    frame.contentWindow.postMessage({ type: 'marker-demo:reset' }, window.location.origin);
  });
})();
