# Marker 官网

官网是纯静态页面，无需安装依赖或构建，使用独立 GitHub 仓库与 GitHub Pages 部署。

- 官网地址：<https://qian-lou.github.io/marker-site/>
- 官网仓库：<https://github.com/qian-lou/marker-site>

Marker 主应用为闭源产品。官网仓库只保存公开的网页和产品素材，不包含主应用源码，也不应链接主应用的私有代码仓库。

## 本地预览

在官网仓库根目录运行：

```sh
python3 -m http.server 4173
```

打开 <http://localhost:4173>。资源使用相对路径，也支持 GitHub Pages 的 `/仓库名/` 子路径部署。

如果从主工程进入官网仓库，先执行 `cd site`。

`config.js` 中的 `window.MARKER_SITE` 提供以下公开链接配置，默认均为空：

- `downloadUrl`：已发布安装包或产品发布页的完整 URL。
- `contactUrl`：公开反馈、客服或联系页面的完整 URL。

链接只用于官网按钮，不要求公开主应用源码。正式发布安装包前应保持 `downloadUrl` 为空，官网不能宣称已有下载。

## 部署到 GitHub Pages

官网仓库的 Pages 发布源为 **GitHub Actions**。每次推送到 `main`，`.github/workflows/pages.yml` 都会自动发布页面。

在官网仓库目录中提交更新：

```sh
git add .
git commit -m "更新官网"
git push
```

在仓库 **Actions** 中查看 **Deploy website to GitHub Pages**。成功后可通过 `github-pages` 部署环境的链接访问官网，也可以选择 **Run workflow** 手动部署。

如果复用这套页面创建其他仓库，先在 **Settings → Pages** 中将 **Source** 设置为 **GitHub Actions**，再推送到 `main`。

部署方式参考 [GitHub Pages 自定义工作流官方文档](https://docs.github.com/zh/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

工作流会在临时目录准备发布内容。发布内容仅包含 `index.html`、`styles.css`、`script.js`、`config.js` 和 `assets/`，不会发布本说明文档、Git 元数据或主工程文件。工作流直接使用已提交的 `config.js`，不会自动推断下载或联系地址；配置应填写真实且可公开访问的 URL。
