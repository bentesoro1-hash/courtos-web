import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import NoAssistantNeeded from '@/components/NoAssistantNeeded'
import Agitation from '@/components/Agitation'
import AppTease from '@/components/AppTease'
import FeatureShowcase from '@/components/FeatureShowcase'
import FeaturesSection from '@/components/FeaturesSection'
import HowItWorks from '@/components/HowItWorks'
import BetaSignup from '@/components/BetaSignup'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'CourtOS — Volleyball Stats & Rotation Tracker App',
  description:
    'The volleyball coaching app for live scoring, automatic rotation tracking, subs, and real-time stats. Built by a coach — get early access.',
  alternates: { canonical: 'https://courtos.co' },
  openGraph: {
    title: 'CourtOS — Volleyball Stats & Rotation Tracker App',
    description:
      'Live scoring, automatic rotation tracking, subs, and real-time stats for volleyball coaches. Built by a coach.',
    url: 'https://courtos.co',
  },
}

const softwareLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CourtOS',
  applicationCategory: 'SportsApplication',
  operatingSystem: 'iOS',
  description:
    'Volleyball coaching app for live scoring, automatic rotation tracking, substitution management, and real-time stats.',
  url: 'https://courtos.co',
  offers: [
    { '@type': 'Offer', price: '0', priceCurrency: 'USD', name: 'Free' },
    { '@type': 'Offer', price: '9.99', priceCurrency: 'USD', name: 'Coach Premium' },
  ],
}

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CourtOS',
  url: 'https://courtos.co',
  logo: 'https://courtos.co/logo.png',
  sameAs: ['https://www.instagram.com/courtos.app'],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <Navbar />
      <main>
        <Hero />
        <NoAssistantNeeded />
        <Agitation />
        <AppTease />
        <FeatureShowcase />
        <FeaturesSection />
        <HowItWorks />
        <BetaSignup />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
