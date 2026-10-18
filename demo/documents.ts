/** Public sample content only. The workspace uses the desktop app's real UI. */
export type DemoLocale = 'zh-CN' | 'en-US';

const samples = {
  'zh-CN': [
    {
      id: 'welcome', path: 'Welcome.md', title: '把专注，还给文字。',
      markdown: `# 把专注，还给文字。

从一段文字开始，把零散的想法慢慢写成自己的东西。

这是 Marker 的真实工作台。试试右上角的 **只读、编辑和源码**，或在两侧的文件树与大纲之间自由跳转。

## 为思考，留一点空间

好的工具安静地待在一旁，让内容自然浮现。读一份长文，整理一页笔记，或随手写下刚刚发生的灵感。

> 思考需要的，或许只是一个足够安静的地方。

### 阅读，顺着自己的节奏

点击右侧标题跳转章节，拖动两侧分隔线，或收起侧栏，把整个画面留给正文。

### 写作，保持想法的流动

切到「编辑」直接修改排版后的文字；切到「源码」查看 Markdown 与实时预览。选中文字即可设置格式，也可以使用编辑器的插入菜单。

## 一个轻盈的日常工作流

- [x] 在文件树中选择一份文档
- [x] 通过大纲找到正在思考的章节
- [ ] 切换编辑模式，写下自己的第一句话
- [ ] 打开设置，找到喜欢的阅读皮肤

## 文件，始终由你掌握

桌面版可以打开本地 Markdown 文件与文件夹，无需账号，离线可用。这个网页体验使用独立的示例工作区；编辑仅保留在当前浏览器会话中，刷新即可重新开始。

打开左侧的 **Notes.md** 与 **Markdown.md**，继续体验多标签、代码、表格、数学公式和流程图。
`,
    },
    {
      id: 'notes', path: 'Notes.md', title: '写给明天的自己',
      markdown: `# 写给明天的自己

## 今天记下的三件小事

1. 把大的问题，拆成一个可以开始的小动作。
2. 先把想法写下来，再慢慢打磨。
3. 留一点空白，给还没有到来的答案。

## 阅读手记

> 当我们认真阅读时，也在重新整理自己理解世界的方式。

可以在这里收集摘录、整理会议笔记，或写下一个尚未成形的念头。

## 下一步

- [x] 收集材料
- [x] 整理结构
- [ ] 写一份清晰的初稿
- [ ] 明天再读一遍

## 一周的安排

| 时间 | 主题 | 状态 |
| :--- | :--- | :--- |
| 周一 | 收集想法 | 完成 |
| 周三 | 组织内容 | 进行中 |
| 周五 | 回顾与分享 | 待开始 |
`,
    },
    {
      id: 'markdown', path: 'Markdown.md', title: '让内容，自然成形',
      markdown: `# 让内容，自然成形

Markdown 让简单的文字拥有清晰的结构。这里有一些可以直接尝试的内容。

## 表格与清单

| 视图 | 适合做什么 |
| :--- | :--- |
| 只读 | 专注阅读与大纲导航 |
| 编辑 | 直接修改排版后的内容 |
| 源码 | 编辑 Markdown，实时查看结果 |

- [x] 标题、引用、列表与表格
- [x] 代码高亮、数学公式与流程图
- [ ] 现在，写下你的想法

## 代码，也有好的阅读体验

\`\`\`javascript
function collectIdeas(notes) {
  return notes
    .filter(note => note.trim().length > 0)
    .map(note => ({ text: note, ready: true }));
}
\`\`\`

## 用公式表达

让一个简单的公式，清楚地说出一个想法：

$$e^{i\\pi} + 1 = 0$$

## 用图表梳理思路

\`\`\`mermaid
flowchart LR
  A[收集灵感] --> B[整理结构]
  B --> C[专注写作]
  C --> D[回顾分享]
\`\`\`
`,
    },
  ],
  'en-US': [
    {
      id: 'welcome', path: 'Welcome.md', title: 'A little more room to think.',
      markdown: `# A little more room to think.

Begin with a line of text. Let scattered thoughts become something of your own.

This is the real Marker workspace. Try **Read, Edit, and Source** in the toolbar, or explore the file tree and document outline.

## Make space for your thoughts

Good tools stay quietly beside you. Read a long article, gather your notes, or capture an idea before it slips away.

> Sometimes, all a thought needs is a quiet place to begin.

### Read at your own pace

Jump between sections in the outline. Drag either divider, or hide the sidebars to give the page your full attention.

### Keep your writing in flow

Choose Edit to write directly on the page. Choose Source to work with Markdown and a live preview. Select text to format it, or open the editor's insert menu.

## A lighter everyday workflow

- [x] Choose a document in the file tree
- [x] Find a section in the outline
- [ ] Switch to Edit and write your first line
- [ ] Open Settings and find your favorite reading skin

## Your files, in your hands

The desktop app opens local Markdown files and folders, works offline, and needs no account. This web experience uses a separate sample workspace. Edits stay in the current browser session; refresh to start again.

Open **Notes.md** and **Markdown.md** to explore tabs, code, tables, formulas, and diagrams.
`,
    },
    {
      id: 'notes', path: 'Notes.md', title: 'A note to my future self',
      markdown: `# A note to my future self

## Three things to remember

1. Turn a large problem into one small action you can start.
2. Write the thought down first. Refine it later.
3. Leave a little space for an answer that has yet to arrive.

## Reading notes

> Reading carefully also means making room to reconsider how we understand the world.

Collect a passage, organize meeting notes, or write down an idea before it has a name.

## Next steps

- [x] Gather material
- [x] Find the structure
- [ ] Write a clear first draft
- [ ] Read it again tomorrow

## This week

| When | Focus | Status |
| :--- | :--- | :--- |
| Monday | Collect ideas | Done |
| Wednesday | Organize notes | In progress |
| Friday | Review and share | Next |
`,
    },
    {
      id: 'markdown', path: 'Markdown.md', title: 'Give your ideas a clear shape',
      markdown: `# Give your ideas a clear shape

Markdown gives plain text a useful structure. Here are a few things you can try.

## Tables and tasks

| View | What it is for |
| :--- | :--- |
| Read | Focused reading and outline navigation |
| Edit | Write directly on the formatted page |
| Source | Edit Markdown beside a live preview |

- [x] Headings, quotes, lists, and tables
- [x] Highlighted code, formulas, and diagrams
- [ ] Now, add an idea of your own

## Code deserves a good reading experience

\`\`\`javascript
function collectIdeas(notes) {
  return notes
    .filter(note => note.trim().length > 0)
    .map(note => ({ text: note, ready: true }));
}
\`\`\`

## Say it with a formula

Sometimes a short equation says it best:

$$e^{i\\pi} + 1 = 0$$

## Sketch the flow

\`\`\`mermaid
flowchart LR
  A[Collect ideas] --> B[Find a structure]
  B --> C[Focus and write]
  C --> D[Review and share]
\`\`\`
`,
    },
  ],
};

export const getSampleDocuments = (locale: DemoLocale) => samples[locale];
