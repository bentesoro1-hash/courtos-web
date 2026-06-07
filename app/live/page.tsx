import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { Barlow_Condensed } from 'next/font/google'
import LiveClient from './LiveClient'

const barlow = Barlow_Condensed({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-barlow',
})

export const metadata: Metadata = {
  title: 'Watch Live — CourtOS',
  description: "Follow your team's volleyball match live. Enter your room code to see the score.",
  metadataBase: new URL('https://courtos.co'),
  openGraph: {
    title: 'Watch Live — CourtOS',
    description: "Follow your team's volleyball match live. Enter your room code to see the score.",
    type: 'website',
    url: 'https://courtos.co/live',
    siteName: 'CourtOS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Watch Live — CourtOS',
    description: "Follow your team's volleyball match live. Enter your room code to see the score.",
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function LivePage() {
  return (
    <div className={barlow.variable} style={{ minHeight: '100vh', backgroundColor: '#060b14' }}>
      <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#060b14' }} />}>
        <LiveClient />
      </Suspense>
    </div>
  )
}
