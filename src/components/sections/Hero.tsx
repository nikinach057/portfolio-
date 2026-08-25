import { useEffect, useRef, useState, Suspense, lazy } from 'react'
import gsap from 'gsap'
import { SplitText, animateSplitText } from '@/components/ui/SplitText'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { TypedName } from '@/components/ui/TypedName'
import { siteContent } from '@/data/content'

/** Entire R3F Canvas chunk — deferred until after preloader wipe */
const Scene = lazy(() =>
  import('@/components/three/Scene').then((m) => ({ default: m.Scene })),
)

type HeroProps = {
  ready: boolean
}

/**
 * Hero — full-viewport composition: 3D field + staggered headline + scroll cue.
 * Display name types in with Capabilities accent color (same size/font as line).
 */
export function Hero({ ready }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const tagRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [sceneOn, setSceneOn] = useState(false)
  const [typeName, setTypeName] = useState(false)

  useEffect(() => {
    if (!ready) return

    const id = window.setTimeout(() => setSceneOn(true), 80)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        sectionRef.current,
        { opacity: 0.6 },
        { opacity: 1, duration: 0.6 },
        0,
      )

      const nameAnim = nameRef.current
        ? animateSplitText(nameRef.current, {
            stagger: 0.06,
            duration: 1.05,
            ease: 'power4.out',
            delay: 0,
          })
        : null
      if (nameAnim) tl.add(nameAnim, 0.15)

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            onStart: () => setTypeName(true),
          },
          0.55,
        )
      }

      if (tagRef.current) {
        tl.fromTo(
          tagRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          0.95,
        )
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          1.15,
        )
      }

      if (scrollRef.current) {
        tl.fromTo(
          scrollRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.8 },
          1.3,
        )
        gsap.to(scrollRef.current.querySelector('[data-scroll-dot]'), {
          y: 8,
          duration: 1.1,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1.6,
        })
      }
    }, sectionRef)

    return () => {
      window.clearTimeout(id)
      ctx.revert()
    }
  }, [ready])

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-dvh items-end overflow-hidden px-6 pb-16 md:items-center md:px-12 md:pb-0 lg:px-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-black"
        aria-hidden
      />

      {sceneOn && ready && (
        <Suspense fallback={null}>
          <Scene enabled className="z-0" />
        </Suspense>
      )}

      <div className="relative z-10 max-w-4xl pt-28 md:pt-0">
        <p className="mb-4 text-[11px] font-medium tracking-[0.32em] text-[var(--color-accent)] uppercase md:mb-6">
          Portfolio
        </p>

        <h1
          ref={nameRef}
          className="font-display text-[clamp(2.25rem,6.5vw,4.75rem)] font-extrabold tracking-[-0.04em] text-[var(--color-text)]"
        >
          <SplitText text={siteContent.name} mode="words" />
        </h1>

        <p
          ref={titleRef}
          className="font-display mt-4 max-w-2xl text-[clamp(1.05rem,2.5vw,1.65rem)] font-semibold text-[var(--color-muted)] opacity-0 md:mt-6"
        >
          <TypedName
            text={siteContent.displayName}
            play={typeName}
            delayMs={120}
            charMs={75}
          />
          <span>{siteContent.titleSuffix}</span>
        </p>

        <p
          ref={tagRef}
          className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-muted)] opacity-0 md:text-lg"
        >
          {siteContent.tagline}
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <MagneticButton
            as="a"
            href={siteContent.ctaPrimary.href}
            onClick={(e) => {
              e.preventDefault()
              scrollTo(siteContent.ctaPrimary.href)
            }}
            className="bg-[var(--color-text)] px-7 py-3.5 text-xs font-semibold tracking-[0.2em] text-[var(--color-void)] uppercase opacity-0"
          >
            {siteContent.ctaPrimary.label}
          </MagneticButton>
          <MagneticButton
            as="a"
            href={siteContent.ctaSecondary.href}
            onClick={(e) => {
              e.preventDefault()
              scrollTo(siteContent.ctaSecondary.href)
            }}
            className="border border-[var(--color-border)] px-7 py-3.5 text-xs font-semibold tracking-[0.2em] text-[var(--color-text)] uppercase opacity-0 transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            {siteContent.ctaSecondary.label}
          </MagneticButton>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 opacity-0 md:bottom-10"
        aria-hidden
      >
        <span className="text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
          {siteContent.scrollHint}
        </span>
        <div className="relative flex h-12 w-6 justify-center rounded-full border border-[var(--color-border)]">
          <span
            data-scroll-dot
            className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
          />
        </div>
      </div>
    </section>
  )
}
