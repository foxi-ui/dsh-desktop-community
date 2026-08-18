import React, { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Downloads from './components/Downloads'
import Features from './components/Features'
import Architecture from './components/Architecture'
import GettingStarted from './components/GettingStarted'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'
import './styles/base.css'

/* 滚动进入视口时显现 .ds-reveal 元素 */
function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll('.ds-reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  useRevealOnScroll()
  return (
    <div className="relative w-full">
      <Header />
      <main className="relative flex flex-col w-full">
        <Hero />
        <Downloads />
        <Features />
        <Architecture />
        <GettingStarted />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
