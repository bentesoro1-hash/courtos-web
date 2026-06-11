'use client'

const PREVIEWS = [
  {
    title: 'Live Rotation Tracker',
    desc: 'Full 5-1 court view with real-time player positions',
    accent: '#3DBE6B',
    grid: [
      ['MB', 'OH', 'OPP'],
      ['L', 'S', 'OH'],
    ],
  },
  {
    title: 'Smart Substitutions',
    desc: 'Rules-based alerts with one-tap confirmation',
    accent: '#3DBE6B',
    grid: [
      ['SUB ALERT', '—'],
      ['Confirm', 'Skip'],
    ],
  },
  {
    title: 'Player Stats Dashboard',
    desc: 'K / A / E / ACE / DIG tracked live per player',
    accent: '#3DBE6B',
    grid: [
      ['Johnson', '4K', '1A'],
      ['Williams', '2K', '8A'],
    ],
  },
]

export default function AppTease() {
  return (
    <section style={{ background: '#0C0C0C', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ color: '#3DBE6B', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
            Inside The App
          </p>
          <h2
            className="font-bebas"
            style={{
              fontSize: 'clamp(44px, 6vw, 72px)',
              lineHeight: 1,
              color: '#F0F0F0',
              letterSpacing: '0.02em',
              marginBottom: 16,
            }}
          >
            YOUR SIDELINE.<br />
            <span style={{ color: '#3DBE6B' }}>UPGRADED.</span>
          </h2>
          <p style={{ color: '#888', fontSize: 17, maxWidth: 460, margin: '0 auto' }}>
            Beta members get full access. Everyone else gets the waitlist.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {PREVIEWS.map((preview) => (
            <div
              key={preview.title}
              style={{
                background: '#141414',
                border: '1px solid #242424',
                borderRadius: 16,
                overflow: 'hidden',
                position: 'relative',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.transform = 'translateY(-4px)'
                el.style.borderColor = '#3DBE6B'
                el.style.boxShadow = '0 0 24px rgba(61,190,107,0.15)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.transform = 'translateY(0)'
                el.style.borderColor = '#242424'
                el.style.boxShadow = 'none'
              }}
            >
              {/* Blurred preview content */}
              <div style={{ padding: 24, filter: 'blur(6px)', userSelect: 'none', pointerEvents: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ width: 80, height: 10, background: '#2a2a2a', borderRadius: 4 }} />
                  <div style={{ width: 40, height: 10, background: '#1e3828', borderRadius: 4 }} />
                </div>
                <div style={{
                  background: '#0d0d0d', borderRadius: 10, overflow: 'hidden',
                  border: '1px solid #1e1e1e', marginBottom: 12,
                }}>
                  {preview.grid.map((row, ri) => (
                    <div key={ri} style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${row.length}, 1fr)`,
                      borderBottom: ri < preview.grid.length - 1 ? '1px solid #1a1a1a' : 'none',
                    }}>
                      {row.map((cell, ci) => (
                        <div key={ci} style={{
                          padding: '12px 10px',
                          borderRight: ci < row.length - 1 ? '1px solid #1a1a1a' : 'none',
                          fontSize: 11, color: '#666', fontWeight: 700,
                          textAlign: 'center',
                        }}>
                          {cell}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[60, 45, 75].map((w, i) => (
                    <div key={i} style={{ width: w, height: 8, background: '#1e1e1e', borderRadius: 3 }} />
                  ))}
                </div>
              </div>

              {/* Frosted overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                background: 'rgba(12,12,12,0.6)',
                backdropFilter: 'blur(2px)',
                padding: 24,
              }}>
                <div style={{
                  background: 'rgba(61,190,107,0.1)',
                  border: '1px solid rgba(61,190,107,0.3)',
                  borderRadius: 8, padding: '6px 14px', marginBottom: 16,
                }}>
                  <span style={{ color: '#3DBE6B', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}>
                    BETA ACCESS ONLY
                  </span>
                </div>
                <h3 style={{ color: '#F0F0F0', fontSize: 18, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>
                  {preview.title}
                </h3>
                <p style={{ color: '#666', fontSize: 13, textAlign: 'center', marginBottom: 20 }}>
                  {preview.desc}
                </p>
                <a
                  href="#beta"
                  style={{
                    background: '#3DBE6B', color: '#000',
                    padding: '8px 20px', borderRadius: 8,
                    fontSize: 12, fontWeight: 700,
                    textTransform: 'uppercase', textDecoration: 'none',
                    letterSpacing: '0.05em',
                  }}
                >
                  Unlock Access
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
