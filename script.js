(() => {
  'use strict';

  const appWindow = document.querySelector('.app-window');
  const article = document.querySelector('.sample-document');
  const sourceCode = document.querySelector('#source-panel code');
  const nameLabel = document.querySelector('.document-name');
  const outline = document.querySelector('.outline-items');
  const documentButtons = [...document.querySelectorAll('[data-document]')];
  const viewButtons = [...document.querySelectorAll('[data-view]')];
  const themeButtons = [...document.querySelectorAll('[data-theme]')];
  const readPanel = document.querySelector('#read-panel');
  const sourcePanel = document.querySelector('#source-panel');

  // Templates and Markdown are fixed demonstration content, never visitor input.
  const writingTemplate = article?.cloneNode(true);
  const documents = {
    writing: {
      name: '一段好文字.md',
      title: '一段好文字',
      template: writingTemplate,
      source: '# 一段好文字，值得一个好位置。\n\n把纷杂留在窗外，让思绪慢下来。\n从一行文字开始，重新发现阅读与书写的乐趣。\n\n## 留白，也是内容的一部分\n\n不必填满每一寸空间。清晰的排版、恰好的行距，让重要的内容自然浮现。\n\n> 好的工具安静地待在一旁，\n> 让你听见自己的想法。\n\n## 让想法，自然成形\n\n- [x] 给灵感一个随时落笔的地方\n- [x] 在阅读与写作之间，自在切换\n- [ ] 把下一段故事，留给自己',
    },
    welcome: {
      name: '开始于此.md',
      title: '从这里开始',
      template: document.querySelector('#welcome-template')?.content,
      source: '# 从这里，打开一份好心情。\n\n欢迎来到 Marker。\n把文档放在手边，把专注还给自己。\n\n## 从熟悉的 Markdown 开始\n\n阅读文档，记录想法，整理你的知识。在一个连续、清晰的工作空间里，找到适合自己的节奏。\n\n> 工具轻一点，\n> 想法就能走得远一点。\n\n## 为自己留一点空间\n\n- [x] 打开一份想读的文档\n- [x] 选择喜欢的阅读配色\n- [ ] 写下今天的第一个想法',
    },
    ideas: {
      name: '灵感收集.md',
      title: '从一件小事开始',
      template: document.querySelector('#ideas-template')?.content,
      source: '# 有些灵感，从一件小事开始。\n\n一段读到的话，一次路过的风景。\n把那些微小的闪光，先记下来。\n\n## 今天的灵感清单\n\n- [x] 留意日常里不寻常的细节\n- [x] 重新读一遍喜欢的文章\n- [ ] 记录一个还没想明白的问题\n\n> 不急着给想法一个答案，\n> 先给它一个可以停留的地方。\n\n## 让记录慢慢生长\n\n短短几行也很好。今天记下的文字，也许就是明天故事的开头。',
    },
  };

  function selectDocument(key) {
    const entry = Object.hasOwn(documents, key) ? documents[key] : null;
    if (!entry?.template || !article || !sourceCode || !nameLabel || !outline) return;

    article.replaceChildren(...[...entry.template.childNodes].map(node => node.cloneNode(true)));
    sourceCode.textContent = entry.source;
    nameLabel.textContent = entry.name;
    documentButtons.forEach(button => {
      const selected = button.dataset.document === key;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    const headings = [entry.title, ...[...article.querySelectorAll('h3')].map(node => node.textContent)];
    outline.replaceChildren(...headings.map((heading, index) => {
      const item = document.createElement('span');
      item.textContent = heading;
      if (index === 0) item.className = 'outline-title';
      if (index === 1) item.className = 'outline-active';
      return item;
    }));
    if (readPanel) readPanel.scrollTop = 0;
    if (sourcePanel) sourcePanel.scrollTop = 0;
  }

  function selectView(view) {
    if (!readPanel || !sourcePanel || !['read', 'source'].includes(view)) return;
    readPanel.hidden = view !== 'read';
    sourcePanel.hidden = view !== 'source';
    viewButtons.forEach(button => {
      const selected = button.dataset.view === view;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
  }

  documentButtons.forEach(button => button.addEventListener('click', () => selectDocument(button.dataset.document)));
  viewButtons.forEach((button, index) => {
    button.addEventListener('click', () => selectView(button.dataset.view));
    button.addEventListener('keydown', event => {
      const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? viewButtons.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + viewButtons.length) % viewButtons.length;
      selectView(viewButtons[next].dataset.view);
      viewButtons[next].focus();
    });
  });
  themeButtons.forEach(button => button.addEventListener('click', () => {
    const theme = button.dataset.theme;
    if (!appWindow || !['ivory', 'charcoal', 'celadon'].includes(theme)) return;
    appWindow.dataset.previewTheme = theme;
    themeButtons.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
  }));

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
  const downloadLink = document.querySelector('#download-link');
  const pendingMessage = document.querySelector('#download-pending');
  const contactLink = document.querySelector('#contact-link');
  if (downloadUrl && downloadLink && pendingMessage) {
    downloadLink.href = downloadUrl;
    downloadLink.hidden = false;
    pendingMessage.hidden = true;
  }
  if (contactUrl && contactLink) {
    contactLink.href = contactUrl;
    contactLink.hidden = false;
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
  selectDocument('writing');
})();
