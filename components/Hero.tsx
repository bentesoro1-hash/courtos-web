'use client'
import HeroPhone from './HeroPhone'
import { HAS_INSTALL, INSTALL_URL } from '@/lib/links'

export default function Hero() {
  const primaryHref = HAS_INSTALL ? INSTALL_URL : '#beta'
  const primaryLabel = HAS_INSTALL ? '📲 Install on iPhone' : 'Get Early Access →'
  const primaryProps = HAS_INSTALL ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <section style={{ background: '#0C0C0C', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 64, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(61,190,107,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(61,190,107,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 900, height: 600, background: 'radial-gradient(ellipse, rgba(61,190,107,0.13) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20%', right: '-5%', width: 500, height: 500, background: 'radial-gradient(ellipse, rgba(61,190,107,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(61,190,107,0.1)', border: '1px solid rgba(61,190,107,0.3)', borderRadius: 100, padding: '7px 16px', marginBottom: 32, boxShadow: '0 0 20px rgba(61,190,107,0.08)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#3DBE6B', display: 'inline-block', boxShadow: '0 0 6px #3DBE6B' }} />
              <span style={{ color: '#3DBE6B', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Now Accepting Beta Coaches</span>
            </div>
            <h1 className="font-bebas" style={{ fontSize: 'clamp(56px, 7vw, 92px)', lineHeight: 0.93, letterSpacing: '0.02em', marginBottom: 28 }}>
              <span style={{ color: '#F0F0F0', display: 'block' }}>YOUR ENTIRE</span>
              <span style={{ color: '#3DBE6B', display: 'block', textShadow: '0 0 40px rgba(61,190,107,0.4)' }}>COACHING STAFF.</span>
              <span style={{ color: '#F0F0F0', display: 'block' }}>IN ONE TAP.</span>
            </h1>
            <p style={{ color: '#C0C0C0', fontSize: 18, lineHeight: 1.7, marginBottom: 12, maxWidth: 480 }}>CourtOS replaces your scorekeeper, rotation tracker, sub coordinator, and stats person — all from your phone on the sideline.</p>
            <p style={{ color: '#888', fontSize: 15, lineHeight: 1.6, marginBottom: 36, maxWidth: 460 }}>No volleyball background required. Open the app and coach.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={primaryHref} {...primaryProps} style={{ background: '#3DBE6B', color: '#000', padding: '16px 36px', borderRadius: 8, fontSize: 14, fontWeight: 800, textTransform: 'uppercase', textDecoration: 'none', letterSpacing: '0.06em', transition: 'all 0.2s', display: 'inline-block', boxShadow: '0 0 30px rgba(61,190,107,0.35)' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#4FD080'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(61,190,107,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#3DBE6B'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(61,190,107,0.35)' }}
              >{primaryLabel}</a>
              <a href={HAS_INSTALL ? '#beta' : '#in-action'} style={{ background: 'rgba(255,255,255,0.04)', color: '#C0C0C0', padding: '16px 32px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s', display: 'inline-block' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F0F0F0'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#C0C0C0'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
              >{HAS_INSTALL ? 'Get updates by email' : 'See It In Action'}</a>
            </div>
            <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ display: 'flex' }}>
                {['C', 'K', 'M', 'J', 'R'].map((initial, i) => (
                  <div key={i} style={{ width: 34, height: 34, borderRadius: '50%', background: `hsl(${140 + i * 15}, 50%, 18%)`, border: '2px solid #0C0C0C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: i > 0 ? -10 : 0, fontSize: 12, fontWeight: 700, color: '#3DBE6B', boxShadow: '0 0 8px rgba(61,190,107,0.2)' }}>{initial}</div>
                ))}
              </div>
              <p style={{ color: '#888', fontSize: 13, margin: 0 }}><span style={{ color: '#C0C0C0', fontWeight: 700 }}>Real coaches</span> already testing CourtOS</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><HeroPhone /></div>
        </div>
      </div>
    </section>
  )
}
