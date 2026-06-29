'use client'

const QUOTES = [
  { quote: "I lost track of rotations in the third set and didn't notice until the ref called it. Cost us the match.", role: 'JV Head Coach', initial: 'M' },
  { quote: "I'm coaching, scoring, managing the lineup, and keeping stats all at the same time. Something always falls apart.", role: 'Club Coach, 14U', initial: 'T' },
  { quote: "Our stats are whatever I remember after the match. That's not stats — that's a guess.", role: 'Varsity Assistant Coach', initial: 'R' },
  { quote: "I forgot to sub the libero back in. The ref called it. Parents were furious. It was the third time that season.", role: 'Rec League Head Coach', initial: 'K' },
]

export default function Agitation() {
  return (
    <section style={{ background: '#080808', padding: '110px 24px', borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(61,190,107,0.3), transparent)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(44px, 6vw, 72px)', lineHeight: 1, color: '#F0F0F0', letterSpacing: '0.02em', marginBottom: 8 }}>COACHING ALONE IS HARD.</h2>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(44px, 6vw, 72px)', lineHeight: 1, color: '#3DBE6B', letterSpacing: '0.02em', marginBottom: 24, textShadow: '0 0 40px rgba(61,190,107,0.3)' }}>WE KNOW.</h2>
          <p style={{ color: '#A0A0A0', fontSize: 16, maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>These are real coaches. Real moments. Real mistakes that didn't have to happen.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {QUOTES.map((item) => (
            <div key={item.initial} style={{ background: 'linear-gradient(160deg, #161616 0%, #111 100%)', border: '1px solid #222', borderRadius: 18, padding: '32px 26px', display: 'flex', flexDirection: 'column', gap: 20, transition: 'all 0.25s ease' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-6px)'; el.style.borderColor = 'rgba(61,190,107,0.4)'; el.style.boxShadow = '0 0 40px rgba(61,190,107,0.12), 0 20px 40px rgba(0,0,0,0.5)' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.borderColor = '#222'; el.style.boxShadow = 'none' }}
            >
              <div style={{ color: '#3DBE6B', fontSize: 48, lineHeight: 0.8, fontWeight: 900, opacity: 0.5 }}>&ldquo;</div>
              <p style={{ color: '#D0D0D0', fontSize: 15, lineHeight: 1.7, margin: 0, flex: 1 }}>{item.quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #1e3828, #142a1e)', border: '1px solid rgba(61,190,107,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3DBE6B', fontSize: 13, fontWeight: 700 }}>{item.initial}</div>
                <span style={{ color: '#888', fontSize: 13, fontWeight: 500 }}>{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
