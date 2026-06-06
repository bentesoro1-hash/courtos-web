import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'CourtOS — The Coaching OS for Volleyball',
  description:
    'CourtOS helps volleyball coaches track rotations, substitutions, stats, and match flow in one simple sideline app.',
  metadataBase: new URL('https://courtos.co'),
  openGraph: {
    title: 'CourtOS — The Coaching OS for Volleyball',
    description:
      'CourtOS helps volleyball coaches track rotations, substitutions, stats, and match flow in one simple sideline app.',
    type: 'website',
    url: 'https://courtos.co',
    siteName: 'CourtOS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CourtOS — The Coaching OS for Volleyball',
    description:
      'CourtOS helps volleyball coaches track rotations, substitutions, stats, and match flow in one simple sideline app.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-court-bg text-white font-[var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  )
}
