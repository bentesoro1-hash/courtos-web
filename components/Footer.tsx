'use client'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{ background: '#0C0C0C', borderTop: '1px solid #1a1a1a', padding: '28px 24px' }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <a href="#" style={{ textDecoration: 'none' }}>
          <Image
            src="/logo.png"
            alt="CourtOS"
            width={88}
            height={22}
            style={{ height: 22, width: 'auto' }}
          />
        </a>

        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {[['#features', 'Features'], ['#how-it-works', 'How It Works'], ['#beta', 'Beta']].map(([href, label]) => (
            <a
              key={href}
              href={href}
              style={{ color: '#444', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#888')}
              onMouseLeave={e => (e.currentTarget.style.color = '#444')}
            >
              {label}
            </a>
          ))}
        </div>

        <p style={{ color: '#333', fontSize: 12, margin: 0 }}>
          © {new Date().getFullYear()} CourtOS
        </p>
      </div>
    </footer>
  )
}
