'use client'

import { useState } from 'react'
import Hero from './components/Hero'
import SocialProof from './components/home/SocialProof'
import Features from './components/home/Features'
import HowItWorks from './components/home/HowItWorks'
import Pricing from './components/home/Pricing'
import Testimonials from './components/home/Testimonials'
import CTABanner from './components/home/CTABanner'
import Footer from './components/Footer'
// import { Dialog, DialogPanel } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

const LandingPage = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <main className="min-h-screen bg-background text-foreground">
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <CTABanner />
        <Footer />
      </main>
    </>
  )
}

export default LandingPage


