import Hero from '@/components/home/Hero'
// import TrustBar from '@/components/home/TrustBar' // commented out for now — bring back later
import WhyChooseUs from '@/components/home/WhyChooseUs'
import ProcessSteps from '@/components/home/ProcessSteps'
import ResultsShowcase from '@/components/home/ResultsShowcase'
import ComparisonTable from '@/components/home/ComparisonTable'
import ServiceAreas from '@/components/home/ServiceAreas'
import Testimonials from '@/components/home/Testimonials'

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <TrustBar /> */}
      <WhyChooseUs />
      <ProcessSteps />
      <ResultsShowcase />
      <ComparisonTable />
      <ServiceAreas />
      <Testimonials />
    </main>
  )
}
