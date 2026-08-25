import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { publications } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

/** Publications — research papers from the previous site */
export function Publications() {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        list.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 78%',
            once: true,
          },
        },
      )
    }, list)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="publications"
      className="relative px-6 pt-12 pb-24 md:px-12 md:pt-14 md:pb-28 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Publications" eyebrow="Research" />

        <div ref={listRef} className="space-y-5">
          {publications.map((pub) => (
            <article
              key={pub.id}
              className="border border-[var(--color-border)] bg-[var(--color-ink)] p-6 transition-colors duration-400 hover:border-[rgba(201,166,107,0.28)] md:p-8"
            >
              <h3 className="font-display text-base font-semibold leading-snug text-[var(--color-text)] md:text-xl">
                {pub.title}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-[var(--color-muted)] md:text-sm">
                <span className="text-[var(--color-text)]">Authors:</span>{' '}
                {pub.authors}
              </p>
              <p className="mt-2 text-xs text-[var(--color-accent)] md:text-sm">
                {pub.venue}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                {pub.summary}
              </p>
              <div className="mt-6">
                <MagneticButton
                  as="a"
                  href={pub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[var(--color-border)] px-5 py-2.5 text-[11px] tracking-[0.18em] text-[var(--color-text)] uppercase transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  {pub.cta}
                </MagneticButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
