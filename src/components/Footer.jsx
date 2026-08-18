import React from 'react'
import { APP, LINKS } from '../data'
import QrCode from './QrCode'
import '../styles/footer.css'

export default function Footer() {
  return (
    <footer className="ds-footer">
      <div className="ds-container">
        <div className="ds-footer-divider" />

        {/* 免责声明 */}
        <div className="ds-footer-disclaimer ds-reveal">
          <span className="ds-footer-disclaimer-mark">!</span>
          <div>
            <p>
              <strong>免责声明：</strong>DeepSeek Harness Desktop 为社区爱好者制作的体验版工具，
              <strong>非 DeepSeek 官方发布，亦与 DeepSeek 官方无任何关联</strong>；「DeepSeek」相关名称与标识均归其权利所有者所有，
              本项目仅为非商业的封装与分发，不构成任何官方授权或认可。
            </p>
            <p>
              软件按 MIT 许可证「按现状（AS IS）」提供，不附带任何明示或默示的担保；使用本软件所产生的一切后果由使用者自行承担。
              下载前请核验来源与校验值（SHA-512），并自行评估安全风险。
            </p>
          </div>
        </div>

        <div className="ds-footer-grid">
          <div className="ds-footer-left">
            <div className="ds-qr-trigger">
              <span className="ds-qr-label">
                <span className="ds-qr-icon">◎</span>
                <span className="ds-text-caption">微信公众号</span>
              </span>
              <div className="ds-qr-menu">
                <div className="ds-qr-panel ds-glass">
                  <QrCode size={148} />
                  <span className="ds-text-xs">扫码关注 · 获取更新动态</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ds-footer-copy">
            <p className="ds-text-caption">
              开源 · {APP.license} · {APP.copyright}
            </p>
            <p className="ds-text-xs ds-footer-trademark">{APP.trademark}</p>
          </div>

          <nav className="ds-footer-nav">
            <a className="ds-text-caption" href="#download">
              下载
            </a>
            <span className="ds-text-caption ds-footer-sep">·</span>
            <a className="ds-text-caption" href={LINKS.repo} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span className="ds-text-caption ds-footer-sep">·</span>
            <a className="ds-text-caption" href={LINKS.dshDocs} target="_blank" rel="noreferrer">
              安全使用政策
            </a>
            <span className="ds-text-caption ds-footer-sep">·</span>
            <a className="ds-text-caption" href={LINKS.dshDocs} target="_blank" rel="noreferrer">
              数据处理说明
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
