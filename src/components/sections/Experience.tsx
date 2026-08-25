import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { experience } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

/**
 * Experience — open editorial timeline (no card boxes).
 * Large brand logos + hairline dividers keep it unique and readable.
 */
export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        list.querySelectorAll('[data-exp-item]'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 78%',
            once: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative px-6 py-12 md:px-12 md:py-16 lg:px-20"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading title="Professional Experience" eyebrow="Career" />

        <div ref={listRef} className="relative">
          <ul className="flex flex-col">
            {experience.map((job, i) => (
              <li
                key={job.id}
                data-exp-item
                className={`group relative grid gap-6 py-10 md:grid-cols-[7rem_1.25rem_1fr] md:gap-0 md:py-14 ${
                  i < experience.length - 1
                    ? 'border-b border-[var(--color-border)]'
                    : ''
                }`}
              >
                {/* Large logo — no frame/box */}
                <div className="relative z-10 flex items-start md:justify-center">
                  <div className="flex h-20 w-20 items-center justify-center bg-[var(--color-void)] md:h-24 md:w-24">
                    <img
                      src={job.logo}
                      alt={`${job.company} logo`}
                      className="max-h-full max-w-full object-contain opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Spine sits in its own column — never crosses logos */}
                <div className="relative hidden md:block" aria-hidden>
                  <div
                    className={`absolute top-0 left-1/2 w-px -translate-x-1/2 bg-[var(--color-border)] ${
                      i === 0 ? 'top-3' : 'top-0'
                    } ${i === experience.length - 1 ? 'h-3' : 'bottom-[-3.5rem]'}`}
                  />
                  <span className="absolute top-3 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-void)]" />
                </div>

                <div className="md:pl-10">
                  <p className="mb-2 text-[11px] tracking-[0.22em] text-[var(--color-accent)] uppercase">
                    {job.period}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-[var(--color-text)] transition-colors duration-400 group-hover:text-[var(--color-accent)] md:text-2xl">
                    {job.role}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-[var(--color-muted)] md:text-base">
                    {job.company}
                  </p>
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)] md:text-[0.95rem]">
                    {job.summary}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] tracking-[0.16em] text-[var(--color-muted)] uppercase before:mr-2 before:text-[var(--color-accent)] before:content-['·']"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
