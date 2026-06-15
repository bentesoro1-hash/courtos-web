const TIERS = [
  {
    name: 'Free',
    nameColor: '#94a3b8',
    price: '$0',
    sub: '',
    desc: 'Live match tracking plus a per-match stats taster. Charge nothing, prove it works.',
    features: ['Live scoring & rotations', 'Sub tracking', 'Per-match stat taster'],
    featured: false,
  },
  {
    name: 'Coach Premium',
    nameColor: '#22c55e',
    price: '$9.99',
    sub: '/mo',
    desc: 'The full coaching toolkit — everything you need to actually coach better.',
    features: [
      'Full visual stats & heat map',
      'Rotation analytics & auto-subs',
      'Unlimited matches, rosters & lineups',
      'AI match summary & practice plans',
      'Export data (CSV & PDF)',
    ],
    featured: true,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" style={{ background: '#060b14', padding: '64px 24px', borderBottom: '1px solid #11192b' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: '#f0f0f0', letterSpacing: '0.02em', margin: 0, lineHeight: 1 }}>
            START FREE. COACH BETTER.
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 15, marginTop: 12 }}>
            Start free forever. Upgrade only when you want the full picture.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, alignItems: 'start' }}>
          {TIERS.map((t) => (
            <div
              key={t.name}
              style={{
                background: '#0f172a',
                border: t.featured ? '2px solid #22c55e' : '1px solid #1e293b',
                borderRadius: 14,
                padding: '24px 20px',
                position: 'relative',
              }}
            >
              {t.featured && (
                <span
                  style={{
                    position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)',
                    background: '#22c55e', color: '#04220f', fontSize: 11, fontWeight: 700,
                    padding: '3px 12px', borderRadius: 100, letterSpacing: '0.06em',
                  }}
                >
                  MOST POPULAR
                </span>
              )}
              <div style={{ color: t.nameColor, fontSize: 14, fontWeight: 600 }}>{t.name}</div>
              <div style={{ margin: '6px 0 10px' }}>
                <span className="font-bebas" style={{ fontSize: 44, color: '#f8fafc', letterSpacing: '0.01em' }}>{t.price}</span>
                {t.sub && <span style={{ color: '#64748b', fontSize: 14 }}>{t.sub}</span>}
              </div>
              <p style={{ color: '#94a3b8', fontSize: 13.5, lineHeight: 1.55, margin: '0 0 16px' }}>{t.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {t.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 9, color: '#cbd5e1', fontSize: 13.5 }}>
                    <span style={{ color: '#22c55e', fontWeight: 700 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid rgba(168,85,247,0.35)', background: 'rgba(168,85,247,0.08)',
            color: '#c4b5fd', fontSize: 13, padding: '8px 16px', borderRadius: 100,
          }}>
            <span style={{ fontWeight: 700 }}>Coach Advanced</span> — opponent scouting, multi-format exports & AI everywhere · coming soon
          </span>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12.5, marginTop: 24 }}>
          Subscriptions auto-renew and can be canceled anytime in your App Store settings. See our{' '}
          <a href="/subscription-terms" style={{ color: '#64748b' }}>Subscription Terms</a>.
        </p>
      </div>
    </section>
  )
}
