/* 在不透明来源的页面中运行 DOM 示例；只向宿主发送控制台和状态消息。
 * Run DOM examples in an opaque-origin page, sending only console and status messages to the host.
 */
(() => {
  const send = message => parent.postMessage(message, '*');
  const schedule = window.setTimeout.bind(window);
  const cancel = window.clearTimeout.bind(window);
  const repeat = window.setInterval.bind(window);
  const cancelRepeat = window.clearInterval.bind(window);
  const requestFrame = window.requestAnimationFrame.bind(window);
  const cancelFrame = window.cancelAnimationFrame.bind(window);
  const now = performance.now.bind(performance);
  const NativeError = Error;
  const NativeEvent = Event;
  const NativeNode = Node;
  const NativeWeakSet = WeakSet;
  const NativeString = String;
  const NativePromise = Promise;
  const NativeBlob = Blob;
  const NativeURL = URL;
  const stringify = JSON.stringify.bind(JSON);
  const entries = Object.entries;
  const createObjectURL = URL.createObjectURL.bind(URL);
  const revokeObjectURL = URL.revokeObjectURL.bind(URL);
  const timers = new Set();
  const frames = new Set();
  const pendingStylesheets = new Set();
  let started = false;
  let stopped = false;
  let watchdog;
  let turn;
  let deadline = 0;
  let lines = 0;
  let size = 0;
  const { publish: publishPreview, destroy: destroyPreview } = window.__markerPreviewSize;
  const stop = () => {
    publishPreview();
    stopped = true;
    destroyPreview();
    cancel(watchdog);
    cancel(turn);
    for (const id of timers) { cancel(id); cancelRepeat(id); }
    for (const id of frames) cancelFrame(id);
    for (const abortStylesheet of pendingStylesheets) abortStylesheet();
    timers.clear();
    frames.clear();
    pendingStylesheets.clear();
    document.getAnimations?.().forEach(animation => animation.pause());
  };
  const guard = () => {
    if (stopped) throw new NativeError('Execution stopped');
    if (turn === undefined) {
      deadline = now() + 5000;
      // 使用宏任务复位，避免无限微任务链不断刷新预算。 / Reset in a task so infinite microtask chains cannot renew the budget.
      turn = schedule(() => { turn = undefined; }, 0);
    }
    if (now() >= deadline) {
      const error = new NativeError('Execution exceeded 5 seconds');
      error.name = 'MarkerExecutionTimeout';
      fail(error);
      throw error;
    }
  };
  const format = value => {
    if (value instanceof NativeError) return `${value.name}: ${value.message}`;
    if (typeof value === 'string') return value;
    if (value instanceof NativeNode) return value.outerHTML ?? value.textContent ?? value.nodeName;
    if (typeof value !== 'object' || value === null) return NativeString(value);
    const seen = new NativeWeakSet();
    try {
      return stringify(value, (_, item) => {
        if (typeof item === 'bigint') return `${item}n`;
        if (typeof item === 'object' && item !== null) {
          if (seen.has(item)) return '[Circular]';
          seen.add(item);
        }
        return item;
      }) ?? NativeString(value);
    } catch { return '[Unserializable]'; }
  };
  const fail = error => {
    if (stopped) return;
    publishPreview();
    send(error?.name === 'MarkerExecutionTimeout'
      ? { type: 'timeout' } : { type: 'error', text: format(error).slice(0, 4096) });
    stop();
  };
  for (const level of ['log', 'info', 'warn', 'error', 'debug', 'table', 'dir']) {
    console[level] = (...args) => {
      if (stopped) return;
      const text = args.map(format).join(' ').slice(0, 4096);
      if (++lines > 200 || (size += text.length) > 65536) {
        publishPreview();
        send({ type: 'limit' });
        stop();
        throw new NativeError('Output limit reached');
      }
      send({ type: 'output', level, text });
    };
  }
  console.assert = (condition, ...args) => { if (!condition) console.error('Assertion failed:', ...args); };
  window.setTimeout = (callback, delay, ...args) => {
    if (stopped) return 0;
    const id = schedule(() => {
      timers.delete(id);
      try { guard(); callback(...args); } catch (error) { fail(error); }
    }, delay);
    timers.add(id);
    return id;
  };
  window.setInterval = (callback, delay, ...args) => {
    if (stopped) return 0;
    const id = repeat(() => {
      try { guard(); callback(...args); } catch (error) { fail(error); }
    }, delay);
    timers.add(id);
    return id;
  };
  window.clearTimeout = window.clearInterval = id => {
    timers.delete(id);
    cancel(id);
    cancelRepeat(id);
  };
  window.requestAnimationFrame = callback => {
    if (stopped) return 0;
    const id = requestFrame(time => {
      frames.delete(id);
      try { guard(); callback(time); } catch (error) { fail(error); }
    });
    frames.add(id);
    return id;
  };
  window.cancelAnimationFrame = id => { frames.delete(id); cancelFrame(id); };
  const resourceUrl = (source, kind) => {
    try {
      const url = new NativeURL(source.startsWith('//') ? `https:${source}` : source);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new NativeError();
      return url.href;
    } catch { throw new NativeError(`External ${kind} require an HTTP(S) URL: ${source}`); }
  };
  const waitForResource = async (src, kind, load) => {
    cancel(watchdog);
    send({ type: 'loading', kind, src });
    try { return await load(); }
    finally {
      send({ type: 'loaded' });
      if (!stopped) watchdog = schedule(() => { send({ type: 'timeout' }); stop(); }, 5000);
    }
  };
  const loadStylesheet = (stylesheet, placeholder) => new NativePromise((resolve, reject) => {
    const link = document.createElement('link');
    for (const [name, value] of entries(stylesheet.attributes)) link.setAttribute(name, value);
    if (!link.hasAttribute('referrerpolicy')) link.referrerPolicy = 'no-referrer';
    for (const name of ['onload', 'onerror']) if (typeof placeholder?.[name] === 'function') link[name] = placeholder[name];
    link.href = stylesheet.href;
    const cleanup = () => {
      pendingStylesheets.delete(abort);
      link.removeEventListener('load', loaded);
      link.removeEventListener('error', failed);
    };
    const abort = () => { cleanup(); link.remove(); reject(new NativeError('Stylesheet loading stopped')); };
    const loaded = () => { cleanup(); resolve(); };
    const failed = () => { cleanup(); reject(new NativeError(`Stylesheet could not be loaded: ${stylesheet.href}`)); };
    pendingStylesheets.add(abort);
    link.addEventListener('load', loaded);
    link.addEventListener('error', failed);
    if (placeholder?.isConnected) placeholder.replaceWith(link);
    else document.head.append(link);
  });
  const executeScript = (source, module = false, placeholder, externalSrc = null, attributes = {}) => new NativePromise((resolve, reject) => {
    const url = externalSrc ?? createObjectURL(new NativeBlob([source], { type: 'text/javascript' }));
    const script = document.createElement('script');
    script.async = false;
    if (module) script.type = 'module';
    for (const [name, value] of entries(attributes)) script.setAttribute(name, value);
    if (!script.hasAttribute('referrerpolicy')) script.referrerPolicy = 'no-referrer';
    for (const name of ['onload', 'onerror']) if (typeof placeholder?.[name] === 'function') script[name] = placeholder[name];
    script.src = url;
    const cleanup = () => {
      if (externalSrc === null) revokeObjectURL(url);
      script.removeEventListener('load', loaded);
      script.removeEventListener('error', failed);
    };
    const loaded = () => { cleanup(); resolve(); };
    const failed = () => { cleanup(); reject(new NativeError(externalSrc === null ? 'HTML script could not be executed' : `Script could not be loaded: ${externalSrc}`)); };
    script.addEventListener('load', loaded);
    script.addEventListener('error', failed);
    if (placeholder?.isConnected) placeholder.replaceWith(script);
    else document.head.append(script);
  });
  const executeHtml = async data => {
    Object.defineProperty(window, data.guardName, { value: guard });
    const placeholders = new Map(Array.from(document.querySelectorAll('template[data-marker-html-script]'), node =>
      [`[data-marker-html-script="${node.getAttribute('data-marker-html-script')}"]`, node]));
    const stylePlaceholders = new Map(Array.from(document.querySelectorAll('template[data-marker-html-style]'), node =>
      [`[data-marker-html-style="${node.getAttribute('data-marker-html-style')}"]`, node]));
    if (data.bindings) await executeScript(data.bindings);
    if (stopped) return;
    const stylesheets = (data.stylesheets ?? []).map(stylesheet => ({ ...stylesheet, href: resourceUrl(stylesheet.href, 'stylesheets') }));
    if (stylesheets.length) await waitForResource(stylesheets.map(stylesheet => stylesheet.href).join(', '), 'stylesheet', () =>
      NativePromise.all(stylesheets.map(stylesheet => loadStylesheet(stylesheet, stylePlaceholders.get(stylesheet.selector)))));
    const scripts = [...data.scripts.filter(script => !script.module && !script.defer), ...data.scripts.filter(script => script.module || script.defer)];
    for (const script of scripts) {
      if (stopped) return;
      if (script.noModule && !script.module) continue;
      const externalSrc = script.externalSrc === null ? null : resourceUrl(script.externalSrc, 'scripts');
      const loading = externalSrc !== null || script.module;
      const execute = () => executeScript(script.code, script.module, placeholders.get(script.selector), externalSrc, script.attributes);
      if (loading) await waitForResource(externalSrc ?? 'module', 'script', execute);
      else await execute();
    }
  };
  window.addEventListener('error', event => { event.preventDefault(); fail(event.error ?? event.message); });
  window.addEventListener('unhandledrejection', event => { event.preventDefault(); fail(event.reason); });
  window.addEventListener('pagehide', stop);
  window.addEventListener('message', async event => {
    if (event.source !== parent) return;
    if (event.data?.type === 'stop') { stop(); return; }
    const html = event.data?.type === 'run-html';
    if ((html ? !Array.isArray(event.data.scripts) || typeof event.data.bindings !== 'string' :
      event.data?.type !== 'run' || typeof event.data.source !== 'string') ||
      !/^__markerGuard_[a-zA-Z0-9_]+$/.test(event.data.guardName) || started || stopped) return;
    started = true;
    watchdog = schedule(() => { send({ type: 'timeout' }); stop(); }, 5000);
    try {
      guard();
      if (html) {
        if (event.data.proxyUrl) window.__markerInstallPreviewProxy(event.data.proxyUrl);
        await executeHtml(event.data);
      }
      else await window.__markerExecute(event.data.guardName, event.data.source, guard);
      if (stopped) return;
      cancel(watchdog);
      // 页面已就绪；让示例中注册的初始化监听器也能运行。 / The page is ready; run initialization listeners registered by the example.
      document.dispatchEvent(new NativeEvent('DOMContentLoaded', { bubbles: true }));
      window.dispatchEvent(new NativeEvent('load'));
      publishPreview();
      schedule(() => schedule(() => { if (!stopped) send({ type: 'done' }); }, 0), 0);
    } catch (error) { fail(error); }
  });
  if (document.readyState === 'complete') send({ type: 'ready' });
  else window.addEventListener('load', () => { if (!started) send({ type: 'ready' }); }, { once: true });
})();
