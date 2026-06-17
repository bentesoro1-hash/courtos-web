'use client'
import HeroPhone from './HeroPhone'

export default function Hero() {
  return (
    <section
      style={{
        background: '#0C0C0C',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 64,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute',
        top: '20%', left: '50%',
        transform: 'translateX(-50%)',
        width: 800, height: 500,
        background: 'radial-gradient(ellipse, rgba(61,190,107,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 60,
          alignItems: 'center',
        }}>
          {/* Left: copy */}
          <div>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(61,190,107,0.1)',
              border: '1px solid rgba(61,190,107,0.25)',
              borderRadius: 100, padding: '6px 14px', marginBottom: 28,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3DBE6B', display: 'inline-block' }} />
              <span style={{ color: '#3DBE6B', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Now Accepting Beta Testers
              </span>
            </div>

            <h1
              className="font-bebas"
              style={{
                fontSize: 'clamp(56px, 7vw, 88px)',
                lineHeight: 0.95,
                letterSpacing: '0.02em',
                marginBottom: 24,
              }}
            >
              <span style={{ color: '#F0F0F0', display: 'block' }}>YOUR ENTIRE</span>
              <span style={{ color: '#3DBE6B', display: 'block' }}>COACHING STAFF.</span>
              <span style={{ color: '#F0F0F0', display: 'block' }}>IN ONE TAP.</span>
            </h1>

            <p style={{ color: '#888', fontSize: 18, lineHeight: 1.65, marginBottom: 36, maxWidth: 480 }}>
              CourtOS replaces your scorekeeper, rotation tracker, sub coordinator,
              and stats person — all from your phone on the sideline.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="#beta"
                style={{
                  background: '#3DBE6B',
                  color: '#000',
                  padding: '16px 32px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  transition: 'background 0.2s, transform 0.15s',
                  display: 'inline-block',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#4FD080'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#3DBE6B'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Get Early Access →
              </a>
              <a
                href="#features"
                style={{
                  background: 'transparent',
                  color: '#888',
                  padding: '16px 32px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: '1px solid #242424',
                  transition: 'all 0.2s',
                  display: 'inline-block',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#F0F0F0'
                  e.currentTarget.style.borderColor = '#444'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#888'
                  e.currentTarget.style.borderColor = '#242424'
                }}
              >
                See Features
              </a>
            </div>

            {/* Trust strip */}
            <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', marginRight: -8 }}>
                {['C', 'K', 'M', 'J', 'R'].map((initial, i) => (
                  <div
                    key={i}
                    style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: `hsl(${140 + i * 12}, 40%, 20%)`,
                      border: '2px solid #0C0C0C',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginLeft: i > 0 ? -10 : 0,
                      fontSize: 11, fontWeight: 700, color: '#3DBE6B',
                    }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <p style={{ color: '#555', fontSize: 13 }}>
                <span style={{ color: '#888', fontWeight: 600 }}>Coaches</span> already testing CourtOS
              </p>
            </div>
          </div>

          {/* Right: real app screenshots */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <HeroPhone />
          </div>
        </div>
      </div>
    </section>
  )
}
