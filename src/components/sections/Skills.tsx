import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { skills } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

/**
 * Skills — copy + staggered category tiles + infinite marquee strip.
 * Marquee duration: 28s — lower = faster.
 */
export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const tilesRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const copy = section.querySelectorAll('[data-reveal]')
      gsap.fromTo(
        copy,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%', once: true },
        },
      )

      if (tilesRef.current) {
        gsap.fromTo(
          tilesRef.current.children,
          { opacity: 0, y: 28, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tilesRef.current,
              start: 'top 80%',
              once: true,
            },
          },
        )
      }

      // Infinite horizontal marquee — duplicated content for seamless loop
      if (marqueeRef.current) {
        const track = marqueeRef.current
        gsap.to(track, {
          xPercent: -50,
          duration: 28,
          ease: 'none',
          repeat: -1,
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const marqueeItems = [...skills.tags, ...skills.tags]

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={skills.heading} eyebrow="Capabilities" />

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h3
              data-reveal
              className="font-display mb-4 text-xl font-semibold text-[var(--color-text)] md:text-2xl"
            >
              {skills.subheading}
            </h3>
            <p
              data-reveal
              className="mb-8 text-base leading-relaxed text-[var(--color-muted)]"
            >
              {skills.body}
            </p>
            <div data-reveal className="mb-8 flex flex-wrap gap-2">
              {skills.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-[var(--color-border)] px-3 py-1.5 text-xs tracking-wide text-[var(--color-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div data-reveal>
              <MagneticButton
                as="a"
                href={skills.resumeHref}
                download="Nachappa_PP_Resume_Aug26.pdf"
                className="bg-[var(--color-text)] px-7 py-3.5 text-xs font-semibold tracking-[0.2em] text-[var(--color-void)] uppercase transition-opacity hover:opacity-90"
              >
                {skills.resumeLabel}
              </MagneticButton>
            </div>
          </div>

          <div
            ref={tilesRef}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            {skills.categories.map((cat) => (
              <div
                key={cat.title}
                className="group border border-[var(--color-border)] bg-[var(--color-ink)] p-5 transition-colors duration-400 hover:border-[rgba(201,166,107,0.35)] md:p-6"
              >
                <p className="font-display text-sm font-semibold text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
                  {cat.title}
                </p>
                <p className="mt-2 text-xs text-[var(--color-muted)]">
                  {cat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Infinite skill marquee */}
      <div className="mt-20 overflow-hidden border-y border-[var(--color-border)] py-5">
        <div
          ref={marqueeRef}
          className="flex w-max gap-10 whitespace-nowrap will-change-transform"
          aria-hidden
        >
          {marqueeItems.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="font-display text-sm font-semibold tracking-[0.28em] text-[var(--color-muted)] uppercase"
            >
              {tag}
              <span className="ml-10 text-[var(--color-accent)]">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
