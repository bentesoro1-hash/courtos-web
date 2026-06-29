'use client'

const STEPS = [
  { step: 1, badge: '2 MIN', title: 'Create Your Roster', desc: 'Add your players, assign positions, and set your substitution rules. Takes two minutes. Never do it again.' },
  { step: 2, badge: '30 SEC', title: 'Build Your Lineup', desc: 'Drag players into your starting 6 or pick a template. CourtOS validates every position before the first serve.' },
  { step: 3, badge: 'MATCH DAY', title: 'Just Coach', desc: 'Tap POINT WON or POINT LOST. CourtOS handles every rotation, every sub alert, and every stat — automatically.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: '#080808', padding: '110px 24px', borderTop: '1px solid #1A1A1A', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(61,190,107,0.3), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(61,190,107,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <p style={{ color: '#3DBE6B', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>How It Works</p>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(44px, 6vw, 72px)', lineHeight: 1, color: '#F0F0F0', letterSpacing: '0.02em' }}>
            FROM ZERO TO GAME READY<br /><span style={{ color: '#3DBE6B', textShadow: '0 0 40px rgba(61,190,107,0.3)' }}>IN 3 STEPS.</span>
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {STEPS.map((step, i) => (
            <div key={step.step} style={{ display: 'flex', gap: 0, position: 'relative' }}>
              {i < STEPS.length - 1 && (
                <div style={{ position: 'absolute', left: 25, top: 56, bottom: 0, width: 2, background: 'linear-gradient(to bottom, rgba(61,190,107,0.5), transparent)' }} />
              )}
              <div style={{ display: 'flex', gap: 24, padding: '0 0 24px', width: '100%' }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', flexShrink: 0, background: 'rgba(61,190,107,0.08)', border: '2px solid #3DBE6B', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(61,190,107,0.25)' }}>
                  <span className="font-bebas" style={{ color: '#3DBE6B', fontSize: 22 }}>{step.step}</span>
                </div>
                <div style={{ flex: 1, background: 'linear-gradient(135deg, #181818 0%, #141414 100%)', border: '1px solid #2A2A2A', borderRadius: 16, padding: '22px 26px', transition: 'all 0.25s', marginBottom: 16 }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = '#3DBE6B'; el.style.boxShadow = '0 0 30px rgba(61,190,107,0.12)' }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#2A2A2A'; el.style.boxShadow = 'none' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <h3 style={{ color: '#F0F0F0', fontSize: 19, fontWeight: 700, margin: 0 }}>{step.title}</h3>
                    <span style={{ background: 'rgba(61,190,107,0.1)', border: '1px solid rgba(61,190,107,0.3)', color: '#3DBE6B', fontSize: 9, fontWeight: 800, letterSpacing: '0.08em', padding: '3px 10px', borderRadius: 20 }}>{step.badge}</span>
                  </div>
                  <p style={{ color: '#A0A0A0', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
