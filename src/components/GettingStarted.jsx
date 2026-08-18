import React, { useState } from 'react'
import { LINKS, DOWNLOADS, APP } from '../data'
import { DownloadIcon, CheckIcon, CopyIcon, ArrowUpRightIcon } from './Icons'
import '../styles/getting-started.css'

function CopyCommand({ text }) {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button type="button" className={`ds-copy-btn ${copied ? 'copied' : ''}`} onClick={onCopy}>
      {copied ? <CheckIcon width={13} height={13} /> : <CopyIcon width={13} height={13} />}
      {copied ? '已复制' : '复制'}
    </button>
  )
}

const CARDS = [
  {
    title: '快速体验（命令行版）',
    desc: '不想装环境？先通过 npx 一键体验 dsh 的 Web UI。桌面版则无需任何前置环境。',
    code: 'npx @deepseek-ai/dsh web',
    prompt: '$',
    href: LINKS.dshRepo,
    linkText: '了解命令行版 dsh',
  },
  {
    title: '源码安装（命令行版）',
    desc: '获取完整项目源码，并按照仓库说明完成安装。桌面版同样开源，欢迎 fork。',
    code: 'git clone https://github.com/deepseek-ai/deepseek-harness',
    prompt: '$',
    href: LINKS.dshRepo,
    linkText: '前往 deepseek-harness 仓库',
  },
]

export default function GettingStarted() {
  const mac = DOWNLOADS[0]

  return (
    <section className="ds-section" id="getting-started">
      <div className="ds-container">
        <div className="ds-section-head ds-reveal">
          <span className="ds-badge">
            <span className="ds-badge-inner">开始使用</span>
          </span>
          <h2 className="ds-text-heading1">自定义你的 DeepSeek Harness</h2>
          <p className="ds-text-body ds-section-desc">
            三种方式任选：下载桌面版开箱即用，或用 npx 快速体验，或从源码自行构建。
          </p>
        </div>

        <div className="ds-gs-grid ds-reveal">
          {/* 桌面版卡片（主推） */}
          <div className="ds-gs-card ds-gs-download">
            <div className="ds-gs-download-head">
              <span className="ds-gs-icon">
                <img src="/icon.png" alt="" />
              </span>
              <div>
                <h3 className="ds-text-subtitle">下载桌面版</h3>
                <p className="ds-text-caption ds-gs-sub">
                  v{APP.version} · macOS / Windows / Linux · 无需 Node.js
                </p>
              </div>
              <span className="ds-gs-tag">推荐</span>
            </div>

            <p className="ds-text-body ds-gs-desc">
              内置完整 dsh CLI 与 Web 前端，安装即用。启动后自动拉起 dsh 服务并在原生窗口中打开，
              数据存放在 ~/.dsh，与命令行版完全互通。
            </p>

            <div className="ds-gs-download-actions">
              <a
                className="ds-btn ds-btn-primary ds-btn-m"
                href={LINKS.download(mac.files[0].file)}
                target="_blank"
                rel="noreferrer"
              >
                <DownloadIcon /> 下载 macOS 版（{mac.files[0].size}）
              </a>
              <a
                className="ds-btn ds-btn-secondary ds-btn-m"
                href={LINKS.releasesLatest}
                target="_blank"
                rel="noreferrer"
              >
                查看全部平台 <ArrowUpRightIcon width={14} height={14} />
              </a>
            </div>

            <ul className="ds-gs-points">
              <li>自动更新：启动后检查新版本，应用内一键「拉取 + 构建 + 重新打包」</li>
              <li>单实例运行，支持系统菜单与浏览器同款快捷键</li>
              <li>受限沙箱环境自动回退数据目录</li>
            </ul>
          </div>

          {/* 命令行卡片组 */}
          <div className="ds-gs-cards">
            {CARDS.map((c) => (
              <div key={c.title} className="ds-gs-card">
                <h3 className="ds-text-title">{c.title}</h3>
                <p className="ds-text-caption ds-gs-sub">{c.desc}</p>
                <div className="ds-code ds-gs-code">
                  <code>
                    <span className="prompt">{c.prompt} </span>
                    {c.code}
                  </code>
                  <CopyCommand text={c.code} />
                </div>
                <a href={c.href} target="_blank" rel="noreferrer" className="ds-gs-link">
                  {c.linkText} <ArrowUpRightIcon width={13} height={13} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
