'use client'

const QUOTES = [
  {
    quote: "I lost track of rotations in the third set and didn't notice until the ref called it. Cost us the match.",
    role: 'JV Head Coach',
    initial: 'M',
  },
  {
    quote: "I'm coaching, scoring, managing the lineup, and keeping stats all at the same time. Something always falls apart.",
    role: 'Club Coach, 14U',
    initial: 'T',
  },
  {
    quote: "Our stats are whatever I remember after the match. That's not stats — that's a guess.",
    role: 'Varsity Assistant Coach',
    initial: 'R',
  },
  {
    quote: "I forgot to sub the libero back in. The ref called it. Parents were furious. It was the third time that season.",
    role: 'Rec League Head Coach',
    initial: 'K',
  },
]

export default function Agitation() {
  return (
    <section style={{ background: '#090909', padding: '100px 24px', borderTop: '1px solid #181818', borderBottom: '1px solid #181818' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2
            className="font-bebas"
            style={{
              fontSize: 'clamp(44px, 6vw, 72px)',
              lineHeight: 1,
              color: '#F0F0F0',
              letterSpacing: '0.02em',
              marginBottom: 12,
            }}
          >
            COACHING ALONE IS HARD.
          </h2>
          <h2
            className="font-bebas"
            style={{
              fontSize: 'clamp(44px, 6vw, 72px)',
              lineHeight: 1,
              color: '#888',
              letterSpacing: '0.02em',
              marginBottom: 24,
            }}
          >
            WE KNOW.
          </h2>
          <p style={{ color: '#555', fontSize: 16, maxWidth: 440, margin: '0 auto' }}>
            These are real coaches. Real moments. Real mistakes that didn't have to happen.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
        }}>
          {QUOTES.map((item) => (
            <div
              key={item.initial}
              style={{
                background: '#141414',
                border: '1px solid #242424',
                borderRadius: 16,
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.transform = 'translateY(-4px)'
                el.style.borderColor = '#3DBE6B'
                el.style.boxShadow = '0 0 24px rgba(61,190,107,0.12)'
                el.style.background = '#1A1A1A'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.transform = 'translateY(0)'
                el.style.borderColor = '#242424'
                el.style.boxShadow = 'none'
                el.style.background = '#141414'
              }}
            >
              <div style={{ color: '#3DBE6B', fontSize: 36, lineHeight: 1, fontWeight: 900, opacity: 0.4 }}>&ldquo;</div>
              <p style={{ color: '#aaa', fontSize: 15, lineHeight: 1.65, margin: 0, flex: 1 }}>
                {item.quote}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: '#1e1e1e', border: '1px solid #2a2a2a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#555', fontSize: 13, fontWeight: 700,
                }}>
                  {item.initial}
                </div>
                <span style={{ color: '#555', fontSize: 12, fontWeight: 500 }}>{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
