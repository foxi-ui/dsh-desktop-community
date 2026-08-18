import React from 'react'
import { GitHubIcon, DocIcon, PluginIcon, PaperIcon, ArrowUpRightIcon } from './Icons'
import { LINKS } from '../data'
import '../styles/cta.css'

export default function CtaSection() {
  return (
    <div className="ds-cta-wrap">
      <div className="ds-cta-bg" aria-hidden="true">
        <div className="ds-cta-blob ds-cta-blob-1" />
        <div className="ds-cta-blob ds-cta-blob-2" />
        <div className="ds-cta-blob ds-cta-blob-3" />
      </div>

      <section className="ds-container ds-cta">
        <h2 className="ds-text-heading1 ds-cta-title">加入 DSH 桌面生态</h2>
        <p className="ds-text-body ds-cta-desc">
          DeepSeek Harness Desktop 由社区开发者维护，目前仍处于体验阶段，核心功能与安装包将持续迭代。
          我们期待与全球开发者一起，在开源、开放、可复用、可组合的基础设施之上，共同探索桌面端 Agent 的更多可能。
        </p>
        <div className="ds-cta-btns">
          <a className="ds-btn ds-btn-primary ds-btn-m ds-cta-btn" href={LINKS.repo} target="_blank" rel="noreferrer">
            <GitHubIcon /> 查看 GitHub
          </a>
          <a className="ds-btn ds-btn-secondary ds-btn-m ds-cta-btn" href={LINKS.dshDocs} target="_blank" rel="noreferrer">
            <DocIcon /> 开发者文档
          </a>
          <a className="ds-btn ds-btn-secondary ds-btn-m ds-cta-btn" href={LINKS.plugins} target="_blank" rel="noreferrer">
            <PluginIcon /> 社区插件
          </a>
          <a className="ds-btn ds-btn-secondary ds-btn-m ds-cta-btn" href={LINKS.dshRepo} target="_blank" rel="noreferrer">
            <PaperIcon /> deepseek-harness 源码
          </a>
        </div>
        <a className="ds-cta-more" href={LINKS.releasesAll} target="_blank" rel="noreferrer">
          前往 GitHub Releases 下载最新版本 <ArrowUpRightIcon width={14} height={14} />
        </a>
      </section>
    </div>
  )
}
