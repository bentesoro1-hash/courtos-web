'use client'

const PREVIEWS = [
  {
    title: 'Live Match Tracking',
    desc: 'Real-time score, rotation view, and one-tap point tracking',
    img: '/images/screen-match.png',
  },
  {
    title: 'Player Stats Dashboard',
    desc: 'Kills, aces, errors, and form score tracked live per player',
    img: '/images/screen-stats.png',
  },
  {
    title: 'Attack Heat Map',
    desc: 'See exactly where your team wins points — by zone and rotation',
    img: '/images/screen-heatmap.png',
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
                minHeight: 360,
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
              {/* Real screenshot — blurred */}
              <div style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                inset: 0,
                filter: 'blur(3px)',
                transform: 'scale(1.04)',
                overflow: 'hidden',
              }}>
                <img
                  src={preview.img}
                  alt={preview.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                  }}
                />
              </div>

              {/* Frosted overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'flex-end',
                background: 'linear-gradient(to bottom, rgba(12,12,12,0.1) 0%, rgba(12,12,12,0.5) 40%, rgba(12,12,12,0.95) 100%)',
                padding: 28,
              }}>
                <div style={{
                  background: 'rgba(61,190,107,0.1)',
                  border: '1px solid rgba(61,190,107,0.3)',
                  borderRadius: 8, padding: '5px 12px', marginBottom: 12,
                }}>
                  <span style={{ color: '#3DBE6B', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}>
                    BETA ACCESS ONLY
                  </span>
                </div>
                <h3 style={{ color: '#F0F0F0', fontSize: 18, fontWeight: 700, textAlign: 'center', marginBottom: 6 }}>
                  {preview.title}
                </h3>
                <p style={{ color: '#888', fontSize: 13, textAlign: 'center', marginBottom: 20, lineHeight: 1.5 }}>
                  {preview.desc}
                </p>
                
                  href="#beta"
                  style={{
                    background: '#3DBE6B', color: '#000',
                    padding: '8px 20px', borderRadius: 8,
                    fontSize: 12, fontWeight: 700,
                    textTransform: 'uppercase', textDecoration: 'none',
                    letterSpacing: '0.05em',
                  }}
                >Unlock Access
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
