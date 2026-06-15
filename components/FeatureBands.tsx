import type { ReactNode } from 'react'

function Band({
  eyebrow,
  eyebrowColor,
  title,
  body,
  link,
  visual,
  reverse = false,
  id,
}: {
  eyebrow: string
  eyebrowColor: string
  title: string
  body: string
  link: string
  visual: ReactNode
  reverse?: boolean
  id?: string
}) {
  return (
    <section
      id={id}
      style={{ background: '#060b14', padding: '56px 24px', borderBottom: '1px solid #11192b' }}
    >
      <div
        style={{
          maxWidth: 1040,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 40,
          alignItems: 'center',
        }}
      >
        <div style={{ order: reverse ? 2 : 1 }}>
          <div style={{ color: eyebrowColor, fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 10 }}>
            {eyebrow}
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 34px)', fontWeight: 700, color: '#f8fafc', lineHeight: 1.15, margin: 0 }}>
            {title}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.65, margin: '14px 0 16px', maxWidth: 440 }}>
            {body}
          </p>
          <a href="#how-it-works" style={{ color: '#22c55e', fontSize: 15, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {link} →
          </a>
        </div>
        <div style={{ order: reverse ? 1 : 2, display: 'flex', justifyContent: 'center' }}>{visual}</div>
      </div>
    </section>
  )
}

const cardStyle = { width: '100%', maxWidth: 360, background: '#0f172a', border: '1px solid #1e293b', borderRadius: 16, padding: 16 } as const

export default function FeatureBands() {
  return (
    <>
      <Band
        eyebrow="LIVE MATCH"
        eyebrowColor="#22c55e"
        title="Track every rotation automatically."
        body="Tap the point — CourtOS advances the rotation, fires your sub alerts, and keeps the libero legal. You never lose your place again."
        link="See how it works"
        visual={<RotationVisual />}
      />
      <Band
        reverse
        eyebrow="STATS & AI"
        eyebrowColor="#a855f7"
        title="See your team in real numbers."
        body="Kills, aces, passing and rotation analytics build themselves as you tap. After the match, AI tells you exactly what to fix next."
        link="Explore the stats"
        visual={<StatsVisual />}
      />
    </>
  )
}

function RotationVisual() {
  const row = [
    { n: 5, c: '#22c55e' }, { n: 2, c: '#3b82f6' }, { n: 1, c: '#22c55e' },
    { n: 5, c: '#22c55e' }, { n: 3, c: '#3b82f6' }, { n: 8, c: '#a855f7' },
  ]
  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ color: '#475569', fontSize: 10, letterSpacing: '0.1em' }}>SET 2 · R3</span>
        <span style={{ color: '#e24b4a', fontSize: 10, fontWeight: 700 }}>● LIVE</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
        {row.map((r, i) => (
          <div key={i} className="font-bebas" style={{ height: 44, borderRadius: '50%', border: `2px solid ${r.c}`, color: r.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
            {r.n}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, background: '#22c55e', color: '#04220f', textAlign: 'center', padding: 9, borderRadius: 9, fontSize: 13, fontWeight: 700 }}>
        RALLY WON
      </div>
    </div>
  )
}

function StatsVisual() {
  const bars = [70, 90, 45, 80, 55, 65]
  return (
    <div style={cardStyle}>
      <div style={{ color: '#475569', fontSize: 10, letterSpacing: '0.1em', marginBottom: 10 }}>TEAM · SEASON</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {[['62', 'KILLS', '#22c55e'], ['28', 'ACES', '#3b82f6'], ['2.4', 'PASS', '#a855f7']].map(([v, l, c], i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', background: '#0a0f1e', borderRadius: 10, padding: '10px 4px' }}>
            <div className="font-bebas" style={{ fontSize: 26, color: c as string }}>{v}</div>
            <div style={{ color: '#64748b', fontSize: 10 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end', height: 56 }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 3, background: h >= 60 ? '#22c55e' : '#334155' }} />
        ))}
      </div>
      <div style={{ marginTop: 12, background: '#0a0f1e', border: '1px solid #1e293b', borderRadius: 9, padding: '9px 11px', fontSize: 12, color: '#cbd5e1', lineHeight: 1.5 }}>
        <span style={{ color: '#a855f7', fontWeight: 700 }}>AI ·</span> Strong serving run in R2. Watch R3 serve-receive.
      </div>
    </div>
  )
}
