'use client'
import Image from 'next/image'

export default function FinalCTA() {
  return (
    <section style={{ background: '#0C0C0C', padding: '120px 24px', textAlign: 'center', borderTop: '1px solid #1a1a1a', position: 'relative', overflow: 'hidden' }}>
      {/* Green glow */}
      <div style={{
        position: 'absolute', bottom: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 300,
        background: 'radial-gradient(ellipse, rgba(61,190,107,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
        <Image
          src="/logo.png"
          alt="CourtOS"
          width={226}
          height={40}
          style={{ height: 40, width: 'auto', margin: '0 auto 48px', display: 'block' }}
        />

        <h2
          className="font-bebas"
          style={{
            fontSize: 'clamp(52px, 8vw, 96px)',
            lineHeight: 1,
            color: '#F0F0F0',
            letterSpacing: '0.02em',
            marginBottom: 10,
          }}
        >
          YOUR ENTIRE
        </h2>
        <h2
          className="font-bebas"
          style={{
            fontSize: 'clamp(52px, 8vw, 96px)',
            lineHeight: 1,
            color: '#3DBE6B',
            letterSpacing: '0.02em',
            marginBottom: 10,
          }}
        >
          COACHING STAFF.
        </h2>
        <h2
          className="font-bebas"
          style={{
            fontSize: 'clamp(52px, 8vw, 96px)',
            lineHeight: 1,
            color: '#F0F0F0',
            letterSpacing: '0.02em',
            marginBottom: 52,
          }}
        >
          ONE TAP.
        </h2>

        <a
          href="#beta"
          style={{
            display: 'inline-block',
            background: '#3DBE6B',
            color: '#000',
            padding: '18px 52px',
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 800,
            textTransform: 'uppercase',
            textDecoration: 'none',
            letterSpacing: '0.06em',
            transition: 'background 0.2s, transform 0.15s',
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

        <p style={{ color: '#444', fontSize: 13, marginTop: 20 }}>
          Free during beta · No credit card required
        </p>
      </div>
    </section>
  )
}
