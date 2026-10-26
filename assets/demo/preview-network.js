/* Rewrite only Fetch/XHR URLs; browser-native bodies, events, abort and response types remain in use.
 * 仅转换 Fetch/XHR 请求地址，继续使用浏览器原生请求体、事件、取消和响应类型。
 */
(() => {
  const fetch = window.fetch.bind(window);
  const Request = window.Request;
  const URL = window.URL;
  const define = Object.defineProperty;
  const clone = Response.prototype.clone;
  const prototype = XMLHttpRequest.prototype;
  const open = prototype.open;
  const getHeader = prototype.getResponseHeader;
  const responseUrl = Object.getOwnPropertyDescriptor(prototype, 'responseURL');
  const targets = new WeakMap();
  const Bytes = Uint8Array;
  const AbortError = DOMException;
  const BodyError = RangeError;
  let installed = false;
  window.__markerInstallPreviewProxy = endpoint => {
    if (installed) return;
    const base = new URL(endpoint);
    if (base.protocol !== 'http:' || !['localhost', '127.0.0.1', '[::1]'].includes(base.hostname)) throw new TypeError('Invalid preview proxy.');
    installed = true;
    const proxied = target => { const url = new URL(base); url.searchParams.set('url', target); return url.href; };
    const decorate = (response, target) => {
      const url = response.headers.get('X-Marker-Preview-URL') || target;
      define(response, 'url', { value: url });
      define(response, 'redirected', { value: url !== target });
      define(response, 'clone', { value: function() { return decorate(clone.call(this), target); } });
      return response;
    };
    const readBody = async request => {
      if (!request.body) return undefined;
      const reader = request.body.getReader();
      const reason = () => request.signal.reason ?? new AbortError('Request aborted', 'AbortError');
      const abort = () => { void reader.cancel(reason()).catch(() => {}); };
      request.signal.addEventListener('abort', abort, { once: true });
      const chunks = []; let size = 0;
      try {
        if (request.signal.aborted) { abort(); throw reason(); }
        for (;;) {
          const part = await reader.read();
          if (request.signal.aborted) throw reason();
          if (part.done) break;
          size += part.value.length;
          if (size > 8 * 1024 * 1024) { await reader.cancel(); throw new BodyError('Preview request exceeds 8 MiB.'); }
          chunks.push(part.value);
        }
        const body = new Bytes(size); let offset = 0;
        for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.length; }
        return body;
      } finally { request.signal.removeEventListener('abort', abort); reader.releaseLock(); }
    };
    window.fetch = async (input, options) => {
      const request = new Request(input, options);
      const target = new URL(request.url);
      if (target.protocol !== 'http:' && target.protocol !== 'https:') return fetch(request);
      target.hash = '';
      const body = await readBody(request);
      const response = await fetch(proxied(target.href), {
        method: request.method, headers: request.headers, body, signal: request.signal,
        credentials: request.credentials, mode: 'cors', cache: request.cache, integrity: request.integrity,
        keepalive: request.keepalive, referrerPolicy: 'no-referrer',
      });
      return decorate(response, target.href);
    };
    prototype.open = function(method, source, ...rest) {
      const target = new URL(source, document.baseURI);
      targets.delete(this);
      if (target.protocol === 'http:' || target.protocol === 'https:') {
        target.hash = '';
        targets.set(this, target.href);
        return open.call(this, method, proxied(target.href), ...rest);
      }
      return open.call(this, method, source, ...rest);
    };
    if (responseUrl?.get) define(prototype, 'responseURL', { configurable: true, enumerable: responseUrl.enumerable, get() {
      const actual = responseUrl.get.call(this);
      return actual && targets.has(this) ? getHeader.call(this, 'X-Marker-Preview-URL') || targets.get(this) : actual;
    } });
  };
})();
