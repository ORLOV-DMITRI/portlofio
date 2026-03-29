import { HeroSection, AboutSection, ExperienceSection, ProjectsSection } from '@/components/landing'
import { Header } from '@/components/landing/Header'
import { Footer } from '@/components/landing/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
      </main>
      <Footer />
    </>
  )
}
