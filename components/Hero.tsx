import DownloadButton from './DownloadButton'

const ROW: { n: number; c: string }[] = [
  { n: 5, c: '#22c55e' }, { n: 2, c: '#3b82f6' }, { n: 1, c: '#22c55e' },
  { n: 5, c: '#22c55e' }, { n: 3, c: '#3b82f6' }, { n: 8, c: '#a855f7' },
]

export default function Hero() {
  return (
    <section
      style={{
        background: '#0a1120',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 64,
        borderBottom: '1px solid #11192b',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          backgroundImage: 'repeating-linear-gradient(115deg,#22c55e 0 2px,transparent 2px 28px)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '64px 24px 72px', position: 'relative' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 48,
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.28)',
                borderRadius: 100,
                padding: '6px 14px',
                marginBottom: 24,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ color: '#22c55e', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em' }}>
                BUILT BY A COACH
              </span>
            </div>

            <h1
              className="font-bebas"
              style={{ fontSize: 'clamp(52px, 7vw, 86px)', lineHeight: 0.95, letterSpacing: '0.02em', margin: 0 }}
            >
              <span style={{ color: '#f0f0f0', display: 'block' }}>YOUR ENTIRE</span>
              <span style={{ color: '#22c55e', display: 'block' }}>COACHING STAFF.</span>
              <span style={{ color: '#f0f0f0', display: 'block' }}>ONE TAP.</span>
            </h1>

            <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.6, maxWidth: 460, margin: '22px 0 28px' }}>
              CourtOS tracks rotations, subs and stats live on the sideline — so you can put the clipboard down
              and just coach.
            </p>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <DownloadButton variant="light" label="Download free" size="lg" />
              <a
                href="#how-it-works"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  color: '#e2e8f0',
                  padding: '14px 20px',
                  border: '1px solid #334155',
                  borderRadius: 10,
                  fontSize: 15,
                  textDecoration: 'none',
                }}
              >
                Watch how it works
              </a>
            </div>

            <p style={{ color: '#475569', fontSize: 13, marginTop: 18, letterSpacing: '0.3px' }}>
              Free to start · Works offline · No assistant needed
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <LiveCourtCard />
          </div>
        </div>
      </div>
    </section>
  )
}

function LiveCourtCard() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 360,
        background: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: 18,
        padding: 18,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ color: '#475569', fontSize: 11, letterSpacing: '0.1em' }}>SET 2 · R3</span>
        <span style={{ color: '#e24b4a', fontSize: 11, fontWeight: 700 }}>● LIVE</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ textAlign: 'center' }}>
          <div className="font-bebas" style={{ fontSize: 46, color: '#22c55e', lineHeight: 1 }}>21</div>
          <div style={{ color: '#64748b', fontSize: 11 }}>HOME</div>
        </div>
        <div style={{ color: '#334155', fontSize: 22 }}>–</div>
        <div style={{ textAlign: 'center' }}>
          <div className="font-bebas" style={{ fontSize: 46, color: '#f0f0f0', lineHeight: 1 }}>18</div>
          <div style={{ color: '#64748b', fontSize: 11 }}>AWAY</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
        {ROW.map((r, i) => (
          <div
            key={i}
            className="font-bebas"
            style={{
              height: 38,
              borderRadius: '50%',
              border: `2px solid ${r.c}`,
              color: r.c,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
            }}
          >
            {r.n}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 12,
          background: '#22c55e',
          color: '#04220f',
          textAlign: 'center',
          padding: 10,
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        RALLY WON
      </div>
    </div>
  )
}
