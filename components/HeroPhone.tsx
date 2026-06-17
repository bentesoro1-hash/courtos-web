'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

// Real app screens, cycled in the hero
const SCREENS = [
  '/images/app-rally.webp',
  '/images/app-heatmap.webp',
  '/images/app-stats.webp',
]

const FRAME_W = 280
const FRAME_H = Math.round((FRAME_W * 2556) / 1179)
const INTERVAL = 3200

export default function HeroPhone() {
  const [active, setActive] = useState(0)
  const reduced = useRef(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    if (reduced.current) return
    const t = setInterval(() => setActive((a) => (a + 1) % SCREENS.length), INTERVAL)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className="animate-float animate-pulse-glow"
      style={{
        position: 'relative',
        width: FRAME_W,
        height: FRAME_H,
        background: '#05080e',
        borderRadius: 44,
        border: '2px solid #252525',
        boxShadow: '0 0 40px rgba(61,190,107,0.12), 0 32px 80px rgba(0,0,0,0.8)',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {SCREENS.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="CourtOS app — live match, heat map and player stats"
          width={FRAME_W}
          height={FRAME_H}
          priority={i === 0}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === active ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />
      ))}
    </div>
  )
}
