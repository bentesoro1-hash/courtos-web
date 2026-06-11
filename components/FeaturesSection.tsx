'use client'

const FEATURES = [
  {
    icon: '⚡',
    title: 'Auto-Rotation',
    desc: 'Point scored → rotation advances automatically. No manual tracking. No forgetting. Just volleyball.',
  },
  {
    icon: '🔀',
    title: 'Smart Substitutions',
    desc: 'Define your sub rules once. CourtOS alerts you at the right moment and tracks every swap for you.',
  },
  {
    icon: '📊',
    title: 'Live Player Stats',
    desc: 'Kills, Assists, Errors, Aces, Digs — tracked per player, per set, per match. In real time.',
  },
  {
    icon: '🏐',
    title: 'Libero Enforcement',
    desc: 'Back-row rules are applied automatically. Libero swaps are tracked without you thinking about it.',
  },
  {
    icon: '📋',
    title: 'Full Match History',
    desc: 'Every rotation, sub, and set score saved permanently. Review before your next matchup.',
  },
  {
    icon: '🔴',
    title: 'Live Broadcast',
    desc: 'Share a live view with parents via a 4-digit room code. No app download required on their end.',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" style={{ background: '#0C0C0C', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ color: '#3DBE6B', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
            Features
          </p>
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
            NO THINKING REQUIRED.
          </h2>
          <h2
            className="font-bebas"
            style={{
              fontSize: 'clamp(44px, 6vw, 72px)',
              lineHeight: 1,
              color: '#3DBE6B',
              letterSpacing: '0.02em',
              marginBottom: 20,
            }}
          >
            JUST COACH.
          </h2>
          <p style={{ color: '#888', fontSize: 17, maxWidth: 460, margin: '0 auto' }}>
            Everything you need during a match. Nothing you don&apos;t.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 16,
        }}>
          {FEATURES.map((feat) => (
            <div
              key={feat.title}
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
              <div style={{ fontSize: 28, marginBottom: 16 }}>{feat.icon}</div>
              <h3 style={{ color: '#F0F0F0', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
                {feat.title}
              </h3>
              <p style={{ color: '#666', fontSize: 14, lineHeight: 1.65, margin: 0 }}>
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
