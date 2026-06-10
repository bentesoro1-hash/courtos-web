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
    images: [{ url: '/images/logo-full-tagline.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CourtOS — The Coaching OS for Volleyball',
    description:
      'CourtOS helps volleyball coaches track rotations, substitutions, stats, and match flow in one simple sideline app.',
    images: ['/images/logo-full-tagline.svg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#060b14',
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
