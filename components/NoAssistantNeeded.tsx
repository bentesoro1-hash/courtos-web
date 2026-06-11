'use client'

const CARDS = [
  {
    icon: '📋',
    role: 'Scorekeeper',
    desc: 'Every point logged the instant it happens. Set scores and match history auto-saved. No pen, no clipboard, no lag.',
  },
  {
    icon: '🔄',
    role: 'Rotation Tracker',
    desc: 'Rotation advances automatically on every sideout. Court positions update in real time. You never lose your spot again.',
  },
  {
    icon: '🔀',
    role: 'Sub Coordinator',
    desc: 'Set your substitution rules once. CourtOS alerts you when it\'s time. One tap to confirm. Libero tracking built in.',
  },
  {
    icon: '📊',
    role: 'Stats Person',
    desc: 'K, A, E, ACE, DIG tracked live per player. No stat crew needed. Export a clean summary after the final whistle.',
  },
]

export default function NoAssistantNeeded() {
  return (
    <section style={{ background: '#0C0C0C', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ color: '#3DBE6B', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
            What CourtOS Replaces
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
            IT REPLACES YOUR<br />
            <span style={{ color: '#3DBE6B' }}>ENTIRE BENCH STAFF.</span>
          </h2>
          <p style={{ color: '#888', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            Solo coaches wear every hat on game day. CourtOS wears them for you.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
        }}>
          {CARDS.map((card) => (
            <div
              key={card.role}
              style={{
                background: '#141414',
                border: '1px solid #242424',
                borderRadius: 16,
                padding: '28px 24px',
                transition: 'all 0.25s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.transform = 'translateY(-4px)'
                el.style.borderColor = '#3DBE6B'
                el.style.boxShadow = '0 0 24px rgba(61,190,107,0.15)'
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
              <div style={{ fontSize: 28, marginBottom: 16 }}>{card.icon}</div>
              <div style={{ color: '#3DBE6B', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                REPLACES YOUR
              </div>
              <h3 style={{ color: '#F0F0F0', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                {card.role}
              </h3>
              <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6 }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
