import { FeaturesSection } from '@/components/landing/features'
import { Footer } from '@/components/landing/footer'
import { Header } from '@/components/landing/header'
import { HeroSection } from '@/components/landing/hero'
import { HowItWorks } from '@/components/landing/how-it-works'
import { PricingSection } from '@/components/landing/pricing'
import { TestimonialsSection } from '@/components/landing/testimonials'

const LandingPage = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <PricingSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  )
}

export default LandingPage
