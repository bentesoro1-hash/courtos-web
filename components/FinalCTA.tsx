import Image from 'next/image'
import DownloadButton from './DownloadButton'

export default function FinalCTA() {
  return (
    <section
      style={{
        background: '#0a1120',
        padding: '96px 24px',
        textAlign: 'center',
        borderTop: '1px solid #11192b',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.06,
          backgroundImage: 'repeating-linear-gradient(115deg,#22c55e 0 2px,transparent 2px 28px)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
        <Image
          src="/logo.png"
          alt="CourtOS"
          width={150}
          height={38}
          style={{ height: 38, width: 'auto', margin: '0 auto 36px', display: 'block' }}
        />
        <h2
          className="font-bebas"
          style={{ fontSize: 'clamp(48px, 8vw, 88px)', lineHeight: 0.95, letterSpacing: '0.02em', margin: '0 0 16px' }}
        >
          <span style={{ color: '#f0f0f0', display: 'block' }}>PUT THE</span>
          <span style={{ color: '#22c55e', display: 'block' }}>CLIPBOARD DOWN.</span>
        </h2>
        <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6, maxWidth: 420, margin: '0 auto 30px' }}>
          Join the coaches running their sideline on CourtOS. Free to start.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <DownloadButton variant="primary" label="Download free" size="lg" />
        </div>
        <p style={{ color: '#475569', fontSize: 13, marginTop: 18 }}>Free to start · No assistant needed</p>
      </div>
    </section>
  )
}
