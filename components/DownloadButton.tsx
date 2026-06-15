'use client'
import { useState } from 'react'
import { downloadHref, IS_LAUNCHED, GREEN, GREEN_INK } from '@/lib/site'

type Variant = 'primary' | 'light' | 'outline'

const PALETTE: Record<Variant, { bg: string; color: string; border: string }> = {
  primary: { bg: GREEN, color: GREEN_INK, border: GREEN },
  light: { bg: '#f8fafc', color: GREEN_INK, border: '#f8fafc' },
  outline: { bg: 'transparent', color: '#e2e8f0', border: '#334155' },
}

export default function DownloadButton({
  variant = 'primary',
  label = 'Download free',
  size = 'md',
}: {
  variant?: Variant
  label?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const [hover, setHover] = useState(false)
  const p = PALETTE[variant]
  const pad = size === 'lg' ? '14px 26px' : size === 'sm' ? '8px 15px' : '12px 22px'
  const fontSize = size === 'lg' ? 16 : size === 'sm' ? 14 : 15

  return (
    <a
      href={downloadHref()}
      {...(IS_LAUNCHED ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
        background: p.bg,
        color: p.color,
        border: `1px solid ${p.border}`,
        padding: pad,
        borderRadius: 10,
        fontWeight: 600,
        fontSize,
        textDecoration: 'none',
        transition: 'transform 0.15s ease, opacity 0.15s ease',
        transform: hover ? 'translateY(-1px)' : 'none',
        opacity: hover ? 0.92 : 1,
        whiteSpace: 'nowrap',
      }}
    >
      <AppleMark color={p.color} />
      {label}
    </a>
  )
}

function AppleMark({ color }: { color: string }) {
  return (
    <svg width="17" height="20" viewBox="0 0 17 20" fill={color} aria-hidden="true">
      <path d="M13.62 10.62c.02 2.5 2.19 3.33 2.21 3.34-.02.06-.35 1.2-1.15 2.37-.69 1.02-1.4 2.03-2.53 2.05-1.1.02-1.46-.65-2.72-.65-1.27 0-1.66.63-2.71.67-1.08.04-1.91-1.1-2.61-2.12-1.42-2.07-2.51-5.86-1.05-8.41.72-1.27 2.02-2.07 3.42-2.09 1.07-.02 2.08.72 2.73.72.66 0 1.88-.89 3.17-.76.54.02 2.05.22 3.02 1.64-.08.05-1.8 1.06-1.78 3.15M11.5 4.04c.58-.7.97-1.67.86-2.64-.83.03-1.84.55-2.44 1.25-.54.62-1.01 1.61-.88 2.56.93.07 1.87-.47 2.46-1.17" />
    </svg>
  )
}
