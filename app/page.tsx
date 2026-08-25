import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { HeroSection } from '@/components/sections/hero-section'
import { MarqueeSection } from '@/components/sections/marquee-section'
import { ServicesSection } from '@/components/sections/services-section'
import { TeamSection } from '@/components/sections/team-section'
import { GigsSection } from '@/components/sections/gigs-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { CasesSection } from '@/components/sections/cases-section'
import { ProcessSection } from '@/components/sections/process-section'
import { ContactSection } from '@/components/sections/contact-section'
import { ScrollProgress } from '@/components/ui/scroll-progress'

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main>
        <HeroSection />
        {/* Marquee breathes between hero and the content grid below —
            keeps the page alive while scrolling without forcing extra
            scroll distance the way a pinned horizontal track would. */}
        <MarqueeSection />
        <ServicesSection />
        <TeamSection />
        <GigsSection />
        <TestimonialsSection />
        <CasesSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
