/** Public sample content only. The workspace uses the desktop app's real UI. */
import sampleImage from './sample-image.png';
import { CANVAS_TEMPLATES, serializeCanvas } from '@/canvas/canvas-model';
import { DEFAULT_MINDMAP_SAMPLE, DEFAULT_MINDMAP_SAMPLE_EN } from '@/mindmap/mindmap-model';
import { createDefaultChart, serializeChart } from '@/chart/chart-model';
export type DemoLocale = 'zh-CN' | 'en-US';

const canvasEnglishLabels: Record<string, string> = {
  F1: 'Core question', N1: 'Problem and context', N2: 'Boundaries and constraints',
  C1: 'Approach A', C2: 'Approach B', C3: 'Conclusion',
};
const canvasSources: Record<DemoLocale, string> = {
  'zh-CN': serializeCanvas(CANVAS_TEMPLATES.brainstorm),
  'en-US': serializeCanvas({
    ...CANVAS_TEMPLATES.brainstorm,
    elements: CANVAS_TEMPLATES.brainstorm.elements.map(element => ({
      ...element, label: canvasEnglishLabels[element.id] ?? element.label,
    })),
  }),
};

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

顶部左侧的打开、搜索和文件树按钮随文件栏宽度对齐。点击文件树按钮，观察侧栏与顶部按钮区域同步展开、收起；拖动文件栏分隔线时同步调整，拖到最窄时仍与顶部按钮区对齐。聚焦分隔线后用方向键微调、Home / End 调至边界，双击恢复默认宽度。系统启用「减少动态效果」时不播放过渡。

在「设置 → 外观 → 顶部工具栏」选择自动隐藏，把更多空间留给文字。鼠标移到工作台顶部即可唤出，移开 1 秒后收起；期间返回工具栏会取消隐藏，正文位置保持不变。也可用 Tab 聚焦顶部唤出按钮，再继续使用鼠标操作。

### 找到想看的那份文件

点击顶部的 **搜索文件**，或按 **⌘ / Ctrl + P**，按文件名或路径找到工作区与独立文件。在弹窗中切换 **树形 / 列表**，搜索词和选中文件会保留；输入 **Checklist**，即可找到折叠目录里的发布清单，点击或按 Enter 打开。

打开多份文档后，点击顶部标签切换；右键标签可固定、关闭其他标签，或重新打开关闭的文档。点击标签栏右侧的列表按钮，按文件名或路径搜索已打开的标签，使用方向键和 Enter 快速切换。

标签列表会显示所属工作区路径；只有文件名时不重复显示第二行。新建标签与插入内容使用不同图标，悬停可查看说明。关闭全部标签后，顶部仍保留「打开新标签」按钮；点击即可创建空白文档并进入编辑。

### 写作，保持想法的流动

切到「编辑」直接修改排版后的文字。顶部的「插入」、撤销与重做集中在同一行；点击「插入」，输入「表格」或「公式」即可过滤内容，正文输入 \`/\` 也能快速插入。

在正文中右键，也可打开同一个插入菜单。输入关键词过滤，用方向键选择、Enter 插入，或按 Esc 返回正文。

选中这段文字，试试浮动工具栏中的段落格式、加粗、下划线和颜色。颜色面板支持文字颜色、高亮与自定义十六进制颜色，最近使用的颜色会保存在当前浏览器中。按 Alt + F10 可用键盘进入工具栏，Esc 返回正文；撤销与重做保留选区。

在只读、编辑、源码和代码块中拖动选中文字，体验统一的圆角选区；切换浅色与深色，查看正文、引用和表格的对比度。

把鼠标移到段落左侧，拖动六点把手调整同级内容的顺序。切回只读或源码，查看保留下来的格式与草稿。

切到「源码」，左右拖动中间分隔线调整源码与预览宽度；方向键可微调，双击恢复均分。切换模式或刷新页面后，继续使用当前浏览器记住的分屏比例。

在「设置 → 外观」关闭「显示状态栏」，把更多空间留给正文；需要文档信息和阅读进度时可再次打开。网页中的设置保留在当前页面，桌面版会在重启后恢复。

### 把内容带到需要的地方

点击顶部的 **导出**，把当前草稿下载为 **PDF、HTML 或 PNG**，无需先保存。导出设置中可以调整纸张、方向、页边距、字号和图片倍率。桌面版还支持 Word、EPUB 等更多离线格式。

导出菜单在按钮下方展开，并保持在窗口内。操作结果通过右上角的轻量彩色提示条显示，短暂出现后自动关闭；悬停或聚焦可暂停，也可以点击关闭按钮。

## 一个轻盈的日常工作流

- [x] 在文件树中选择一份文档
- [x] 通过大纲找到正在思考的章节
- [ ] 切换编辑模式，写下自己的第一句话
- [ ] 打开设置，找到喜欢的阅读皮肤

## 文件，始终由你掌握

桌面版可以打开本地 Markdown 文件与文件夹，无需账号，离线可用。这个网页体验使用独立的示例工作区；编辑仅保留在当前浏览器会话中，刷新即可重新开始。

打开左侧的 **Notes.md** 与 **Markdown.md**，继续体验文件切换、代码、表格、数学公式和流程图。将鼠标移到顶部文件名旁，点击 **×** 关闭当前文档；文件仍保留在左侧，再次打开或切换回来会恢复之前的阅读位置。

展开 **Projects → Marker → Release**，体验多层目录；下方的 **Quick note.md** 是一份独立文件示例，可切换、通过搜索弹窗查找，或从侧栏移除。桌面版还会在重启后恢复文件列表、当前文档、阅读位置和目录的展开、折叠状态。

右键文件、文件夹或工作区，试试打开到侧边、固定标签、复制名称和路径，以及刷新、展开与折叠目录。网页示例中的磁盘新建、重命名、复制与删除不可用；这些操作请在桌面版的已授权工作区使用。

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

Markdown 让简单的文字拥有清晰的结构。切到「编辑」，试试勾选任务、修改表格，或使用代码块顶部的语言、复制与折叠工具；切回「只读」查看排版，草稿会继续保留。

## 用数据图表呈现对比与趋势

切到「编辑」，点击图表顶部的「可视化编辑」，直接修改下方表格；上方实时预览同步更新。选择柱状图、折线图或饼图，在「标题与单位」和「样式」中调整标题、单位、配色、图例与数值。

\`\`\`chart
${serializeChart(createDefaultChart())}
\`\`\`

点击「粘贴数据」，导入 Excel / WPS 复制的制表符数据、CSV 或 Markdown 表格，并选择自动识别、首行表头或无表头。导入会替换当前表格，可用图表内的撤销恢复；拖动粘贴区底边只调整输入区高度。

首列为分类，其余列为数值。空单元格保留为缺失，折线不跨越缺口；数值与百分比不能共用坐标轴。数据最多 200 行、5 个数值系列，饼图最多 12 个分类；发现无效数据时会提示并暂停应用。

点击「完成」作为一次正文修改保存。切到只读、导出 HTML / PDF / PNG，或双击图表重新编辑；图表、表格色标和控件随当前皮肤的深浅模式变化。数据随 Markdown 内的 chart 代码块保存，网页草稿仅保留在当前页面。

## 用思维导图梳理层级

切到「编辑」，点击下方导图顶部的「可视化编辑」，打开思维导图工作台。双击主题改字，用 Tab 添加子主题、Enter 添加同级主题；也可右键复制、删除或调整层级。

\`\`\`mermaid
${DEFAULT_MINDMAP_SAMPLE}
\`\`\`

试试双向、右向和向下布局，拖动分支后点击「整理布局」回到自动排版；系统启用「减少动态效果」时不播放整理动画。用「导图皮肤」预览 8 款皮肤，切换后可撤销，应用到文档后再次打开仍会保留。

在「大纲」中编辑层级，切到「源码」查看 Mermaid mindmap 语法；还可搜索主题、展开或折叠分支、通过缩略导航定位。导图内支持独立撤销重做、SVG 与 PNG 导出；点击「应用」作为一次正文修改保存，取消未应用修改时会提示确认。

阅读和文档导出沿用同一份矢量导图。网页草稿仅保留在当前页面，刷新或重置体验会还原示例。

## 提示与折叠，让信息更有层次

> [!NOTE] 记录一条提示
> 提示块可直接修改标题与正文，保留 **文字格式** 和[文档链接](Notes.md)。

> [!TIP] 下一步怎么做
> 在编辑模式悬停提示块，点击右上角类型按钮，选择提示、注意、警告或成功；也可用方向键与 Enter 操作。

> [!WARNING] 操作前检查
> 切换类型、展开收起和正文修改都支持撤销重做。

> [!SUCCESS] 已经准备好
> 切到只读或导出，保留提示块样式与全部内容。

<details>
<summary>展开查看补充说明</summary>

这里是可以继续编辑的折叠正文。试试标题、列表与嵌套提示块。

- [x] 点击箭头展开或收起
- [ ] 切换到源码，再回到编辑继续操作

> [!NOTE] 嵌套提示
> 折叠内容也能包含提示块与普通段落。

<details>
<summary>继续展开一层</summary>

在这里右键插入提示块，新内容会留在这一层正文中。

</details>

</details>

切到「编辑」后可修改标题与正文，点击箭头收放；在标题按 Enter 进入正文，在末尾空段按 Enter 或用 ⌘ / Ctrl + Enter 退出块并继续写作。切换源码、文档后，控件仍可继续使用。

顶部「插入」、正文右键和 / 菜单都支持中文、英文与拼音别名。输入 warning 或 tishi 查找提示块，输入 zhedie 或 toggle 查找折叠块；从提示块或折叠块正文右键插入时，新块保留在当前正文层级；嵌套时使用离光标最近的一层。要在块外继续写作，可先退出当前块再插入。

网页示例修改仅保留在当前页面；导出会展开折叠正文，保留其中的完整内容。桌面版还包含中文 Word 等格式转换修复。

## 在无限画板中整理想法

切到「编辑」，点击下方画板顶部的「可视化编辑」，拖动卡片、双击改字，或用底部工具栏添加便签、画框、文本、图形、连线和手绘。

\`\`\`canvas
${canvasSources['zh-CN']}
\`\`\`

右键元素，试试编辑文本、复制副本、删除与置于顶层或底层；菜单支持方向键、Enter 和 Esc。Shift 多选后可对齐或等距分布，画框移动时会带上内部对象。空格拖动平移，⌘ / Ctrl + 滚轮缩放，按 0 适应视口；右下角鸟瞰图帮助定位。

打开「画板模板」，选择头脑风暴、架构蓝图或敏捷看板；模板会替换当前画板，可撤销恢复。在「画板设置」选择点阵、网格或纯白背景，调整磁吸与标尺；对象属性按当前选择显示。

画板内撤销、重做独立于正文。「JSON 源码」可直接编辑数据；点击「完成」作为一次正文修改保存，再切到「只读」或导出 HTML 查看矢量图和图层顺序。取消未完成的编辑会先提示保留或放弃；网页草稿仅保留在当前页面，刷新或重置后还原。

## 表格与清单

| 视图 | 适合做什么 |
| :--- | :--- |
| 只读 | 专注阅读与大纲导航 |
| 编辑 | 直接修改排版后的内容 |
| 源码 | 编辑 Markdown，实时查看结果 |

切到「编辑」，悬停表格边缘，使用 ＋ / − 快捷增删行列；在单元格中右键，或按 Shift+F10 打开「表格操作」，插入、删除、选择整行整列或清空内容。菜单支持方向键、Enter 和 Esc。

拖动单元格右边或下边调整列宽、行高，聚焦分隔线后用方向键微调，双击恢复自动尺寸；菜单也可均分列宽。切到「只读」或导出 HTML 检查布局，返回编辑后可撤销、重做。尺寸随 Markdown 注释保留；网页示例草稿仅保留在当前页面，刷新或重置即可还原。

- [x] 标题、引用、列表与表格
- [x] 代码高亮、数学公式与流程图
- [ ] 现在，写下你的想法

## 代码，也有好的阅读体验

打开设置中的字体库，为中文、英文与代码选择 Menlo、Monaco、Inconsolata 或 Space Grotesk；代码预览跟随所选字体。字体未安装时会使用后备字体，网页设置保留在当前页面，桌面版重启后恢复。

\`\`\`javascript
const button = document.createElement('button');
let ideas = 0;
button.textContent = '记录一个灵感 · 0';
button.style.cssText = 'padding:12px 18px;border:0;border-radius:10px;background:#725542;color:white;cursor:pointer';
button.addEventListener('click', () => {
  ideas += 1;
  button.textContent = '记录一个灵感 · ' + ideas;
  console.log('已收集灵感：', ideas);
});
document.body.append(button);
console.log('点击按钮，记录你的下一个灵感。');
\`\`\`

点击代码块顶部的「运行 JavaScript」，在下方点击按钮并查看控制台输出；「停止运行」保留当前画面，「关闭运行结果」收起结果。编辑与只读模式均可手动运行，修改代码或切换文档会清理结果。运行区支持 DOM、Canvas 与顶层 await，不提供 Node.js 或网络访问。

## 在原位预览 HTML

点击下面代码块顶部的「渲染 HTML」，再点击预览中的按钮，查看动态内容、控制台输出与自动高度；点击「查看源码」返回。切到「编辑」，拖动代码块底边或用上下方向键调整源码高度，切换文档后保留；桌面版重启后也会恢复。

\`\`\`html
<article style="padding:24px;border-radius:12px;background:#faf5ed;color:#332a23;font-family:system-ui">
  <h2 style="margin:0 0 12px">Marker HTML</h2>
  <p>同一个代码块里，运行页面并响应点击。</p>
  <button id="add-idea" style="padding:10px 16px;cursor:pointer">添加一条灵感</button>
  <ul id="ideas"></ul>
</article>
<script>
document.getElementById('add-idea').addEventListener('click', () => {
  const list = document.getElementById('ideas');
  const item = document.createElement('li');
  item.textContent = '灵感 ' + (list.children.length + 1) + '：从一个小动作开始。';
  list.append(item);
  console.log(item.textContent);
});
</script>
\`\`\`

HTML 预览可手动加载 HTTP(S) CDN 脚本和样式；网页中的 fetch / XMLHttpRequest 遵循浏览器 CORS。桌面版提供本地请求代理，无需接口开放 CORS；预览无法访问应用文档或 IPC。示例不依赖外部资源，点击后即可离线体验。

## 图片，也能自然排版

切到「编辑」并点击图片，试试下方的说明、缩放和区域尺寸控件，或拖动边缘与角落的把手。图片始终完整显示，切回「只读」或「源码」查看保留的尺寸；修改也支持撤销与重做。

![Marker](${sampleImage} "Marker")

<!-- marker:image-frame {"width":480,"height":320} -->

## 用公式表达

让一个简单的公式，清楚地说出一个想法：

$$e^{i\\pi} + 1 = 0$$

切到「编辑」并点击公式，直接修改高亮的 LaTeX 源码，或「展开到专注工作台」。输入反斜杠选择命令补全，用 Tab / Shift+Tab 跳转参数；撤销和重做只影响当前公式。语法有误时保留上次有效预览，修正后可用 ⌘ / Ctrl + Enter 确认。

点击源码区的「保存为公式片段」，为常用公式填写名称、快捷缩写、分类和标签，也可置顶。在「我的公式」中搜索或筛选，使用 JSON 导入、导出备份。启用参数占位符后，例如 \`\\frac{\${1:a}}{\${2:b}}\`，插入片段即可依次填写分子与分母。

专注工作台可拖动公式库边缘调整宽度，上下拖动源码与预览之间的分隔线调整比例；方向键微调，双击恢复默认。片段、最近使用、收藏和布局保存在当前浏览器，重置示例不会删除公式库。未确认的公式修改仅保留在当前页面，桌面版还支持重启恢复。

## 用图表梳理思路

切到「编辑」，点击图表顶部的「可视化编辑」，在画布中拖动图形、双击改字，或从左侧插入新的流程符号。按住 Shift 多选后，可整组移动、对齐或等距分布；右侧按所选对象显示样式、文本与排列属性。

\`\`\`mermaid
flowchart LR
  A([收集灵感]) --> B{整理结构}
  B -->|开始写作| C[专注写作]
  C --> D([回顾分享])
\`\`\`

使用连接点添加连线，拖动端点换接图形；选中连线后，调整折线、曲线、箭头、拐点、线段与文字位置。支持网格、标尺、自动布局和独立撤销重做。点击「完成」作为一次修改写回正文，可再用正文撤销；布局与样式随 Mermaid 注释保存。高级语法使用源码与实时预览继续编辑。

编辑模式下拖动图表预览底边，或聚焦底边后用上下方向键调高。切换到「只读」沿用同一高度，图表会自适应显示；切换文档后保留高度，网页刷新或重置后清空，桌面版重启可恢复。阅读与编辑也同步了更紧凑的正文顶部间距。

点击图表左上角的 **MERMAID DIAGRAM** 折叠或展开整块图表。切换文件或模式后会保留状态；网页示例仅保留在当前会话，点击「重置体验」或刷新页面即可恢复，桌面版会保存折叠记录。

使用图表上方的 **＋ / −** 连续缩放，放大后可横向滚动查看完整图表；点击百分比重置为 100%，或点击「弹窗」在大视图中查看。

弹窗打开时自动适配画布，调整窗口大小也会重新适配。拖动可平移，滚轮可缩放；点击「适应窗口」、双击画布或按 **0** 回到完整视图，按 **＋ / −** 缩放、**Esc** 关闭。右上角可以复制图表源码。
`,
    },
    {
      id: 'rich-blocks-guide', path: 'Callouts, collapsible blocks and multilingual export guide.md', title: '提示、折叠与导出操作指南',
      markdown: `# 提示、折叠与导出操作指南

这份文件使用较长的名字。缩窄左侧文件栏，悬停文件名查看滚动，移开后恢复省略显示；系统启用减少动态效果时不播放滚动。

打开 Markdown.md 的「提示与折叠，让信息更有层次」，体验四类提示块、嵌套折叠、右键插入和撤销重做。

网页可导出 PDF、HTML 和 PNG，导出时展开折叠正文；Word、EPUB 等转换格式请使用桌面版。
`,
    },
    {
      id: 'release-checklist', path: 'Projects/Marker/Release/Checklist.md', title: '让每一个细节，都有去处',
      markdown: `# 让每一个细节，都有去处

这份文档位于 **Projects / Marker / Release**。展开多层文件夹，或点击顶部搜索按钮查找 Checklist.md，在树形与列表间切换，快速打开深处的笔记。

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

试试点击顶部搜索按钮，搜索 Quick note.md，切换树形 / 列表，或使用侧栏的移除按钮。移除只会将它从当前会话中关闭，不会删除任何本地文件。

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

Open, Search, and the file tree toggle align with the file pane width. Toggle the file tree to watch the pane and its header move together; divider drags resize both, with alignment preserved at the minimum width. Focus a divider to resize with arrow keys, use Home / End for its limits, or double-click to restore its default width. Transitions are disabled when your system requests reduced motion.

Choose Auto-hide under Settings → Appearance → Top toolbar for more reading space. Move the pointer to the top of the workspace to reveal it. Leaving starts a one-second hide delay; returning cancels it, and the document stays in place. You can also Tab to the reveal button, then continue with the pointer.

### Keep your writing in flow

Choose Edit to write directly on the page. Insert, Undo and Redo share the top toolbar. Use Insert and type Table or Math to find a content block, or type \`/\` in the document to insert quickly.

Right-click in the document body to open the same insert menu. Type to filter, use arrow keys and Enter to insert, or press Esc to return to the document.

Select this paragraph to try paragraph styles, bold, underline, and colors in the floating toolbar. The color panel includes text colors, highlights, and custom hex colors. Recent colors stay in this browser. Press Alt + F10 to focus the toolbar and Esc to return to the document; undo and redo preserve your selection.

Drag to select text in Read, Edit, Source, and code blocks to try the shared rounded selection. Switch between light and dark appearances to compare text, quotes, and tables.

Move the pointer to the left of a paragraph and drag its six-dot handle to reorder sibling blocks. Switch back to Read or Source to review your formatting and draft.

Choose Source and drag the middle divider to resize the source and preview. Use arrow keys for fine adjustments or double-click for equal widths. Your split ratio stays in this browser across mode changes and page reloads.

Turn off Show status bar under Settings → Appearance to make more room for the document. Turn it back on for document information and reading progress. Demo settings stay in this page; the desktop app restores them after a restart.

## A lighter everyday workflow

- [x] Choose a document in the file tree
- [x] Find a section in the outline
- [ ] Switch to Edit and write your first line
- [ ] Open Settings and find your favorite reading skin

## Your files, in your hands

The desktop app opens local Markdown files and folders, works offline, and needs no account. This web experience uses a separate sample workspace. Edits stay in the current browser session; refresh to start again.

Open **Notes.md** and **Markdown.md** to explore file switching, code, tables, formulas, and diagrams. Hover beside the filename in the toolbar and click **×** to close the document. It stays in the sidebar, and reopening it or switching back restores your reading position.

Expand **Projects → Marker → Release** to explore nested folders. **Quick note.md** below the workspace is a standalone sample you can select, find with file search, or remove from the sidebar. The desktop app also restores your file list, active document, reading positions, and expanded or collapsed folders after a restart.

Right-click a file, folder, or workspace to open to the side, pin a tab, copy names and paths, or refresh, expand, and collapse folders. Disk creation, renaming, duplication, and deletion are unavailable in the web sample; use an authorized workspace in the desktop app for those actions.

Click **Search Files** at the top, or press **⌘ / Ctrl + P**, to find workspace and standalone files by name or path. Switch between **Tree / List** without losing your query or selection. Search **Checklist** to find a file inside collapsed folders, then click it or press Enter to open it.

Open several documents and switch between their tabs. Right-click a tab to pin it, close other tabs, or reopen a closed document. The list button at the right of the tab bar searches open tabs by name or path; use arrow keys and Enter to switch quickly.

The tab list includes the owning workspace path and skips the second line when only a filename is available. New tab and Insert use distinct icons; hover to see their labels. After closing every tab, New tab remains in the toolbar. Select it to create a blank document in Edit.

### Take your words with you

Use **Export** in the toolbar to download your current draft as **PDF, HTML, or PNG**, without saving first. Export settings let you adjust paper size, orientation, margins, font size, and image scale. The desktop app also supports more offline formats, including Word and EPUB.

The Export dropdown opens below its button and stays within the window. Operation results appear as compact colored toasts at the top right and close automatically. Hover or focus pauses dismissal; the close button dismisses the toast immediately.

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

Markdown gives plain text a useful structure. Switch to Edit to check a task, change a table, or try the language, copy, and fold controls above a code block. Switch back to Read to review the layout; your draft stays with you.

## Compare data with charts

Choose Edit, then Visual editor above the chart. Edit the table below and watch the report preview update. Switch between bar, line, and pie charts; use Title and unit or Style to change labels, units, palettes, legends, and values.

\`\`\`chart
${serializeChart(createDefaultChart(true))}
\`\`\`

Use Paste data for tab-separated Excel / WPS data, CSV, or Markdown tables. Choose automatic header detection, a first-row header, or no header. Import replaces the current table and can be undone inside the chart. Drag the paste area's bottom edge to resize only that input.

The first column holds categories, and the rest hold numbers. Blanks stay missing and lines break at gaps. Numbers and percentages cannot share an axis. Charts support up to 200 rows and five numeric series, with up to 12 categories in pie charts. Invalid data shows a message and prevents applying it.

Done saves one document edit. Review in Read, export HTML / PDF / PNG, or double-click the chart to edit it again. The chart, series swatches, and controls follow the current reading skin. Data stays in a chart code block within Markdown; web drafts stay in this page.

## Organize ideas with a mind map

Choose Edit, then Visual editor above the map to open the mind map workspace. Double-click a topic to edit it, use Tab for a child and Enter for a sibling, or right-click to duplicate, delete, or change the hierarchy.

\`\`\`mermaid
${DEFAULT_MINDMAP_SAMPLE_EN}
\`\`\`

Try Balanced, Rightward, and Top-down layouts. Drag a branch, then choose Tidy up to restore automatic placement; reduced motion disables the tidy animation. Preview eight Map themes, undo a theme change, or apply it and reopen to check the saved theme.

Edit the hierarchy in Outline and inspect Mermaid mindmap syntax in Source. Search topics, fold branches, and navigate with the minimap. The workspace has independent undo/redo and SVG or PNG export. Apply saves one document edit; canceling unapplied changes asks for confirmation.

Read and document exports use the same vector map. Web drafts stay in this page; reload or Reset demo restores the sample.

## Give notes and details their own space

> [!NOTE] Keep a useful note
> Edit the title and body while keeping **text formatting** and [document links](Notes.md).

> [!TIP] Choose the next step
> In Edit, hover over a callout and use its type menu to choose Note, Tip, Warning, or Success. Arrow keys and Enter work too.

> [!WARNING] Check before you act
> Type changes, disclosure toggles, and content edits support undo and redo.

> [!SUCCESS] Ready to share
> Read and exports preserve the callout styling and complete content.

<details>
<summary>Open the supporting details</summary>

This is editable disclosure content, with lists and nested callouts.

- [x] Use the chevron to expand or collapse
- [ ] Switch to Source, then return to Edit and try again

> [!NOTE] A nested note
> Disclosures can contain callouts and ordinary paragraphs.

<details>
<summary>Open one more level</summary>

Right-click here to insert a callout in this body.

</details>

</details>

In Edit, change the title or body and use the chevron to toggle it. Enter in the title moves into the body. Enter in an empty final paragraph, or ⌘ / Ctrl + Enter, exits the block so you can keep writing. Controls keep working after source or document switches.

Insert, the body context menu, and slash commands accept Chinese, English, and pinyin aliases. Search warning or tishi for a callout, and zhedie or toggle for a disclosure. Context insertion keeps the new block in the current callout or disclosure body, using the level nearest the cursor when nested. Exit the block first to insert outside it.

Web edits stay in this page. Exports expand disclosures and keep all of their content. The desktop app also fixes Chinese Word and other converted exports.

## Think on an infinite canvas

Choose Edit, then Visual editor above the canvas block. Move cards, double-click text, or use the bottom tools to add sticky notes, frames, text, shapes, connectors, and freehand drawings.

\`\`\`canvas
${canvasSources['en-US']}
\`\`\`

Right-click an element to edit text, duplicate, delete, or move it to the front or back. Menus support arrow keys, Enter, and Esc. Shift-select for alignment and distribution; moving a frame carries its contents. Space-drag to pan, use ⌘ / Ctrl + wheel to zoom, or press 0 to fit. The minimap helps you navigate.

Open Canvas templates for brainstorming, architecture, and kanban layouts. A template replaces the current board and can be undone. Canvas settings offers dots, grid, or a plain background, snapping, and rulers; object properties follow your selection.

Canvas undo and redo are separate from the document. Edit the data in JSON source, or choose Done to save one document edit. Review the vector drawing and layer order in Read or an HTML export. Cancel asks before discarding unfinished changes. Web drafts stay in this page and reset on reload or Reset demo.

## Tables and tasks

| View | What it is for |
| :--- | :--- |
| Read | Focused reading and outline navigation |
| Edit | Write directly on the formatted page |
| Source | Edit Markdown beside a live preview |

Choose Edit and hover near the table edges to add or remove rows and columns with ＋ / −. Right-click a cell or press Shift+F10 to open Table actions for insertion, deletion, row/column selection, and clearing content. Use arrow keys, Enter, and Esc in the menu.

Drag a cell's right or bottom edge to adjust column width or row height. Focus the divider for arrow-key adjustments, or double-click to restore automatic sizing; the menu can also equalize columns. Review the layout in Read or an HTML export, then return to Edit to undo or redo. Dimensions travel in Markdown comments; sample drafts stay in this page and reset on reload or Reset demo.

- [x] Headings, quotes, lists, and tables
- [x] Highlighted code, formulas, and diagrams
- [ ] Now, add an idea of your own

## Code deserves a good reading experience

Open the font library in Settings to choose Menlo, Monaco, Inconsolata, or Space Grotesk for Chinese, English, and code. The code preview uses your selected font, with fallbacks when a font is not installed. Demo preferences stay in this page; the desktop app restores them after restart.

\`\`\`javascript
const button = document.createElement('button');
let ideas = 0;
button.textContent = 'Capture an idea · 0';
button.style.cssText = 'padding:12px 18px;border:0;border-radius:10px;background:#725542;color:white;cursor:pointer';
button.addEventListener('click', () => {
  ideas += 1;
  button.textContent = 'Capture an idea · ' + ideas;
  console.log('Ideas collected:', ideas);
});
document.body.append(button);
console.log('Click the button to capture your next idea.');
\`\`\`

Choose Run JavaScript above the code block, click the button below, and check the console. Stop keeps the current page; Close output removes the result. Run manually in Read or Edit; code changes and document switches clear the result. The sandbox supports DOM, Canvas, and top-level await, with no Node.js or network access.

## Preview HTML in place

Choose Render HTML, then click the button in the preview to try dynamic content, console output, and automatic height. View source returns to the code. In Edit, drag the bottom edge or use up and down arrows to resize the source. Heights survive file switches, and the desktop app also restores them after a restart.

\`\`\`html
<article style="padding:24px;border-radius:12px;background:#faf5ed;color:#332a23;font-family:system-ui">
  <h2 style="margin:0 0 12px">Marker HTML</h2>
  <p>Run a page and respond to clicks in one code block.</p>
  <button id="add-idea" style="padding:10px 16px;cursor:pointer">Add an idea</button>
  <ul id="ideas"></ul>
</article>
<script>
document.getElementById('add-idea').addEventListener('click', () => {
  const list = document.getElementById('ideas');
  const item = document.createElement('li');
  item.textContent = 'Idea ' + (list.children.length + 1) + ': start with one small action.';
  list.append(item);
  console.log(item.textContent);
});
</script>
\`\`\`

HTML previews can manually load HTTP(S) CDN scripts and styles. Web fetch / XMLHttpRequest follows browser CORS. The desktop app provides a local request proxy without requiring API CORS; previews cannot access application documents or IPC. These samples use no external resources, so you can try them offline after loading.

## Images that fit the page

Choose Edit and select the image to try its caption, scale, and area dimensions, or drag an edge or corner handle. The whole image stays visible. Switch to Read or Source to review its saved dimensions; changes support undo and redo.

![Marker](${sampleImage} "Marker")

<!-- marker:image-frame {"width":480,"height":320} -->

## Say it with a formula

Sometimes a short equation says it best:

$$e^{i\\pi} + 1 = 0$$

Choose Edit and click the formula to change its highlighted LaTeX source, or Expand to focus workspace. Type a backslash for command completion and use Tab / Shift+Tab to move between parameters. Undo and redo affect the current formula. Invalid input keeps the last valid preview; correct it and press ⌘ / Ctrl + Enter to confirm.

Choose Save as formula snippet above the source to add a name, shortcut, category, tags, and an optional pin. Search or filter My formulas, and import or export JSON backups. Enable parameter placeholders to save a template such as \`\\frac{\${1:a}}{\${2:b}}\`; inserting it lets you fill the numerator and denominator in turn.

In the focus workspace, drag the formula library edge to resize it and the horizontal divider to adjust the source and preview ratio. Arrow keys fine-tune the layout; double-click restores the default. Snippets, recent items, favorites, and layout stay in this browser; Reset demo keeps the formula library. Unconfirmed formula edits stay in this page; the desktop app also restores them after a restart.

## Sketch the flow

Choose Edit, then Visual editor above the diagram to drag shapes, double-click to edit text, or insert a flow symbol from the library. Hold Shift to select several shapes, then move, align, or distribute them together. The inspector shows style, text, and arrangement properties for your selection.

\`\`\`mermaid
flowchart LR
  A([Collect ideas]) --> B{Find a structure}
  B -->|Start writing| C[Focus and write]
  C --> D([Review and share])
\`\`\`

Use connection points to add an edge and drag its endpoints to reconnect shapes. Select an edge to adjust its route, arrows, waypoints, segments, and label position. Grid, rulers, automatic layout, and independent undo/redo are available. Done applies one document edit that can be undone; layout and styles travel in Mermaid comments. Advanced syntax remains editable as source with a live preview.

In Edit mode, drag the diagram preview's bottom edge or focus it and use the up/down arrows to change its height. Read mode uses the same height and fits the diagram to it. Heights survive document switches in this page; reload or Reset demo clears them, while the desktop app also restores them after a restart. Read and Edit now share tighter spacing above the document.

Click **MERMAID DIAGRAM** at the top left to collapse or expand the whole block. The state survives file and mode changes. Sample folding stays in this page session; Reset demo or reload restores it. The desktop app saves folding metadata on disk.

Use **＋ / −** above the diagram to zoom in or out. Scroll horizontally to explore an enlarged diagram, click the percentage to reset to 100%, or choose Popout for a larger view.

The popout fits the diagram on opening and when the window resizes. Drag to pan and scroll to zoom. Choose Fit to window, double-click the canvas, or press **0** to fit again. Press **＋ / −** to zoom and **Esc** to close, or copy the diagram source from the top right.
`,
    },
    {
      id: 'rich-blocks-guide', path: 'Callouts, collapsible blocks and multilingual export guide.md', title: 'Callouts, disclosures, and export guide',
      markdown: `# Callouts, disclosures, and export guide

This file has a long name. Narrow the file pane and hover over the name to reveal it. Moving away restores the ellipsis; reduced motion disables scrolling.

Open Give notes and details their own space in Markdown.md for four callout types, nested disclosures, context insertion, and undo/redo.

The website exports PDF, HTML, and PNG with disclosures expanded. Use the desktop app for Word, EPUB, and other converted formats.
`,
    },
    {
      id: 'release-checklist', path: 'Projects/Marker/Release/Checklist.md', title: 'A place for every detail',
      markdown: `# A place for every detail

This document lives in **Projects / Marker / Release**. Expand the nested folders, or use Search Files to find Checklist.md. Switch between tree and list views without losing your search, then open the result.

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

Use Search Files to find Quick note.md, switch between tree and list views, or try its sidebar remove button. Removing it only closes it in this session; it never deletes a local file.

Choose Reset demo to bring this sample back. You can also select your own Markdown files: files read by the browser are never uploaded.
`,
    },
  ],
};

export const getSampleDocuments = (locale: DemoLocale) => samples[locale];
