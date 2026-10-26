/* 沙箱页面共用内容尺寸测量；不执行文档提供的脚本。
 * Shared sandbox content sizing; never executes document-provided scripts.
 */
(() => {
  const send = message => parent.postMessage(message, '*');
  const schedule = window.setTimeout.bind(window);
  const cancel = window.clearTimeout.bind(window);
  const NativeNode = Node;
  const NativeElement = Element;
  const computedStyle = window.getComputedStyle.bind(window);
  const ceil = Math.ceil;
  const max = Math.max;
  const abs = Math.abs;
  const float = parseFloat;
  let destroyed = false;
  let previewVisible = false;
  let previewHeight = 0;
  let measuredHeight = 0;
  let viewportHeight = window.innerHeight;
  let viewportWidth = window.innerWidth;
  let viewportDrivenHeight;
  let previewTimer;
  let observedBody;
  const publishPreview = () => {
    if (destroyed) return;
    const body = document.body;
    if (body !== observedBody) {
      if (observedBody) previewResizeObserver.unobserve(observedBody);
      observedBody = body;
      if (body) previewResizeObserver.observe(body);
    }
    let visible = Boolean(body?.style.length || document.documentElement.style.length ||
      document.querySelector('style:not([data-marker-preview-defaults]),link[rel="stylesheet"]'));
    for (let node = body?.firstChild; !visible && node; node = node.nextSibling) {
      if (node.nodeType === NativeNode.TEXT_NODE) visible = Boolean(node.textContent?.trim());
      else if (node instanceof NativeElement && !['SCRIPT', 'STYLE', 'TEMPLATE', 'META', 'LINK'].includes(node.tagName)) {
        visible = !NativeElement.prototype.hasAttribute.call(node, 'hidden') && computedStyle(node).display !== 'none';
      }
    }
    // 使用自然布局高度，避免视口下限使预览只能长高而不能缩短。 / Use intrinsic layout height so a viewport floor cannot prevent shrinking.
    const measured = visible && body ? ceil(max(
      document.documentElement.getBoundingClientRect().height,
      body.getBoundingClientRect().top + window.scrollY + body.scrollHeight + (float(computedStyle(body).marginBottom) || 0),
    )) : 0;
    // 阻止视口相对尺寸因 iframe 自身伸高而反复增长。 / Stop viewport-relative sizing from repeatedly growing with its own iframe.
    if (window.innerWidth === viewportWidth && window.innerHeight > viewportHeight && measured > window.innerHeight &&
      abs((measured - measuredHeight) - (window.innerHeight - viewportHeight)) <= 1) viewportDrivenHeight = measured;
    else if (measured !== viewportDrivenHeight || window.innerWidth !== viewportWidth) viewportDrivenHeight = undefined;
    const height = measured === viewportDrivenHeight ? previewHeight : measured;
    measuredHeight = measured;
    viewportHeight = window.innerHeight;
    viewportWidth = window.innerWidth;
    if (visible !== previewVisible || height !== previewHeight) {
      previewVisible = visible;
      previewHeight = height;
      send({ type: 'preview', visible, height });
    }
  };
  // 合并 DOM 和尺寸更新，仅在高度或显隐变化时通知宿主。 / Batch DOM and resize updates, notifying only when height or visibility changes.
  const queuePreview = () => {
    if (!destroyed && previewTimer === undefined) previewTimer = schedule(() => {
      previewTimer = undefined;
      publishPreview();
    }, 0);
  };
  const previewResizeObserver = new ResizeObserver(queuePreview);
  previewResizeObserver.observe(document.documentElement);
  const previewObserver = new MutationObserver(queuePreview);
  previewObserver.observe(document.documentElement, {
    subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['style', 'class', 'hidden'],
  });
  window.addEventListener('resize', queuePreview);
  window.addEventListener('load', queuePreview, true);
  document.fonts?.addEventListener('loadingdone', queuePreview);
  const destroy = () => {
    if (destroyed) return;
    publishPreview();
    destroyed = true;
    previewObserver.disconnect();
    previewResizeObserver.disconnect();
    window.removeEventListener('resize', queuePreview);
    window.removeEventListener('load', queuePreview, true);
    document.fonts?.removeEventListener('loadingdone', queuePreview);
    window.removeEventListener('pagehide', destroy);
    cancel(previewTimer);
  };
  window.__markerPreviewSize = { publish: publishPreview, destroy };
  window.addEventListener('pagehide', destroy, { once: true });
})();
