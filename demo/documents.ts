/** Public sample content only. The workspace uses the desktop app's real UI. */
export type DemoLocale = 'zh-CN' | 'en-US';

interface DemoDocument {
  id: string;
  path: string;
  title: string;
  markdown: string;
  standalone?: boolean;
}

const samples: Record<DemoLocale, DemoDocument[]> = {
  'zh-CN': [
    {
      id: 'welcome', path: 'Welcome.md', title: '把专注，还给文字。',
      markdown: `# 把专注，还给文字。

从一段文字开始，把零散的想法慢慢写成自己的东西。

这是 Marker 的真实工作台。试试右上角的 **只读、编辑和源码图标**，悬停可查看提示；也可以在两侧的文件树与大纲之间自由跳转。

## 为思考，留一点空间

好的工具安静地待在一旁，让内容自然浮现。读一份长文，整理一页笔记，或随手写下刚刚发生的灵感。

> 思考需要的，或许只是一个足够安静的地方。

### 阅读，顺着自己的节奏

点击右侧标题跳转章节，拖动两侧分隔线，或收起侧栏，把整个画面留给正文。

在「设置 → 外观 → 顶部工具栏」选择自动隐藏，把更多空间留给文字。鼠标移到工作台顶部即可唤出，移开 1 秒后收起；期间返回工具栏会取消隐藏，正文位置保持不变。

### 写作，保持想法的流动

切到「编辑」直接修改排版后的文字；切到「源码」查看 Markdown 与实时预览。选中文字即可设置格式，也可以使用编辑器的插入菜单。

## 一个轻盈的日常工作流

- [x] 在文件树中选择一份文档
- [x] 通过大纲找到正在思考的章节
- [ ] 切换编辑模式，写下自己的第一句话
- [ ] 打开设置，找到喜欢的阅读皮肤

## 文件，始终由你掌握

桌面版可以打开本地 Markdown 文件与文件夹，无需账号，离线可用。这个网页体验使用独立的示例工作区；编辑仅保留在当前浏览器会话中，刷新即可重新开始。

打开左侧的 **Notes.md** 与 **Markdown.md**，继续体验文件切换、代码、表格、数学公式和流程图。将鼠标移到顶部文件名旁，点击 **×** 关闭当前文档；文件仍保留在左侧，再次打开或切换回来会恢复之前的阅读位置。

展开 **Projects → Marker → Release**，体验多层目录；下方的 **Quick note.md** 是一份独立文件示例，可切换、筛选或从侧栏移除。桌面版还会在重启后恢复文件列表、当前文档、阅读位置和目录的展开、折叠状态。

移除工作空间时，其打开过的文件记录会一并清理；如有未保存内容，会先提示保存、放弃或取消。独立文件保持不变，桌面版重启后也不会恢复已移除工作空间的文件记录。

也可以通过[发布清单](Projects/Marker/Release/Checklist.md)跳转到深层目录中的文档。
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
    {
      id: 'release-checklist', path: 'Projects/Marker/Release/Checklist.md', title: '让每一个细节，都有去处',
      markdown: `# 让每一个细节，都有去处

这份文档位于 **Projects / Marker / Release**。展开多层文件夹，或在左侧搜索 Checklist.md，快速找到深处的笔记。

## 整理一个项目

- [x] 用文件夹组织不同主题
- [x] 在多层目录中定位 Markdown 文档
- [ ] 切换到源码模式，补充自己的检查项

## 保存与回顾

编辑后保存，再打开其他文档并切回来，修改仍保留在当前网页会话中。这里的示例不会写入你的磁盘，点击官网的「重置体验」即可还原。

[返回欢迎文档](../../../Welcome.md)
`,
    },
    {
      id: 'quick-note', path: 'Quick note.md', title: '一份随手打开的笔记', standalone: true,
      markdown: `# 一份随手打开的笔记

这是一份内存中的独立文件示例，不属于上面的工作区目录。它保留完整文件名，并和工作区文档一起显示在侧栏。

## 随时回到自己的想法

试试切换文档、筛选 Quick note.md，或使用侧栏的移除按钮。移除只会将它从当前会话中关闭，不会删除任何本地文件。

点击「重置体验」可恢复这份示例。你也可以主动选择自己的 Markdown 文件；浏览器读取的文件不会上传。
`,
    },
  ],
  'en-US': [
    {
      id: 'welcome', path: 'Welcome.md', title: 'A little more room to think.',
      markdown: `# A little more room to think.

Begin with a line of text. Let scattered thoughts become something of your own.

This is the real Marker workspace. Try the **Read, Edit, and Source icons** in the toolbar; hover to see their labels. Or explore the file tree and document outline.

## Make space for your thoughts

Good tools stay quietly beside you. Read a long article, gather your notes, or capture an idea before it slips away.

> Sometimes, all a thought needs is a quiet place to begin.

### Read at your own pace

Jump between sections in the outline. Drag either divider, or hide the sidebars to give the page your full attention.

Choose Auto-hide under Settings → Appearance → Top toolbar for more reading space. Move the pointer to the top of the workspace to reveal it. Leaving starts a one-second hide delay; returning cancels it, and the document stays in place.

### Keep your writing in flow

Choose Edit to write directly on the page. Choose Source to work with Markdown and a live preview. Select text to format it, or open the editor's insert menu.

## A lighter everyday workflow

- [x] Choose a document in the file tree
- [x] Find a section in the outline
- [ ] Switch to Edit and write your first line
- [ ] Open Settings and find your favorite reading skin

## Your files, in your hands

The desktop app opens local Markdown files and folders, works offline, and needs no account. This web experience uses a separate sample workspace. Edits stay in the current browser session; refresh to start again.

Open **Notes.md** and **Markdown.md** to explore file switching, code, tables, formulas, and diagrams. Hover beside the filename in the toolbar and click **×** to close the document. It stays in the sidebar, and reopening it or switching back restores your reading position.

Expand **Projects → Marker → Release** to explore nested folders. **Quick note.md** below the workspace is a standalone sample you can select, filter, or remove from the sidebar. The desktop app also restores your file list, active document, reading positions, and expanded or collapsed folders after a restart.

Removing a workspace also clears its visited file records. Unsaved edits prompt you to save, discard, or cancel first. Standalone files stay in place, and the desktop app keeps the removed workspace's files out of the restored session after a restart.

You can also follow the [release checklist](Projects/Marker/Release/Checklist.md) to open a document inside the nested folders.
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
    {
      id: 'release-checklist', path: 'Projects/Marker/Release/Checklist.md', title: 'A place for every detail',
      markdown: `# A place for every detail

This document lives in **Projects / Marker / Release**. Expand the nested folders, or filter for Checklist.md in the sidebar to find a note further down the tree.

## Organize a project

- [x] Group related ideas in folders
- [x] Find Markdown documents at any folder level
- [ ] Switch to Source and add a checklist item of your own

## Save and revisit

Save an edit, visit another document, and come back: your changes remain in this page session. These samples never write to your disk. Choose Reset demo on the website to restore the original content.

[Back to Welcome](../../../Welcome.md)
`,
    },
    {
      id: 'quick-note', path: 'Quick note.md', title: 'A note you opened along the way', standalone: true,
      markdown: `# A note you opened along the way

This standalone sample lives in memory, outside the workspace folders above. Its full filename appears alongside the workspace documents in the sidebar.

## Find your way back to a thought

Switch documents, filter for Quick note.md, or try its sidebar remove button. Removing it only closes it in this session; it never deletes a local file.

Choose Reset demo to bring this sample back. You can also select your own Markdown files: files read by the browser are never uploaded.
`,
    },
  ],
};

export const getSampleDocuments = (locale: DemoLocale) => samples[locale];
