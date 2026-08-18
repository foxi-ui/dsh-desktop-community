import React from 'react'
import { FEATURES } from '../data'
import { TerminalIcon, FolderIcon, SparkIcon } from './Icons'
import '../styles/features.css'

const ICONS = {
  terminal: TerminalIcon,
  folder: FolderIcon,
  window: SparkIcon,
}

export default function Features() {
  return (
    <section className="ds-section" id="features">
      <div className="ds-container">
        <div className="ds-section-head ds-reveal">
          <span className="ds-badge">
            <span className="ds-badge-inner">Agent = Model + Harness</span>
          </span>
          <h2 className="ds-text-heading1 ds-features-title">
            <span className="ds-font-harness">Desktop</span> 让 Harness 开箱即用
          </h2>
          <div className="ds-features-desc">
            <p className="ds-text-body">
              模型是 Agent 的灵魂，Harness 给予 Agent 理解环境、使用工具并在真实场景中持续工作的能力。
            </p>
            <p className="ds-text-body">
              DeepSeek Harness Desktop 把完整的 Harness 装进一个桌面应用：无需搭建环境，安装即用，
              开箱即可获得完整的 Agent 能力。
            </p>
          </div>
        </div>

        <div className="ds-features-grid ds-reveal">
          {FEATURES.map((f) => {
            const Icon = ICONS[f.icon] || TerminalIcon
            return (
              <div key={f.key} className="ds-feature">
                <div className="ds-feature-icon">
                  <Icon width={22} height={22} />
                </div>
                <h3 className="ds-text-title ds-feature-title">{f.title}</h3>
                <span className="ds-feature-en">{f.en}</span>
                <p className="ds-text-caption ds-feature-desc">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
