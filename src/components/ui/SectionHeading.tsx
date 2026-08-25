import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type SectionHeadingProps = {
  title: string
  eyebrow?: string
  className?: string
}

/** Scroll-triggered section title reveal */
export function SectionHeading({
  title,
  eyebrow,
  className = '',
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className={`mb-8 md:mb-10 ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-[11px] font-medium tracking-[0.32em] text-[var(--color-accent)] uppercase opacity-0">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-[-0.03em] text-[var(--color-text)] opacity-0">
        {title}
      </h2>
    </div>
  )
}
