'use client'

import Image from 'next/image'

const PROMOS = [
  { src: '/images/promo-roster.webp', alt: 'CourtOS — Create your roster in two minutes' },
  { src: '/images/promo-rally.webp', alt: 'CourtOS — Score, rotate, and track in one tap' },
  { src: '/images/promo-heatmap.webp', alt: 'CourtOS — See where you win with attack heat maps' },
  { src: '/images/promo-stats.webp', alt: 'CourtOS — Live player performance stats' },
  { src: '/images/promo-lineup.webp', alt: 'CourtOS — Build your 5-1, 6-2, or 4-2 lineup' },
]

export default function FeatureGallery() {
  return (
    <section id="features-gallery" style={{ background: '#080808', padding: '100px 0', borderTop: '1px solid #1a1a1a' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', textAlign: 'center', marginBottom: 48 }}>
        <p style={{ color: '#3DBE6B', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
          Feature Tour
        </p>
        <h2 className="font-bebas" style={{ fontSize: 'clamp(44px, 6vw, 72px)', lineHeight: 1, color: '#F0F0F0', letterSpacing: '0.02em', marginBottom: 12 }}>
          FROM ROSTER TO FINAL WHISTLE.
        </h2>
        <p style={{ color: '#888', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
          Everything CourtOS does on the sideline — swipe through the five moments that matter.
        </p>
      </div>

      <div className="gallery-scroll" style={{ display: 'flex', gap: 20, overflowX: 'auto', scrollSnapType: 'x mandatory', padding: '8px 24px 24px', WebkitOverflowScrolling: 'touch' }}>
        {PROMOS.map((p) => (
          <div
            key={p.src}
            style={{
              flex: '0 0 auto', width: 300, maxWidth: '78vw',
              scrollSnapAlign: 'center', borderRadius: 20, overflow: 'hidden',
              border: '1px solid #242424', background: '#0C0C0C',
              boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
            }}
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={1080}
              height={1350}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        ))}
      </div>

      <style>{`
        .gallery-scroll::-webkit-scrollbar { height: 8px; }
        .gallery-scroll::-webkit-scrollbar-thumb { background: #222; border-radius: 8px; }
        .gallery-scroll::-webkit-scrollbar-track { background: transparent; }
        @media (min-width: 1140px) {
          .gallery-scroll { justify-content: center; }
        }
      `}</style>
    </section>
  )
}
