export default function Levels() {
  const levels = ['Club & travel', 'High school', 'Middle school', 'Rec & youth']
  return (
    <section style={{ background: '#060b14', padding: '52px 24px', borderBottom: '1px solid #11192b', textAlign: 'center' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
          Built for every level of the game.
        </h2>
        <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.6, margin: '12px auto 22px', maxWidth: 520 }}>
          Whether you run a 12U club team or a varsity program, CourtOS keeps the match organized so you can
          focus on the next point.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {levels.map((l) => (
            <span
              key={l}
              style={{ border: '1px solid #334155', color: '#cbd5e1', padding: '8px 18px', borderRadius: 100, fontSize: 14 }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
