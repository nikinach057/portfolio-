import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { about } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

/** About — large portrait + bio (no 3D). */
export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    if (!section || !text) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        text.querySelectorAll('[data-reveal]'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 75%',
            once: true,
          },
        },
      )

      gsap.fromTo(
        section.querySelector('[data-about-photo]'),
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true,
          },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden px-6 pt-24 pb-12 md:px-12 md:pt-28 md:pb-14 lg:px-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(201,166,107,0.06),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading title={about.heading} eyebrow="Profile" />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative flex justify-center lg:sticky lg:top-28 lg:self-start">
            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(201,166,107,0.18),transparent_68%)] blur-2xl md:-inset-10"
                aria-hidden
              />
              <img
                data-about-photo
                src={about.photo}
                alt={about.photoAlt}
                className="relative z-10 h-64 w-64 rounded-full object-cover ring-1 ring-[var(--color-border)] sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-[22rem] lg:w-[22rem] xl:h-96 xl:w-96"
                loading="lazy"
              />
            </div>
          </div>

          <div ref={textRef} className="space-y-10 pb-8 lg:py-8">
            <p
              data-reveal
              className="text-base leading-relaxed text-[var(--color-muted)] md:text-lg"
            >
              {about.body}
            </p>

            <div data-reveal>
              <h3 className="font-display mb-5 text-lg font-semibold text-[var(--color-text)]">
                Expertise
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {about.expertise.map((item) => (
                  <div
                    key={item.title}
                    className="border-t border-[var(--color-border)] pt-4"
                  >
                    <p className="font-display text-sm font-semibold text-[var(--color-text)]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-muted)]">
                      {item.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal>
              <h3 className="font-display mb-5 text-lg font-semibold text-[var(--color-text)]">
                Key Highlights
              </h3>
              <ul className="space-y-4">
                {about.highlights.map((h) => (
                  <li key={h.title} className="flex gap-4">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    <div>
                      <p className="font-medium text-[var(--color-text)]">
                        {h.title}
                      </p>
                      <p className="text-sm text-[var(--color-muted)]">{h.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
