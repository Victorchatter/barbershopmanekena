import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Team from '@/components/Team'
import Gallery from '@/components/Gallery'
import Reviews from '@/components/Reviews'
import Location from '@/components/Location'
import Footer from '@/components/Footer'
import StickyMobileCTA from '@/components/StickyMobileCTA'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Team />
        <Gallery />
        <Reviews />
        <Location />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  )
}
