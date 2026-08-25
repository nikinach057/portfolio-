import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * SmoothScroll — Lenis + ScrollTrigger sync.
 *
 * Lenis lerp (0.08): lower = silkier / heavier feel. Try 0.05–0.12.
 * duration (1.2): wheel animation length in seconds.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      // Avoid fighting touch browsers' native inertia
      syncTouch: false,
    })

    // Keep GSAP ScrollTrigger in sync with Lenis scroll position
    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
