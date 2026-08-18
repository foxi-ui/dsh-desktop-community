import React from 'react'
import { GitHubIcon, DownloadIcon, WindowsIcon, LinuxIcon, ArrowUpRightIcon } from './Icons'
import { LINKS, DOWNLOADS } from '../data'
import WindowMock from './WindowMock'
import '../styles/hero.css'

export default function Hero() {
  const mac = DOWNLOADS[0]

  return (
    <section className="ds-hero" id="top">
      {/* 背景光斑 */}
      <div className="ds-hero-bg" aria-hidden="true">
        <div className="ds-blob ds-blob-1" />
        <div className="ds-blob ds-blob-2" />
        <div className="ds-blob ds-blob-3" />
        <div className="ds-hero-grid" />
      </div>

      <div className="ds-container ds-hero-grid-main">
        <div className="ds-hero-copy">
          <div className="ds-hero-enter">
            <span className="ds-badge">
              <span className="ds-badge-inner">DeepSeek Harness Desktop · v0.1.0 · 社区体验版</span>
            </span>
          </div>

          <h1 className="ds-text-hero ds-hero-title ds-hero-enter" style={{ animationDelay: '0.08s' }}>
            一切皆插件
            <br />
            桌面端开箱即用
          </h1>

          <div className="ds-hero-enter ds-hero-desc" style={{ animationDelay: '0.16s' }}>
            <p className="ds-text-body">
              DeepSeek Harness Desktop 将 <strong>dsh</strong> 完整封装为跨平台桌面应用：内置 CLI 与 Web 前端，
              无需安装 Node.js、无需克隆源码，安装即用。
            </p>
            <p className="ds-text-body">
              会话与数据存放在 <code className="ds-inline-code">~/.dsh</code>，与命令行版完全互通；
              启动后自动检查更新，可在应用内一键拉取、构建并重新打包。
            </p>
            <p className="ds-hero-disclaimer" title="本工具为社区体验版，非 DeepSeek 官方产品，与官方无任何关联">
              <span className="ds-hero-disclaimer-mark">!</span>
              <span className="ds-hero-disclaimer-text">
                社区体验版客户端，<strong>非 DeepSeek 官方产品</strong>，与官方无任何关联。
              </span>
            </p>
          </div>

          <div className="ds-hero-enter ds-hero-cta" style={{ animationDelay: '0.24s' }}>
            <a
              className="ds-btn ds-btn-primary ds-btn-m"
              href={LINKS.download(mac.files[0].file)}
              target="_blank"
              rel="noreferrer"
            >
              <DownloadIcon /> 下载 macOS 版
            </a>
            <a
              className="ds-btn ds-btn-secondary ds-btn-m"
              href={LINKS.releasesLatest}
              target="_blank"
              rel="noreferrer"
            >
              <WindowsIcon /> Windows
            </a>
            <a
              className="ds-btn ds-btn-secondary ds-btn-m"
              href={LINKS.releasesLatest}
              target="_blank"
              rel="noreferrer"
            >
              <LinuxIcon /> Linux
            </a>
            <a className="ds-btn ds-btn-ghost ds-btn-m" href={LINKS.repo} target="_blank" rel="noreferrer">
              <GitHubIcon /> GitHub
            </a>
          </div>

          <div className="ds-hero-enter ds-hero-meta" style={{ animationDelay: '0.3s' }}>
            <span>
              macOS · Windows · Linux 三平台支持
            </span>
            <span className="ds-hero-meta-dot" />
            <span>开源 · MIT License</span>
            <span className="ds-hero-meta-dot" />
            <span>
              <a href="#download" className="ds-hero-meta-link">
                查看全部安装包 <ArrowUpRightIcon width={12} height={12} />
              </a>
            </span>
          </div>
        </div>

        <div className="ds-hero-visual ds-hero-enter" style={{ animationDelay: '0.2s' }}>
          <WindowMock />
        </div>
      </div>
    </section>
  )
}
