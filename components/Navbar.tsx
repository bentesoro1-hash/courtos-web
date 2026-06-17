'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const NAV_LINKS = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Beta', href: '#beta' },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(12,12,12,0.96)' : '#0C0C0C',
        borderBottom: `1px solid ${scrolled ? '#242424' : 'transparent'}`,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Image
              src="/logo.png"
              alt="CourtOS"
              width={158}
              height={28}
              priority
              style={{ height: 28, width: 'auto' }}
            />
          </a>

          {/* Desktop nav */}
          <div style={{ alignItems: 'center', gap: 32 }} className="hidden md:flex">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                style={{ color: '#888', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F0F0F0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#beta"
              style={{
                background: '#3DBE6B',
                color: '#000',
                padding: '10px 20px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'background 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#4FD080'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#3DBE6B'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Join Beta
            </a>
          </div>

          {/* Mobile right side */}
          <div className="flex md:hidden" style={{ alignItems: 'center', gap: 12 }}>
            <a
              href="#beta"
              style={{
                background: '#3DBE6B',
                color: '#000',
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                textDecoration: 'none',
              }}
            >
              Join Beta
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              aria-label="Toggle menu"
            >
              <div style={{ width: 20, height: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    display: 'block', height: 2, background: '#F0F0F0', borderRadius: 1,
                    transition: 'all 0.2s',
                    transform: menuOpen
                      ? i === 0 ? 'rotate(45deg) translateY(7px)'
                        : i === 2 ? 'rotate(-45deg) translateY(-7px)'
                        : 'none'
                      : 'none',
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }} />
                ))}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden"
          style={{
            overflow: 'hidden',
            maxHeight: menuOpen ? 220 : 0,
            opacity: menuOpen ? 1 : 0,
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ borderTop: '1px solid #242424', paddingTop: 16, paddingBottom: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                style={{ color: '#888', fontSize: 15, textDecoration: 'none', padding: '4px 0' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
