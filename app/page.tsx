import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import FeaturesSection from '@/components/FeaturesSection'
import BetaSignup from '@/components/BetaSignup'
import SocialProof from '@/components/SocialProof'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <FeaturesSection />
        <BetaSignup />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
