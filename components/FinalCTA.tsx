'use client'
import Image from 'next/image'
import { HAS_INSTALL, INSTALL_URL, HAS_ANDROID, ANDROID_URL } from '@/lib/links'

export default function FinalCTA() {
  const ctaHref = HAS_INSTALL ? INSTALL_URL : '#beta'
  const ctaLabel = HAS_INSTALL ? '📲 Install the Beta' : 'Get Early Access →'
  const ctaProps = HAS_INSTALL ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <section style={{ background: '#0C0C0C', padding: '140px 24px', textAlign: 'center', borderTop: '1px solid #1a1a1a', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(61,190,107,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(61,190,107,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 500, background: 'radial-gradient(ellipse, rgba(61,190,107,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Image src="/logo.png" alt="CourtOS" width={226} height={40} style={{ height: 40, width: 'auto', margin: '0 auto 52px', display: 'block' }} />
        <h2 className="font-bebas" style={{ fontSize: 'clamp(52px, 8vw, 100px)', lineHeight: 0.95, color: '#F0F0F0', letterSpacing: '0.02em', marginBottom: 8 }}>YOUR ENTIRE</h2>
        <h2 className="font-bebas" style={{ fontSize: 'clamp(52px, 8vw, 100px)', lineHeight: 0.95, color: '#3DBE6B', letterSpacing: '0.02em', marginBottom: 8, textShadow: '0 0 60px rgba(61,190,107,0.5)' }}>COACHING STAFF.</h2>
        <h2 className="font-bebas" style={{ fontSize: 'clamp(52px, 8vw, 100px)', lineHeight: 0.95, color: '#F0F0F0', letterSpacing: '0.02em', marginBottom: 56 }}>ONE TAP.</h2>
        <a href={ctaHref} {...ctaProps} style={{ display: 'inline-block', background: '#3DBE6B', color: '#000', padding: '20px 60px', borderRadius: 8, fontSize: 16, fontWeight: 800, textTransform: 'uppercase', textDecoration: 'none', letterSpacing: '0.06em', transition: 'all 0.2s', boxShadow: '0 0 40px rgba(61,190,107,0.4)' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#4FD080'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(61,190,107,0.6)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#3DBE6B'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(61,190,107,0.4)' }}
        >{ctaLabel}</a>
        {HAS_ANDROID && (
          <div style={{ marginTop: 18 }}>
            <a href={ANDROID_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#3DBE6B', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>🤖 Also on Android →</a>
          </div>
        )}
        <p style={{ color: '#666', fontSize: 13, marginTop: 20 }}>Free during beta · No credit card required</p>
      </div>
    </section>
  )
}
