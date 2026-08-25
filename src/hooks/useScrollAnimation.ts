import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ScrollRevealOptions = {
  /** GSAP y offset in px — tweak for stronger/weaker slide */
  y?: number
  /** Duration in seconds */
  duration?: number
  /** Stagger between children (seconds) */
  stagger?: number
  /** Start position string for ScrollTrigger */
  start?: string
}

/**
 * useScrollReveal — fades/slides children in when the section enters the viewport.
 *
 * Timing notes (edit freely):
 * - duration: 1.1 feels cinematic; drop to ~0.7 for snappier UI
 * - ease: "power3.out" = premium decelerate (avoid "none" / linear)
 * - start: "top 80%" triggers slightly before fully in view
 */
export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {},
) {
  const ref = useRef<T>(null)
  const {
    y = 48,
    duration = 1.1,
    stagger = 0.12,
    start = 'top 80%',
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll('[data-reveal]')
    if (!targets.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [y, duration, stagger, start])

  return ref
}
