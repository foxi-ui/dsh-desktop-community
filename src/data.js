/* 站点数据：版本、下载产物、链接 */

export const APP = {
  productName: 'DeepSeek Harness Desktop',
  name: 'dsh-desktop-v2',
  version: '0.1.0',
  releaseDate: '2026-08-18',
  repo: 'foxi-ui/deepseek-harness-desktop',
  dshRepo: 'deepseek-ai/deepseek-harness',
  license: 'MIT',
  copyright: '© 2026 DeepSeek Harness Desktop 社区项目组',
  trademark: '「DeepSeek」及相关标识归其权利所有者所有',
}

export const LINKS = {
  releasesLatest: 'https://github.com/foxi-ui/deepseek-harness-desktop/releases/latest',
  releasesAll: 'https://github.com/foxi-ui/deepseek-harness-desktop/releases',
  repo: 'https://github.com/foxi-ui/deepseek-harness-desktop',
  dshRepo: 'https://github.com/deepseek-ai/deepseek-harness',
  dshDocs: 'https://github.com/deepseek-ai/deepseek-harness#readme',
  plugins: 'https://github.com/deepseek-ai/deepseek-harness/tree/master/packages',
  download: (artifact) =>
    `https://github.com/foxi-ui/deepseek-harness-desktop/releases/latest/download/${artifact}`,
}

/* 平台下载产物
   status: 'ready' 已提供下载 | 'soon' 即将推出（仍可跳转 GitHub Releases） */
export const DOWNLOADS = [
  {
    id: 'mac',
    platform: 'macOS',
    arch: 'Intel & Apple Silicon',
    os: 'macOS 12.0 及以上',
    icon: 'apple',
    status: 'ready',
    primary: true,
    note: '内置 Electron 43（Node 24），满足 dsh 0.1.0-rc.7 对 Node ≥ 22.19 的要求',
    files: [
      {
        label: '磁盘映像 (.dmg)',
        file: 'DeepSeek-Harness-Desktop-0.1.0-mac.dmg',
        desc: '双击挂载，拖入「应用程序」即可安装',
        size: '约 166 MB',
      },
      {
        label: '压缩包 (.zip)',
        file: 'DeepSeek-Harness-Desktop-0.1.0-mac.zip',
        desc: '解压即得 .app，分发版',
        size: '166.3 MB',
        sha512: 'ahWs7mkarlFfzsGcvm4HjKgUmPzFu18bk6FQTgWrQR/jbaaCL7up4W86yEmbDDYTG5h/f4aVO97iFP81tlB7YA==',
      },
    ],
  },
  {
    id: 'win',
    platform: 'Windows',
    arch: 'x64',
    os: 'Windows 10 及以上',
    icon: 'windows',
    status: 'soon',
    note: 'NSIS 安装向导，安装即用',
    files: [
      {
        label: '安装程序 (.exe)',
        file: 'DeepSeek-Harness-Desktop-0.1.0-win.exe',
        desc: '运行安装向导，按提示完成安装',
        size: '即将推出',
      },
    ],
  },
  {
    id: 'linux',
    platform: 'Linux',
    arch: 'x64',
    os: 'Ubuntu 20.04 / Debian 11 及以上',
    icon: 'linux',
    status: 'soon',
    note: '单文件可执行，免安装',
    files: [
      {
        label: 'AppImage',
        file: 'DeepSeek-Harness-Desktop-0.1.0.AppImage',
        desc: 'chmod +x 后直接运行',
        size: '即将推出',
      },
    ],
  },
]

export const FEATURES = [
  {
    key: 'runtime',
    icon: 'terminal',
    title: '内置 dsh 运行时',
    en: 'BUILT-IN RUNTIME',
    desc: '随应用打包完整 dsh CLI 与 Web 前端，开箱即用——无需安装 Node.js / pnpm，无需克隆源码，安装即可开始使用。',
  },
  {
    key: 'data',
    icon: 'folder',
    title: '数据与命令行互通',
    en: 'DATA COMPATIBLE',
    desc: '统一使用 ~/.dsh 作为数据目录（即 DSH_HOME），会话、凭据、插件与命令行版 dsh 完全共享，切换不丢失任何数据。',
  },
  {
    key: 'native',
    icon: 'window',
    title: '原生桌面体验',
    en: 'NATIVE DESKTOP',
    desc: '单实例运行、系统菜单（编辑 / 视图 / 窗口 / 帮助）、同源页面自动开新窗口、外部链接自动交给系统浏览器。',
  },
]

export const ARCH_SECTIONS = [
  {
    icon: 'plugin',
    title: '一切皆插件',
    desc: 'DeepSeek Harness 基于 Cordis 插件系统构建。模型、工具、技能、会话、沙箱、存储、循环、调度、UI 等所有 Agent 能力均由插件提供，并通过 Cordis 服务与事件彼此协作。桌面版打包了完整插件生态，无需改动源码即可在配置层选择、替换或扩展任一能力。',
  },
  {
    icon: 'refresh',
    title: '启动即检查，应用内一键更新',
    desc: '应用启动后自动对比 deepseek-harness 仓库版本号。发现新版本时，可在应用内一键「拉取 + 构建 + 重新打包」，重启即生效，无需手动维护环境。',
  },
  {
    icon: 'shield',
    title: '环境适配与沙箱回退',
    desc: '受限沙箱 / 容器环境自动回退用户数据目录；必要时可使用 --no-sandbox 启动。数据目录、端口、宿主等均支持命令行参数与环境变量配置。',
  },
]
