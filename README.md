# DeepSeek Harness Desktop 官网下载站

[dsh-desktop-v2](https://github.com/foxi-ui/deepseek-harness-desktop) 的桌面工具官网 / 下载站。

## 技术栈

- React 18 + Vite 5
- 纯 CSS 设计令牌（见 `src/styles/tokens.css`）
- 字体（DM Sans / Montserrat / Fragment Mono）已自托管于 `public/fonts/`，无需外网

## 本地开发

```bash
npm install
npm run dev        # http://127.0.0.1:5173
```

## 构建

```bash
npm run build      # 产物输出到 dist/
npm run preview    # 本地预览构建产物
```

## 站点结构

| 区块 | 说明 |
| --- | --- |
| Hero | 品牌标语 + 桌面应用窗口模拟 + 平台下载按钮 |
| 下载 | macOS / Windows / Linux 平台卡片、文件与 SHA-512、分平台安装步骤 |
| 功能特性 | 内置运行时 / 数据互通 / 原生桌面体验 |
| 设计思路 | 一切皆插件、自动更新、环境适配（含更新终端模拟） |
| 开始使用 | 桌面版下载 / npx 快速体验 / 源码安装 |
| CTA + 页脚 | 加入生态、微信公众号二维码、MIT 许可 |

## 定制下载地址

真实安装包由 [GitHub Releases](https://github.com/foxi-ui/deepseek-harness-desktop/releases) 发布。
下载链接在 `src/data.js` 的 `LINKS.download()` 中按
`releases/latest/download/<产物名>` 约定生成，产物名 / 版本 / 大小 / SHA-512 均可在此文件统一修改。

## 说明

- 当前仅 macOS 产物已构建（`DeepSeek-Harness-Desktop-0.1.0-mac.zip`），Windows / Linux 标注「即将推出」。
- 微信二维码为占位图（`src/components/QrCode.jsx`），可替换为真实二维码。
- 站点为纯静态单页，可部署到任意静态托管（GitHub Pages / Nginx 等）。
- **免责声明**：本工具为社区爱好者制作的体验版，非 DeepSeek 官方产品，与官方无任何关联。
