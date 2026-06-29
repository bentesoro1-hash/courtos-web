'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const SCREENS = [
  {
    src: '/images/app-rally.webp',
    title: 'Live Rotation View',
    desc: 'See every player on the court in real time. Tap RALLY to score — rotation advances automatically.',
  },
  {
    src: '/images/app-rotations.webp',
    title: 'Lineup Creation',
    desc: 'Build your 5-1, 6-2, or 4-2 lineup visually. CourtOS validates it before the set starts.',
  },
  {
    src: '/images/app-logging.webp',
    title: 'Smart Auto-Subs',
    desc: 'CourtOS suggests the right sub at the right time. One tap to confirm — no counting rotations.',
  },
  {
    src: '/images/app-heatmap.webp',
    title: 'Team Stats Live',
    desc: 'Match stats, top performers, and player form scores updated after every single point.',
  },
  {
    src: '/images/app-stats.webp',
    title: 'Playing Time & Point Log',
    desc: 'Track rotations on court per player and see every point logged in order.',
  },
]

const IMG_W = 560
const IMG_H = Math.round((IMG_W * 2556) / 1179)
const INTERVAL = 4200

export default function FeatureShowcase() {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const reduced = useRef(false)

  // start autoplay once the section scrolls into view
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setInView(true) }),
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || reduced.current) return
    timerRef.current = setInterval(() => setActive((a) => (a + 1) % SCREENS.length), INTERVAL)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [inView])

  const select = (i: number) => {
    setActive(i)
    if (timerRef.current) clearInterval(timerRef.current)
    if (!reduced.current) {
      timerRef.current = setInterval(() => setActive((a) => (a + 1) % SCREENS.length), INTERVAL)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="in-action"
      style={{ background: '#0C0C0C', padding: '100px 24px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ color: '#3DBE6B', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
            See It In Action
          </p>
          <h2
            className="font-bebas"
            style={{ fontSize: 'clamp(44px, 6vw, 72px)', lineHeight: 1, color: '#F0F0F0', letterSpacing: '0.02em', marginBottom: 12 }}
          >
            YOUR ENTIRE COACHING STAFF.<br />
            <span style={{ color: '#3DBE6B' }}>ONE TAP.</span>
          </h2>
          <p style={{ color: '#888', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>
            Tap through what CourtOS does on the sideline — live, in real time.
          </p>
        </div>

        {/* Grid: feature list + phone */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 340px',
            gap: 48,
            alignItems: 'center',
          }}
          className="showcase-grid"
        >
          {/* Feature list */}
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {SCREENS.map((s, i) => {
              const on = i === active
              return (
                <li
                  key={s.title}
                  onClick={() => select(i)}
                  style={{
                    display: 'flex', gap: 14, alignItems: 'flex-start',
                    padding: '16px 18px', borderRadius: 14, cursor: 'pointer',
                    background: '#141414',
                    border: `1px solid ${on ? '#3DBE6B' : '#242424'}`,
                    boxShadow: on ? '0 0 26px rgba(61,190,107,0.16)' : 'none',
                    opacity: on ? 1 : 0.6,
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div style={{
                    flex: '0 0 auto', width: 30, height: 30, borderRadius: '50%',
                    border: `2px solid ${on ? '#3DBE6B' : '#555'}`,
                    background: on ? 'rgba(61,190,107,0.12)' : 'transparent',
                    color: on ? '#3DBE6B' : '#555',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 800,
                  }}>
                    {i + 1}
                  </div>
                  <div>
                    <div style={{ color: '#F0F0F0', fontWeight: 700, fontSize: 16 }}>{s.title}</div>
                    <div style={{
                      color: '#888', fontSize: 13.5, lineHeight: 1.45,
                      maxHeight: on ? 80 : 0, opacity: on ? 1 : 0, marginTop: on ? 6 : 0,
                      overflow: 'hidden', transition: 'all 0.3s ease',
                    }}>
                      {s.desc}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          {/* Phone */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              className="animate-pulse-glow"
              style={{
                position: 'relative', width: 300, maxWidth: '78vw',
                aspectRatio: '1179 / 2556', borderRadius: 44,
                background: '#05080e', border: '2px solid #252525',
                boxShadow: '0 32px 80px rgba(0,0,0,0.8)', overflow: 'hidden', flexShrink: 0,
              }}
            >
              {SCREENS.map((s, i) => (
                <Image
                  key={s.src}
                  src={s.src}
                  alt={`CourtOS — ${s.title}`}
                  width={IMG_W}
                  height={IMG_H}
                  priority={i === 0}
                  style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? 'scale(1)' : 'scale(1.04)',
                    transition: 'opacity 0.45s ease, transform 0.45s ease',
                  }}
                />
              ))}
            </div>

            {/* Progress bars */}
            <div style={{ display: 'flex', gap: 6, marginTop: 20 }}>
              {SCREENS.map((s, i) => (
                <div key={s.src} style={{ width: 28, height: 4, borderRadius: 3, background: '#22304a', overflow: 'hidden' }}>
                  <div
                    key={i === active ? `on-${active}` : 'off'}
                    style={{
                      height: '100%', background: '#3DBE6B',
                      width: i === active ? '100%' : 0,
                      transition: i === active && !reduced.current ? `width ${INTERVAL}ms linear` : 'none',
                    }}
                  />
                </div>
              ))}
            </div>

            <a
              href="#beta"
              style={{
                marginTop: 28, background: '#3DBE6B', color: '#000',
                padding: '14px 34px', borderRadius: 8, fontSize: 14, fontWeight: 700,
                textTransform: 'uppercase', textDecoration: 'none', letterSpacing: '0.06em',
                transition: 'background 0.2s, transform 0.15s', display: 'inline-block',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#4FD080'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#3DBE6B'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Get Early Access →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .showcase-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .showcase-grid > div:last-child { order: -1; }
        }
      `}</style>
    </section>
  )
}
