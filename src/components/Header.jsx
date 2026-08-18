import React, { useEffect, useState } from 'react'
import { GitHubIcon, MenuIcon, CloseIcon, ArrowUpRightIcon } from './Icons'
import { LINKS } from '../data'
import '../styles/header.css'

const NAV = [
  { href: '#download', label: '下载' },
  { href: '#features', label: '功能特性' },
  { href: '#architecture', label: '设计思路' },
  { href: '#getting-started', label: '开始使用' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [locale, setLocale] = useState('zh')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <div className={`ds-header-wrapper ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="ds-header-bar">
          <a className="ds-brand" href="#top" onClick={() => setMenuOpen(false)}>
            <span className="ds-brand-icon">
              <img src={`${import.meta.env.BASE_URL}icon.png`} alt="DeepSeek Harness Desktop" />
            </span>
            <span className="ds-brand-word">
              <span className="ds-brand-name">DeepSeek Harness Desktop</span>
              <span className="ds-brand-badge">
                <span className="ds-brand-badge-inner">桌面版 v0.1.0</span>
              </span>
            </span>
          </a>

          <nav className="ds-nav hidden-md">
            {NAV.map((n) => (
              <a key={n.href} className="ds-nav-link" href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="ds-header-right hidden-md">
            <a className="ds-btn ds-btn-ghost ds-btn-s" href={LINKS.repo} target="_blank" rel="noreferrer">
              <GitHubIcon /> GitHub
            </a>
            <div className="ds-locale-toggle">
              <button
                type="button"
                className={`ds-locale-toggle-item ${locale === 'zh' ? 'is-active' : ''}`}
                onClick={() => setLocale('zh')}
              >
                中文
              </button>
              <button
                type="button"
                className={`ds-locale-toggle-item ${locale === 'en' ? 'is-active' : ''}`}
                onClick={() => setLocale('en')}
              >
                EN
              </button>
            </div>
          </div>

          <button
            type="button"
            className="ds-menu-btn hidden-md-up"
            aria-label="打开菜单"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon width={22} height={22} />
          </button>
        </div>
      </div>

      <div className={`ds-mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        <div className="ds-mobile-menu-header">
          <a className="ds-brand" href="#top" onClick={() => setMenuOpen(false)}>
            <span className="ds-brand-icon">
              <img src={`${import.meta.env.BASE_URL}icon.png`} alt="DeepSeek Harness Desktop" />
            </span>
            <span className="ds-brand-word">
              <span className="ds-brand-name">DeepSeek Harness Desktop</span>
            </span>
          </a>
          <button type="button" className="ds-menu-close" aria-label="关闭菜单" onClick={() => setMenuOpen(false)}>
            <CloseIcon width={22} height={22} />
          </button>
        </div>
        <nav className="ds-mobile-menu-body">
          {NAV.map((n) => (
            <a key={n.href} className="ds-mobile-menu-item" href={n.href} onClick={() => setMenuOpen(false)}>
              {n.label}
            </a>
          ))}
          <a
            className="ds-mobile-menu-item"
            href={LINKS.repo}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            GitHub <ArrowUpRightIcon width={16} height={16} />
          </a>
        </nav>
        <div className="ds-mobile-menu-footer">
          <a
            className="ds-btn ds-btn-primary ds-btn-s"
            href={LINKS.releasesLatest}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            下载 DeepSeek Harness Desktop
          </a>
        </div>
      </div>
    </>
  )
}
