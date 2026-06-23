'use client'

import Hero from './components/home/Hero'
import SocialProof from './components/home/SocialProof'
import Features from './components/home/Features'
import HowItWorks from './components/home/HowItWorks'
import Pricing from './components/home/Pricing'
import Testimonials from './components/home/Testimonials'
import CTABanner from './components/home/CTABanner'
import Team from './components/Team'

const LandingPage = () => {

  return (
    <>
      <main className="bg-background text-foreground">
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <Team/>
        <CTABanner />
      </main>
    </>
  )
}

export default LandingPage


