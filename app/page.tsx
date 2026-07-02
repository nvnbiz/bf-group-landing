import { Hero } from '@/components/sections/Hero'
import { PainPoints } from '@/components/sections/PainPoints'
import { Services } from '@/components/sections/Services'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Process } from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { GuaranteesFaq } from '@/components/sections/GuaranteesFaq'
import { ContactFooter } from '@/components/sections/ContactFooter'
import { ScrollEffects } from '@/components/ScrollEffects'

export default function Home() {
  return (
    <main>
      <ScrollEffects />
      <Hero />
      <PainPoints />
      <Services />
      <CaseStudies />
      <Process />
      <Testimonials />
      <GuaranteesFaq />
      <ContactFooter />
    </main>
  )
}
