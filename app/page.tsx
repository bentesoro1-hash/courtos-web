import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeatureBands from '@/components/FeatureBands'
import Levels from '@/components/Levels'
import HowItWorks from '@/components/HowItWorks'
import Testimonial from '@/components/Testimonial'
import Pricing from '@/components/Pricing'
import BetaSignup from '@/components/BetaSignup'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureBands />
        <Levels />
        <HowItWorks />
        <Testimonial />
        <Pricing />
        <BetaSignup />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
