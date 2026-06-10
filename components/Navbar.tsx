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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-court-bg/95 backdrop-blur-md border-b border-court-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <Image
              src="/images/logo-horizontal-white.svg"
              alt="CourtOS"
              width={140}
              height={73}
              priority
              className="h-9 w-auto"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
            >
              Features
            </a>
            <a
              href="#beta"
              className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
            >
              Beta
            </a>
            <a
              href="#beta"
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Join Beta
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-current rounded transition-transform duration-200 ${
                  menuOpen ? 'rotate-45 translate-y-[7px]' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-current rounded transition-opacity duration-200 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-current rounded transition-transform duration-200 ${
                  menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-court-border pt-4 pb-4 flex flex-col gap-3">
            <a
              href="#features"
              className="text-slate-400 hover:text-white transition-colors text-sm font-medium px-1 py-1"
              onClick={closeMenu}
            >
              Features
            </a>
            <a
              href="#beta"
              className="text-slate-400 hover:text-white transition-colors text-sm font-medium px-1 py-1"
              onClick={closeMenu}
            >
              Beta
            </a>
            <a
              href="#beta"
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors text-center"
              onClick={closeMenu}
            >
              Join Beta
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
