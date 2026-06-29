import type { Metadata, Viewport } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CourtOS — Your Entire Coaching Staff. One Tap.',
  description:
    'CourtOS replaces your scorekeeper, rotation tracker, sub coordinator, and stats person — all in one sideline app for volleyball coaches.',
  metadataBase: new URL('https://courtos.co'),
  openGraph: {
    title: 'CourtOS — Your Entire Coaching Staff. One Tap.',
    description:
      'CourtOS replaces your scorekeeper, rotation tracker, sub coordinator, and stats person — all in one sideline app for volleyball coaches.',
    type: 'website',
    url: 'https://courtos.co',
    siteName: 'CourtOS',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CourtOS — Your Entire Coaching Staff. One Tap.',
    description:
      'CourtOS replaces your scorekeeper, rotation tracker, sub coordinator, and stats person — all in one sideline app for volleyball coaches.',
    images: ['/og-image.png'],
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
}

export const viewport: Viewport = {
  themeColor: '#0C0C0C',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="bg-[#0C0C0C] text-white font-[family-name:var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  )
}
