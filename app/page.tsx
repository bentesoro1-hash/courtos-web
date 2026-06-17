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

export default function Home() {
  return (
    <>
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
