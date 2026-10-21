(() => {
  'use strict';

  const site = window.MarkerSite;
  if (!site) return;

  const messages = {
    'zh-CN': {
      'meta.title': 'Marker — 把专注，还给文字',
      'meta.description': 'Marker 是一款本地优先的 Markdown 阅读与编辑工具。沉浸阅读、所见即所得写作、源码编辑，在自己的空间里从容表达。',
      'meta.socialDescription': '本地优先的 Markdown 阅读与编辑工具。让阅读沉浸，让表达自如。',
      'a11y.skip': '跳转到正文',
      'a11y.home': 'Marker 首页',
      'a11y.navigation': '主导航',
      'a11y.language': '选择语言',
      'nav.experience': '产品体验',
      'nav.features': '功能',
      'nav.faq': '常见问题',
      'nav.feedback': '问题反馈',
      'nav.download': '获取 Marker',
      'hero.eyebrow': '本地优先 · 专注于 Markdown',
      'hero.title': '把专注，还给文字。',
      'hero.titleLead': '把专注，还给',
      'hero.titleAccent': '文字',
      'hero.titleEnd': '。',
      'hero.titleHtml': '把专注，<br class="mobile-break">还给<span class="serif accent">文字</span><span class="hero-period">。</span>',
      'hero.description': '阅读时沉浸，写作时自如。一款安静、顺手的 Markdown 工具，让想法在自己的空间里生长。',
      'hero.descriptionHtml': '阅读时沉浸，写作时自如。<br>一款安静、顺手的 Markdown 工具，让想法在自己的空间里生长。',
      'hero.download': '获取 Marker',
      'hero.explore': '体验工作台',
      'hero.note': '无需账号 · 离线可用 · 文件由你掌握',
      'demo.intro': '给文字一点空间，给想法一点自由。',
      'demo.label': '真实应用体验',
      'demo.title': 'Marker 交互工作台',
      'demo.caption': '切到编辑，点击顶部「插入」搜索内容；切到源码拖动分隔线，比例会自动记住。',
      'demo.search': '搜索示例文件',
      'demo.hint': '示例内容仅保留在当前页面，分屏比例记在当前浏览器；本地文件不会上传。',
      'demo.reset': '重置体验',
      'demo.fullscreen': '在新窗口体验',
      'features.eyebrow': '少一点打扰，多一点心流',
      'features.title': '好工具，让文字站在中间。',
      'features.titleHtml': '好工具，<span class="serif">让文字站在中间。</span>',
      'features.description': '从第一眼阅读，到最后一次落笔。需要的能力恰好在手边，其他的，就交给留白。',
      'features.descriptionHtml': '从第一眼阅读，到最后一次落笔。<br>需要的能力恰好在手边，其他的，就交给留白。',
      'feature.read.title': '读得进去。',
      'feature.read.description': '按文件名或路径找到文档，在树形与列表之间自由切换，打开即继续上次的阅读位置。',
      'feature.read.item1': '文件搜索与树形 / 列表视图',
      'feature.read.item2': '大纲导航与可调三栏',
      'feature.read.item3': '12 款皮肤与自定义排版',
      'feature.write.title': '写得顺手。',
      'feature.write.description': '用所见即所得的方式连贯书写，或回到熟悉的源码。让表达顺着思路，自然发生。',
      'feature.write.item1': '所见即所得编辑',
      'feature.write.item2': '可调分屏与比例记忆',
      'feature.write.item3': '选区格式与插入搜索',
      'feature.local.title': '用得自在。',
      'feature.local.description': '文档保存在自己的电脑，日常读写离线可用。没有注册流程，打开文件就能开始。',
      'feature.local.item1': '本地文件与多文件夹工作区',
      'feature.local.item2': '重启恢复文件与目录展开状态',
      'feature.local.item3': '远程图片默认关闭',
      'craft.eyebrow': '想法不止一种形状',
      'craft.title': '文字之外，也能表达清楚。',
      'craft.titleHtml': '文字之外，<br>也能<span class="serif accent">表达清楚。</span>',
      'craft.description': '一段代码的逻辑，一张表格的比较，一个公式的推导。复杂的内容，也能有清楚的呈现。',
      'craft.descriptionHtml': '一段代码的逻辑，一张表格的比较，<br>一个公式的推导。复杂的内容，也能有清楚的呈现。',
      'craft.code': '代码高亮与折叠',
      'craft.tables': 'GFM 表格',
      'craft.tasks': '任务清单',
      'craft.math': '数学公式',
      'craft.diagrams': 'Mermaid 图表',
      'craft.previewLabel': '技术文档排版示意',
      'craft.noteLabel': '把想法连接起来',
      'craft.idea': '灵感',
      'craft.write': '落笔',
      'craft.shape': '成形',
      'craft.comment': '// 给想法一个开始',
      'craft.noteFooter': '从灵感到表达',
      'craft.noteStatus': '保持清晰。',
      'faq.eyebrow': '再多了解一点',
      'faq.title': '你可能想知道。',
      'faq.q1': 'Marker 是阅读器，还是编辑器？',
      'faq.a1': '两者都是。你可以沉浸阅读本地 Markdown 文档，也可以使用所见即所得编辑，或在源码与预览分栏中写作。阅读、编辑和源码模式切换时会保留当前草稿。',
      'faq.q2': '需要注册账号或保持联网吗？',
      'faq.a2': '不需要注册账号。日常文档读写在本地完成，离线也能使用。文档中的外部链接和远程图片需要网络；远程图片默认关闭，可按需开启。',
      'faq.q3': '文档会保存在哪里？',
      'faq.a3': '文档以 Markdown 文件保存在你自己的电脑中。你可以打开已有文件或文件夹，编辑后保存到本地，也可以用其他兼容 Markdown 的工具继续使用这些文件。',
      'faq.q4': '官网体验与桌面应用有什么区别？',
      'faq.a4': '官网工作台直接使用 Marker 的界面与编辑能力，初始加载示例文档。示例修改仅保留在当前页面；你也可以主动选择本地文件在浏览器中体验，文件不会上传。完整的文件保存、工作区恢复与应用更新请使用桌面应用。',
      'download.eyebrow': '为你的下一份文档',
      'download.title': '留一处安静，给文字。',
      'download.titleHtml': '留一处安静，<span class="serif">给文字。</span>',
      'download.description': '打开 Marker，从阅读开始，让想法继续。',
      'download.button': '查看下载版本',
      'download.pending': '安装包准备中，敬请期待。',
      'download.note': 'macOS、Windows 与 Linux · 无需账号',
      'footer.home': '返回 Marker 首页',
      'footer.tagline': '文字有自己的力量。',
      'footer.contact': '联系与反馈',
      'theme.toDark': '切换至深色模式',
      'theme.toLight': '切换至浅色模式',
      'theme.light': '浅色',
      'theme.dark': '深色',
    },
    en: {
      'meta.title': 'Marker — A little more space for your words',
      'meta.description': 'Marker is a local-first Markdown reader and editor. Read without distractions, write naturally, and switch to source when you need it. Your files, your space.',
      'meta.socialDescription': 'A local-first Markdown reader and editor. A quieter place to read, write, and think.',
      'a11y.skip': 'Skip to content',
      'a11y.home': 'Marker home',
      'a11y.navigation': 'Main navigation',
      'a11y.language': 'Choose language',
      'nav.experience': 'Experience',
      'nav.features': 'Features',
      'nav.faq': 'FAQ',
      'nav.feedback': 'Report a bug',
      'nav.download': 'Get Marker',
      'hero.eyebrow': 'Local first · Made for Markdown',
      'hero.title': 'Make room for your words.',
      'hero.titleLead': 'Make room for your ',
      'hero.titleAccent': 'words',
      'hero.titleEnd': '.',
      'hero.titleHtml': 'Make room<br class="mobile-break"> for your <span class="serif accent">words</span><span class="hero-period">.</span>',
      'hero.description': 'Read deeply. Write freely. A thoughtful Markdown workspace for ideas to grow, in a space that stays yours.',
      'hero.descriptionHtml': 'Read deeply. Write freely. <br>A thoughtful Markdown workspace for ideas to grow, in a space that stays yours.',
      'hero.download': 'Get Marker',
      'hero.explore': 'Try the workspace',
      'hero.note': 'No account · Works offline · Your files stay yours',
      'demo.intro': 'A little space for your words. A little freedom for your thoughts.',
      'demo.label': 'The real Marker experience',
      'demo.title': 'Interactive Marker workspace',
      'demo.caption': 'Switch to Edit to search blocks with Insert. In Source, drag the divider; your split ratio is remembered.',
      'demo.search': 'Search sample files',
      'demo.hint': 'Sample content stays in this page; the split ratio stays in this browser. Local files are never uploaded.',
      'demo.reset': 'Reset demo',
      'demo.fullscreen': 'Open the workspace',
      'features.eyebrow': 'Less distraction. More flow.',
      'features.title': 'Good tools put your words first.',
      'features.titleHtml': 'Good tools put <br><span class="serif">your words first.</span>',
      'features.description': 'From the first page you read to the last line you write. Everything you need, right where you need it. Room to think, everywhere else.',
      'features.descriptionHtml': 'From the first page you read to the last line you write. <br>Everything you need, right where you need it. Room to think, everywhere else.',
      'feature.read.title': 'Get lost in the words.',
      'feature.read.description': 'Find documents by name or path, choose a tree or list, and continue reading where you left off.',
      'feature.read.item1': 'File search with tree and list views',
      'feature.read.item2': 'Outline navigation and adjustable panes',
      'feature.read.item3': '12 reading themes and custom typography',
      'feature.write.title': 'Find your writing flow.',
      'feature.write.description': 'Write naturally in a rich editor, or return to familiar Markdown source. Let the words follow your thoughts.',
      'feature.write.item1': 'Rich text editing',
      'feature.write.item2': 'Resizable source and preview with a remembered split',
      'feature.write.item3': 'Selection formatting and searchable inserts',
      'feature.local.title': 'Keep your own space.',
      'feature.local.description': 'Your documents live on your computer. Everyday reading and writing works offline. Open a file and get started, without an account.',
      'feature.local.item1': 'Local files and multi-folder workspaces',
      'feature.local.item2': 'Restore files and folder expansion on restart',
      'feature.local.item3': 'Remote images disabled by default',
      'craft.eyebrow': 'Ideas take many shapes',
      'craft.title': 'Clarity, beyond words.',
      'craft.titleHtml': 'Clarity, <br><span class="serif accent">beyond words.</span>',
      'craft.description': 'The logic in a code snippet. A comparison in a table. The steps in an equation. Complex ideas deserve a clear presentation, too.',
      'craft.descriptionHtml': 'The logic in a code snippet. A comparison in a table. <br>The steps in an equation. Complex ideas deserve a clear presentation, too.',
      'craft.code': 'Code highlighting and folding',
      'craft.tables': 'GFM tables',
      'craft.tasks': 'Task lists',
      'craft.math': 'Math notation',
      'craft.diagrams': 'Mermaid diagrams',
      'craft.previewLabel': 'Technical document preview',
      'craft.noteLabel': 'Connect your thoughts',
      'craft.idea': 'Imagine',
      'craft.write': 'Write',
      'craft.shape': 'Create',
      'craft.comment': '// Give an idea a beginning',
      'craft.noteFooter': 'From thought to expression',
      'craft.noteStatus': 'Keep it clear.',
      'faq.eyebrow': 'A little more to know',
      'faq.title': 'You might be wondering.',
      'faq.q1': 'Is Marker a reader or an editor?',
      'faq.a1': 'Both. Read local Markdown documents without distractions, write in the rich editor, or work with source and preview side by side. Your current draft stays with you as you switch between reading, editing, and source modes.',
      'faq.q2': 'Do I need an account or an internet connection?',
      'faq.a2': 'No account needed. Everyday reading and writing happens on your computer and works offline. External links and remote images need an internet connection. Remote images are off by default and can be enabled when you choose.',
      'faq.q3': 'Where are my documents saved?',
      'faq.a3': 'Your documents remain Markdown files on your own computer. Open existing files or folders, save your edits locally, and keep using them with any other Markdown-compatible tool.',
      'faq.q4': 'How does this demo compare with the desktop app?',
      'faq.a4': 'This workspace uses the actual Marker interface and editor, starting with sample documents. Sample edits stay in this page. You can also choose local files to try in your browser; they are never uploaded. Use the desktop app for full file saving, workspace restoration, and app updates.',
      'download.eyebrow': 'For your next document',
      'download.title': 'A quieter place for your words.',
      'download.titleHtml': 'A quieter place <br><span class="serif">for your words.</span>',
      'download.description': 'Open Marker. Start reading. See where your thoughts go.',
      'download.button': 'View downloads',
      'download.pending': 'Installers are on their way. Stay tuned.',
      'download.note': 'macOS, Windows, and Linux · No account needed',
      'footer.home': 'Back to Marker home',
      'footer.tagline': 'Let your words speak.',
      'footer.contact': 'Contact & feedback',
      'theme.toDark': 'Switch to dark mode',
      'theme.toLight': 'Switch to light mode',
      'theme.light': 'Light',
      'theme.dark': 'Dark',
    },
  };

  function translate(key) {
    return messages[site.language]?.[key] ?? messages['zh-CN'][key] ?? key;
  }

  site.t = translate;

  function applyTranslations() {
    for (const element of document.querySelectorAll('[data-i18n]')) {
      element.textContent = translate(element.dataset.i18n);
    }
    for (const element of document.querySelectorAll('[data-i18n-html]')) {
      const key = element.dataset.i18nHtml;
      // Only this fixed dictionary may supply HTML; unknown keys stay plain text.
      if (Object.hasOwn(messages[site.language], key)) element.innerHTML = messages[site.language][key];
      else element.textContent = key;
    }
    for (const [dataAttribute, attribute] of [
      ['data-i18n-aria-label', 'aria-label'],
      ['data-i18n-title', 'title'],
    ]) {
      for (const element of document.querySelectorAll(`[${dataAttribute}]`)) {
        element.setAttribute(attribute, translate(element.getAttribute(dataAttribute)));
      }
    }

    document.title = translate('meta.title');
    for (const [selector, key] of [
      ['meta[name="description"]', 'meta.description'],
      ['meta[property="og:title"]', 'meta.title'],
      ['meta[property="og:description"]', 'meta.socialDescription'],
      ['meta[name="twitter:title"]', 'meta.title'],
      ['meta[name="twitter:description"]', 'meta.socialDescription'],
    ]) {
      const element = document.querySelector(selector);
      if (element) element.content = translate(key);
    }
    const locale = document.querySelector('meta[property="og:locale"]');
    if (locale) locale.content = site.language === 'en' ? 'en_US' : 'zh_CN';

    const languageLabel = document.getElementById('language-label');
    if (languageLabel) languageLabel.textContent = site.language === 'en' ? 'EN' : '中文';
    const languageToggle = document.getElementById('language-toggle');
    languageToggle?.setAttribute('aria-label', `${translate('a11y.language')}: ${site.language === 'en' ? 'English' : '中文'}`);
    for (const option of document.querySelectorAll('#language-menu [data-language]')) {
      option.setAttribute('aria-checked', String(option.dataset.language === site.language));
    }
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const label = translate(site.theme === 'dark' ? 'theme.toLight' : 'theme.toDark');
      themeToggle.setAttribute('aria-label', label);
      themeToggle.title = label;
      themeToggle.setAttribute('aria-pressed', String(site.theme === 'dark'));
    }
    for (const label of document.querySelectorAll('[data-mode-label]')) {
      label.textContent = translate(`theme.${site.theme}`);
    }
  }

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    site.setTheme(site.theme === 'dark' ? 'light' : 'dark');
  });
  site.subscribe(applyTranslations);
  applyTranslations();
})();
