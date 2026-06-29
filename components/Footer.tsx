'use client'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid #1a1a1a', padding: '32px 24px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(61,190,107,0.2), transparent)' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <a href="#" style={{ textDecoration: 'none' }}>
          <Image src="/logo.png" alt="CourtOS" width={125} height={22} style={{ height: 22, width: 'auto' }} />
        </a>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
          {[['/#features', 'Features'], ['/#how-it-works', 'How It Works'], ['/#beta', 'Beta'], ['/privacy', 'Privacy'], ['/terms', 'Terms'], ['/subscription-terms', 'Subscription Terms']].map(([href, label]) => (
            <a key={href} href={href} style={{ color: '#666', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C0C0C0')}
              onMouseLeave={e => (e.currentTarget.style.color = '#666')}
            >{label}</a>
          ))}
        </div>
        <p style={{ color: '#444', fontSize: 12, margin: 0 }}>© {new Date().getFullYear()} CourtOS</p>
      </div>
    </footer>
  )
}
