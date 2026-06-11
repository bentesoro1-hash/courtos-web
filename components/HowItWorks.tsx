'use client'

const STEPS = [
  {
    step: 1,
    badge: '2 MIN',
    title: 'Create Your Roster',
    desc: 'Add your players, assign positions, and set your substitution rules. Takes two minutes. Never do it again.',
  },
  {
    step: 2,
    badge: '30 SEC',
    title: 'Build Your Lineup',
    desc: 'Drag players into your starting 6 or pick a template. CourtOS validates every position before the first serve.',
  },
  {
    step: 3,
    badge: 'MATCH DAY',
    title: 'Just Coach',
    desc: 'Tap POINT WON or POINT LOST. CourtOS handles every rotation, every sub alert, and every stat — automatically.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: '#090909', padding: '100px 24px', borderTop: '1px solid #181818' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ color: '#3DBE6B', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
            How It Works
          </p>
          <h2
            className="font-bebas"
            style={{
              fontSize: 'clamp(44px, 6vw, 72px)',
              lineHeight: 1,
              color: '#F0F0F0',
              letterSpacing: '0.02em',
            }}
          >
            FROM ZERO TO GAME READY<br />
            <span style={{ color: '#3DBE6B' }}>IN 3 STEPS.</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {STEPS.map((step, i) => (
            <div key={step.step} style={{ display: 'flex', gap: 0, position: 'relative' }}>
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div style={{
                  position: 'absolute',
                  left: 24,
                  top: 56,
                  bottom: 0,
                  width: 1,
                  background: 'linear-gradient(to bottom, #3DBE6B40, transparent)',
                }} />
              )}

              <div style={{ display: 'flex', gap: 24, padding: '0 0 40px', width: '100%' }}>
                {/* Step number */}
                <div style={{
                  width: 48, height: 48,
                  borderRadius: '50%',
                  background: '#141414',
                  border: '2px solid #3DBE6B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 0 16px rgba(61,190,107,0.2)',
                }}>
                  <span className="font-bebas" style={{ color: '#3DBE6B', fontSize: 20 }}>{step.step}</span>
                </div>

                {/* Content */}
                <div style={{
                  flex: 1,
                  background: '#141414',
                  border: '1px solid #242424',
                  borderRadius: 16,
                  padding: '20px 24px',
                  transition: 'all 0.25s',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.borderColor = '#3DBE6B'
                    el.style.boxShadow = '0 0 20px rgba(61,190,107,0.1)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.borderColor = '#242424'
                    el.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <h3 style={{ color: '#F0F0F0', fontSize: 18, fontWeight: 700, margin: 0 }}>
                      {step.title}
                    </h3>
                    <span style={{
                      background: 'rgba(61,190,107,0.1)',
                      border: '1px solid rgba(61,190,107,0.3)',
                      color: '#3DBE6B',
                      fontSize: 9, fontWeight: 800,
                      letterSpacing: '0.08em',
                      padding: '3px 10px', borderRadius: 20,
                    }}>
                      {step.badge}
                    </span>
                  </div>
                  <p style={{ color: '#666', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
