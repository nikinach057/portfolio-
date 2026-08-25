import { useCallback, useState } from 'react'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { GrainOverlay } from '@/components/layout/GrainOverlay'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Preloader } from '@/components/sections/Preloader'
import { Hero } from '@/components/sections/Hero'
import { Skills } from '@/components/sections/Skills'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Publications } from '@/components/sections/Publications'
import { Contact } from '@/components/sections/Contact'

/** Full portfolio shell — content from legacy index.html + components. */
export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true)
    setShowLoader(false)
  }, [])

  return (
    <>
      <GrainOverlay />
      <CustomCursor />
      {showLoader && <Preloader onComplete={handleLoaderComplete} />}

      <Header visible={loaded} />

      <SmoothScroll>
        <main className="relative bg-[var(--color-void)]">
          <Hero ready={loaded} />
          <Skills />
          <About />
          <Experience />
          <Publications />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  )
}
