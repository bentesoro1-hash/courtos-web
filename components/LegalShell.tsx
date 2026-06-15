import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'

/**
 * Shared shell for legal pages (privacy, terms, subscription terms).
 * Clean, readable, brand-dark. Intentionally simple — these pages must be
 * legible and stable, not flashy.
 */
export default function LegalShell({
  title,
  effectiveDate,
  children,
}: {
  title: string
  effectiveDate: string
  children: ReactNode
}) {
  return (
    <div style={{ background: '#060b14', minHeight: '100vh', color: '#e2e8f0' }}>
      <header
        style={{
          borderBottom: '1px solid #1e293b',
          padding: '18px 24px',
          position: 'sticky',
          top: 0,
          background: 'rgba(6,11,20,0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <Image src="/logo.png" alt="CourtOS" width={104} height={26} style={{ height: 26, width: 'auto' }} priority />
          </Link>
          <Link href="/" style={{ color: '#22c55e', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
            ← Back to site
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px 96px' }}>
        <h1 style={{ fontSize: 34, fontWeight: 800, color: '#f8fafc', margin: '0 0 8px', lineHeight: 1.15 }}>{title}</h1>
        <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 40px' }}>Effective date: {effectiveDate}</p>

        <div className="legal-body">{children}</div>

        <hr style={{ border: 0, borderTop: '1px solid #1e293b', margin: '56px 0 24px' }} />
        <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.6 }}>
          Questions about this document? Email{' '}
          <a href="mailto:courtos@courtos.co" style={{ color: '#22c55e', textDecoration: 'none' }}>
            courtos@courtos.co
          </a>
          .
        </p>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 20 }}>
          <Link href="/privacy" style={legalLink}>Privacy Policy</Link>
          <Link href="/terms" style={legalLink}>Terms of Service</Link>
          <Link href="/subscription-terms" style={legalLink}>Subscription Terms</Link>
        </div>
      </main>

      {/* Scoped typography for legal prose */}
      <style>{`
        .legal-body h2 { font-size: 20px; font-weight: 700; color: #f8fafc; margin: 36px 0 12px; }
        .legal-body h3 { font-size: 16px; font-weight: 700; color: #f1f5f9; margin: 24px 0 8px; }
        .legal-body p { font-size: 15.5px; line-height: 1.7; color: #cbd5e1; margin: 0 0 14px; }
        .legal-body ul { margin: 0 0 16px; padding-left: 22px; }
        .legal-body li { font-size: 15.5px; line-height: 1.7; color: #cbd5e1; margin: 0 0 8px; }
        .legal-body a { color: #22c55e; text-decoration: none; }
        .legal-body a:hover { text-decoration: underline; }
        .legal-body strong { color: #f1f5f9; }
        .legal-body .note { background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 16px 18px; margin: 0 0 18px; }
        .legal-body .note p { margin: 0; color: #e2e8f0; }
      `}</style>
    </div>
  )
}

const legalLink = { color: '#64748b', fontSize: 13, textDecoration: 'none', fontWeight: 600 } as const
