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

`config.js` 中的 `window.MARKER_SITE` 提供以下公开链接配置：

- `downloadUrl`：已发布安装包或产品发布页的完整 URL。
- `contactUrl`：公开反馈、客服或联系页面的完整 URL。

链接只用于官网按钮，不要求公开主应用源码。安装包的发布入口为 <https://github.com/qian-lou/marker-site/releases>；预览版本不会出现在 GitHub 的 `releases/latest` 中，因此不要使用该地址。下载入口已配置不代表构建成功，应以 Releases 中实际公开的安装包为准。

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

## 构建并发布桌面安装包

主应用源码保存于私有仓库 `qian-lou/marker`。公开仓库 `qian-lou/marker-site` 中的 **Release desktop application** 工作流读取指定版本的私有源码，构建安装包，并将产物发布到官网仓库的 Releases。页面部署与应用发布分别运行；更新网页不会自动发布应用。

### 私有源码读取权限

私有仓库使用名为 `marker-site-release-readonly` 的只读 Deploy Key，其私钥保存为官网仓库的 Actions secret `MARKER_SOURCE_SSH_KEY`。

如需重新配置，在私有仓库 **Settings → Deploy keys** 添加公钥，保持 **Allow write access** 未勾选；在官网仓库 **Settings → Secrets and variables → Actions** 保存对应私钥。私钥不能提交到任一仓库，也不能放入 `config.js` 或网页资源。

### 应用内更新签名

应用使用 Tauri 2 官方 updater 下载、校验并安装更新。发布前，在官网仓库的 **Settings → Secrets and variables → Actions** 配置以下 secret：

- `TAURI_SIGNING_PRIVATE_KEY`：专用于 Marker 更新的 Tauri 签名私钥内容，必须与主应用 `tauri.conf.json` 中 `plugins.updater.pubkey` 的公钥匹配。
- `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`：生成私钥时使用的密码；未设置密码的私钥可以不配置此 secret。

缺少私钥时，工作流会在构建前明确失败，不会发布没有签名的更新包。私钥与密码通过构建步骤的环境变量读取，不写入公开产物或日志。妥善备份私钥；已安装应用信任对应公钥，更换或丢失私钥会影响后续更新。公钥可以提交，私钥及密码不能提交到任一仓库。

Tauri 更新包签名与 Apple Developer ID、公证及 Windows 代码签名是不同机制；具备更新签名不代表安装包已获得系统发行签名。配置与密钥生成方法参见 [Tauri 官方更新文档](https://v2.tauri.app/plugin/updater/)。

### 手动发布

1. 将准备发布的源码提交并推送到私有仓库。
2. 打开官网仓库 **Actions → Release desktop application → Run workflow**。
3. 在 `source_ref` 中填写私有仓库的分支、标签或完整提交 SHA，例如 `main`、`v0.1.0` 或指定提交；运行工作流。
4. 查看构建与发布结果，确认 Releases 中的安装包、更新包、`.sig`、`latest.json` 和 `SHA256SUMS.txt` 已公开，再进行下载安装及应用内更新验证。

工作流先将 `source_ref` 解析为固定提交 SHA，所有平台都检出同一提交，避免构建过程中分支移动造成版本混用。

应用版本读取自私有源码的 `apps/desktop/src-tauri/tauri.conf.json`，当前为 `0.1.4`；不会使用前端 `package.json` 的版本。已发布版本不能覆盖，需要发布新版本时先在私有源码中更新版本，并保持 `Cargo.toml` 的应用版本一致。

### 构建矩阵与发布条件

| 构建环境 | 架构 | 安装包 | 应用内更新资产 |
| --- | --- | --- | --- |
| `macos-15` | Apple Silicon / ARM64 | `.dmg` | `.app.tar.gz`、`.app.tar.gz.sig` |
| `macos-15-intel` | Intel / x64 | `.dmg` | `.app.tar.gz`、`.app.tar.gz.sig` |
| `windows-2022` | x64 | NSIS `.exe` | 复用 `.exe`、另带 `.exe.sig` |
| `ubuntu-22.04` | x64 | `.deb`、`.AppImage` | 复用各自安装包、另带对应 `.sig` |

只有全部矩阵构建成功、产物的来源提交、版本、精确文件集合、大小和 SHA-256 校验通过后，工作流才生成 `latest.json`，通过 Release 草稿上传产物并发布。公开内容仅包含安装包、更新包、签名、`latest.json` 和 `SHA256SUMS.txt`，不上传私有源码或整个构建目录。下载后可用 `SHA256SUMS.txt` 核对文件完整性；它也包含 `latest.json` 和签名文件的校验值。

每个版本的 `latest.json` 使用固定的版本资产 URL，内嵌 `.sig` 文件的文本内容，并按实际安装包类型提供五个 updater 平台键：`darwin-aarch64-app`、`darwin-x86_64-app`、`windows-x86_64-nsis`、`linux-x86_64-deb`、`linux-x86_64-appimage`。Linux 不提供混用 DEB 与 AppImage 的通用回退，应用会按自身安装类型选择更新包。

预览版继续使用 `prerelease: true`，因此客户端先从公开 Releases 列表选择更高版本且具备 `latest.json` 的发布，再请求该版本的清单；不能使用 GitHub 的 `/releases/latest/download/latest.json`。此前不含签名更新包的旧发布不会作为应用内更新目标。应用内安装仍需由用户点击更新按钮触发。

当前采用预览版发布：macOS 安装包使用 ad-hoc 签名，尚未经过 Apple 公证，首次打开可能需要在系统“隐私与安全性”中允许；Windows 安装包尚未进行代码签名，可能显示 SmartScreen 提示。公开 Release 说明会保留这些安装限制。

上述内容描述工作流的机制与操作，不代表某次构建已成功；每次发布均以对应 Actions 运行结果和 Releases 实际产物为准。
