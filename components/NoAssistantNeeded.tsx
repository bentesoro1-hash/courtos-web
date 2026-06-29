'use client'

const CARDS = [
  { icon: '📋', role: 'Scorekeeper', desc: 'Every point logged the instant it happens. Set scores and match history auto-saved. No pen, no clipboard, no lag.' },
  { icon: '🔄', role: 'Rotation Tracker', desc: 'Rotation advances automatically on every sideout. Court positions update in real time. You never lose your spot again.' },
  { icon: '🔀', role: 'Sub Coordinator', desc: "Set your substitution rules once. CourtOS alerts you when it's time. One tap to confirm. Libero tracking built in." },
  { icon: '📊', role: 'Stats Person', desc: 'K, A, E, ACE, DIG tracked live per player. No stat crew needed. Export a clean summary after the final whistle.' },
]

export default function NoAssistantNeeded() {
  return (
    <section style={{ background: 'linear-gradient(180deg, #0C0C0C 0%, #0F1A12 50%, #0C0C0C 100%)', padding: '110px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(61,190,107,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <p style={{ color: '#3DBE6B', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>No Assistant Needed</p>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(44px, 6vw, 72px)', lineHeight: 1, color: '#F0F0F0', letterSpacing: '0.02em', marginBottom: 16 }}>
            IT REPLACES YOUR<br /><span style={{ color: '#3DBE6B', textShadow: '0 0 40px rgba(61,190,107,0.3)' }}>ENTIRE BENCH STAFF.</span>
          </h2>
          <p style={{ color: '#B0B0B0', fontSize: 17, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>Solo coaches wear every hat on game day. CourtOS wears them for you — so you can focus on actually coaching.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {CARDS.map((card) => (
            <div key={card.role} style={{ background: 'linear-gradient(135deg, #181818 0%, #141414 100%)', border: '1px solid #2A2A2A', borderRadius: 18, padding: '32px 26px', transition: 'all 0.25s ease', cursor: 'default' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-6px)'; el.style.borderColor = '#3DBE6B'; el.style.boxShadow = '0 0 40px rgba(61,190,107,0.15), 0 20px 40px rgba(0,0,0,0.4)'; el.style.background = 'linear-gradient(135deg, #1E2A1E 0%, #181818 100%)' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.borderColor = '#2A2A2A'; el.style.boxShadow = 'none'; el.style.background = 'linear-gradient(135deg, #181818 0%, #141414 100%)' }}
            >
              <div style={{ fontSize: 32, marginBottom: 18 }}>{card.icon}</div>
              <div style={{ color: '#3DBE6B', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>REPLACES YOUR</div>
              <h3 style={{ color: '#F0F0F0', fontSize: 21, fontWeight: 700, marginBottom: 14 }}>{card.role}</h3>
              <p style={{ color: '#A0A0A0', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
