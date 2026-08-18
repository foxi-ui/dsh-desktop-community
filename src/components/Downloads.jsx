import React, { useState } from 'react'
import { DOWNLOADS, LINKS, APP } from '../data'
import { AppleIcon, WindowsIcon, LinuxIcon, DownloadIcon, CheckIcon, CopyIcon, ArrowUpRightIcon, ShieldIcon } from './Icons'
import '../styles/downloads.css'

const ICONS = {
  apple: AppleIcon,
  windows: WindowsIcon,
  linux: LinuxIcon,
}

const INSTALL_STEPS = {
  mac: [
    { title: '下载安装包', desc: '选择 .dmg 磁盘映像或 .zip 压缩包下载。' },
    { title: '安装应用', desc: '.dmg：双击挂载，将 DeepSeek Harness Desktop 拖入「应用程序」；.zip：解压后把 .app 拖入「应用程序」。' },
    { title: '首次打开', desc: '当前版本未做代码签名，首次打开如遇 Gatekeeper 提示，右键点击应用图标选择「打开」即可放行。' },
    { title: '开始使用', desc: '应用自动拉起内置 dsh 服务并打开 Web 主界面，按引导配置模型 / 凭据即可开始使用。' },
  ],
  win: [
    { title: '下载安装程序', desc: '下载 NSIS 安装程序（.exe）。' },
    { title: '运行安装向导', desc: '双击运行，按向导完成安装。SmartScreen 如提示「已阻止运行」，选择「更多信息 → 仍要运行」。' },
    { title: '开始使用', desc: '启动应用，自动拉起内置 dsh 服务并打开 Web 主界面。' },
  ],
  linux: [
    { title: '下载 AppImage', desc: '下载单文件 AppImage。' },
    { title: '赋予执行权限', desc: '终端执行 chmod +x DeepSeek-Harness-Desktop-*.AppImage。' },
    { title: '运行', desc: '执行 ./DeepSeek-Harness-Desktop-*.AppImage 启动应用。' },
  ],
}

function CopySha({ text }) {
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
      {copied ? '已复制' : '复制校验值'}
    </button>
  )
}

export default function Downloads() {
  const [active, setActive] = useState('mac')

  return (
    <section className="ds-section ds-downloads" id="download">
      <div className="ds-container">
        <div className="ds-section-head ds-reveal">
          <span className="ds-badge">
            <span className="ds-badge-inner">下载与安装 · v{APP.version}</span>
          </span>
          <h2 className="ds-text-heading1">选择你的平台，即刻开始</h2>
          <p className="ds-text-body ds-section-desc">
            DeepSeek Harness Desktop 提供 macOS、Windows、Linux 三平台安装包，全部通过 GitHub Releases 发布，开源免费。
            macOS 版已开放下载，Windows / Linux 版本正在构建中。
          </p>
        </div>

        {/* 平台卡片 */}
        <div className="ds-platforms ds-reveal">
          {DOWNLOADS.map((p) => {
            const Icon = ICONS[p.icon]
            const ready = p.status === 'ready'
            return (
              <div key={p.id} className={`ds-platform ${p.primary ? 'is-primary' : ''} ${ready ? 'is-ready' : ''}`}>
                <div className="ds-platform-head">
                  <span className="ds-platform-icon">
                    <Icon width={22} height={22} />
                  </span>
                  <div className="ds-platform-name">
                    <h3 className="ds-text-title">{p.platform}</h3>
                    <span className="ds-platform-arch">{p.arch}</span>
                  </div>
                  <span className={`ds-platform-status ${ready ? 'ok' : 'soon'}`}>
                    {ready ? '可下载' : '即将推出'}
                  </span>
                </div>

                <div className="ds-platform-body">
                  <div className="ds-platform-os">
                    <span className="ds-platform-os-label">系统要求</span>
                    <span className="ds-platform-os-value">{p.os}</span>
                  </div>

                  <div className="ds-file-list">
                    {p.files.map((f) => (
                      <div key={f.label} className="ds-file">
                        <div className="ds-file-info">
                          <span className="ds-file-label">{f.label}</span>
                          <span className="ds-file-desc">{f.desc}</span>
                        </div>
                        <div className="ds-file-side">
                          <span className="ds-file-size">{f.size}</span>
                          {ready ? (
                            <a
                              className="ds-btn ds-btn-primary ds-btn-s"
                              href={LINKS.download(f.file)}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <DownloadIcon /> 下载
                            </a>
                          ) : (
                            <a
                              className="ds-btn ds-btn-secondary ds-btn-s"
                              href={LINKS.releasesLatest}
                              target="_blank"
                              rel="noreferrer"
                            >
                              关注 Release <ArrowUpRightIcon width={13} height={13} />
                            </a>
                          )}
                        </div>
                        {f.sha512 && (
                          <div className="ds-file-sha">
                            <span className="ds-file-sha-label">SHA-512</span>
                            <code className="ds-file-sha-value">{f.sha512}</code>
                            <CopySha text={f.sha512} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="ds-platform-note">{p.note}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* 安装说明 */}
        <div className="ds-install ds-reveal">
          <div className="ds-install-tabs">
            {DOWNLOADS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`ds-install-tab ${active === p.id ? 'is-active' : ''}`}
                onClick={() => setActive(p.id)}
              >
                {p.platform}
              </button>
            ))}
          </div>

          <div className="ds-install-panel">
            <ol className="ds-install-steps">
              {INSTALL_STEPS[active].map((s, i) => (
                <li key={s.title} className="ds-install-step">
                  <span className="ds-step-num">{i + 1}</span>
                  <div>
                    <h4 className="ds-text-title">{s.title}</h4>
                    <p className="ds-text-caption ds-install-step-desc">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="ds-install-tip">
              <ShieldIcon width={16} height={16} />
              <p className="ds-text-caption">
                当前版本未做代码签名，系统首次打开可能出现安全提示，按上述步骤放行即可。正式版将启用签名与公证。
              </p>
            </div>
          </div>
        </div>

        {/* 免责声明 */}
        <div className="ds-disclaimer ds-reveal">
          <span className="ds-disclaimer-icon">!</span>
          <div className="ds-disclaimer-body">
            <span className="ds-disclaimer-title">免责声明</span>
            <p>
              DeepSeek Harness Desktop 是由社区开发者基于开源项目 deepseek-harness 封装制作的
              <strong>体验版桌面工具，非 DeepSeek 官方产品</strong>，与 DeepSeek 官方无任何关联、未获其背书或认可。
              本软件按 MIT 许可证「按现状（AS IS）」提供，作者不对使用本软件产生的任何直接或间接损失承担责任；
              请自行评估风险后再行下载、安装与使用。
            </p>
          </div>
        </div>

        <div className="ds-downloads-foot">
          <span className="ds-text-caption">需要历史版本或校验其他平台？</span>
          <a href={LINKS.releasesAll} target="_blank" rel="noreferrer" className="ds-text-caption ds-downloads-link">
            前往 GitHub Releases 查看全部版本 <ArrowUpRightIcon width={13} height={13} />
          </a>
        </div>
      </div>
    </section>
  )
}
