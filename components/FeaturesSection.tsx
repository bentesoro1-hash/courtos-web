'use client'

const FEATURES = [
  { icon: '⚡', title: 'Auto-Rotation', desc: 'Point scored → rotation advances automatically. No manual tracking. No forgetting. Just volleyball.' },
  { icon: '🔀', title: 'Smart Substitutions', desc: 'Define your sub rules once. CourtOS alerts you at the right moment and tracks every swap for you.' },
  { icon: '📊', title: 'Live Player Stats', desc: 'Kills, Assists, Errors, Aces, Digs — tracked per player, per set, per match. In real time.' },
  { icon: '🏐', title: 'Libero Enforcement', desc: 'Back-row rules are applied automatically. Libero swaps are tracked without you thinking about it.' },
  { icon: '📋', title: 'Full Match History', desc: 'Every rotation, sub, and set score saved permanently. Review before your next matchup.' },
  { icon: '🔴', title: 'Live Broadcast', desc: 'Share a live view with parents via a 4-digit room code. No app download required on their end.' },
]

export default function FeaturesSection() {
  return (
    <section id="features" style={{ background: 'linear-gradient(180deg, #0C0C0C 0%, #0A0F0C 50%, #0C0C0C 100%)', padding: '110px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '30%', right: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(61,190,107,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <p style={{ color: '#3DBE6B', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Features</p>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(44px, 6vw, 72px)', lineHeight: 1, color: '#F0F0F0', letterSpacing: '0.02em', marginBottom: 4 }}>NO THINKING REQUIRED.</h2>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(44px, 6vw, 72px)', lineHeight: 1, color: '#3DBE6B', letterSpacing: '0.02em', marginBottom: 20, textShadow: '0 0 40px rgba(61,190,107,0.3)' }}>JUST COACH.</h2>
          <p style={{ color: '#B0B0B0', fontSize: 17, maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>Everything you need during a match. Nothing you don&apos;t.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {FEATURES.map((feat) => (
            <div key={feat.title} style={{ background: 'linear-gradient(135deg, #181818 0%, #141414 100%)', border: '1px solid #2A2A2A', borderRadius: 18, padding: '32px 26px', transition: 'all 0.25s ease', cursor: 'default' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-6px)'; el.style.borderColor = '#3DBE6B'; el.style.boxShadow = '0 0 40px rgba(61,190,107,0.15), 0 20px 40px rgba(0,0,0,0.4)'; el.style.background = 'linear-gradient(135deg, #1E2A1E 0%, #181818 100%)' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.borderColor = '#2A2A2A'; el.style.boxShadow = 'none'; el.style.background = 'linear-gradient(135deg, #181818 0%, #141414 100%)' }}
            >
              <div style={{ fontSize: 32, marginBottom: 18 }}>{feat.icon}</div>
              <h3 style={{ color: '#F0F0F0', fontSize: 19, fontWeight: 700, marginBottom: 12 }}>{feat.title}</h3>
              <p style={{ color: '#A0A0A0', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
