import React from 'react'
import { ARCH_SECTIONS } from '../data'
import { PluginIcon, RefreshIcon, ShieldIcon } from './Icons'
import UpdateTerminal from './UpdateTerminal'
import '../styles/architecture.css'

const ICONS = {
  plugin: PluginIcon,
  refresh: RefreshIcon,
  shield: ShieldIcon,
}

function ArchitectureItems({ stacked = false }) {
  return (
    <div className={`ds-arch-items ${stacked ? 'is-stacked' : ''}`}>
      {ARCH_SECTIONS.map((s) => {
        const Icon = ICONS[s.icon] || PluginIcon
        return (
          <div key={s.title} className="ds-arch-item">
            <div className="ds-arch-item-head">
              <span className="ds-arch-item-icon">
                <Icon width={20} height={20} />
              </span>
              <h3 className="ds-text-subtitle ds-arch-item-title">{s.title}</h3>
            </div>
            <p className="ds-text-body ds-arch-item-desc">{s.desc}</p>
          </div>
        )
      })}
    </div>
  )
}

export default function Architecture() {
  return (
    <section className="ds-section" id="architecture">
      <div className="ds-container">
        <div className="ds-arch-head ds-reveal">
          <span className="ds-badge">
            <span className="ds-badge-inner">设计思路</span>
          </span>
          <h2 className="ds-text-heading1">跨平台分发，运行有迹可循</h2>
        </div>

        {/* 桌面端：左列表 + 右粘性视觉 */}
        <div className="ds-arch-desktop">
          <ArchitectureItems />
          <div className="ds-arch-visual">
            <UpdateTerminal />
          </div>
        </div>

        {/* 移动端：堆叠 */}
        <div className="ds-arch-mobile">
          <ArchitectureItems stacked />
          <div className="ds-arch-visual">
            <UpdateTerminal />
          </div>
        </div>
      </div>
    </section>
  )
}
