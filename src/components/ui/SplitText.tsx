import { useLayoutEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { splitChars, splitWords } from '@/utils/splitText'

type SplitMode = 'chars' | 'words'

type SplitTextProps = {
  text: string
  mode?: SplitMode
  className?: string
  /** When true, starts hidden (opacity 0) for GSAP to reveal */
  asReveal?: boolean
  /** Optional class on each unit span */
  unitClassName?: string
  children?: never
}

/**
 * SplitText — wraps each char/word in overflow-hidden spans for stagger reveals.
 * Pair with animateSplitText() or a parent GSAP timeline.
 */
export function SplitText({
  text,
  mode = 'words',
  className,
  asReveal = true,
  unitClassName = '',
}: SplitTextProps) {
  const units = mode === 'chars' ? splitChars(text) : splitWords(text)

  return (
    <span className={className} aria-label={text} data-split={mode}>
      {units.map((unit, i) => {
        const isSpace = /^\s+$/.test(unit)
        if (isSpace) {
          return <span key={`sp-${i}`}>{' '}</span>
        }
        return (
          <span
            key={`${unit}-${i}`}
            className="inline-block overflow-hidden align-bottom"
          >
            <span
              className={`inline-block will-change-transform ${unitClassName}`}
              data-split-unit
              style={asReveal ? { opacity: 0, transform: 'translateY(110%)' } : undefined}
            >
              {unit}
            </span>
          </span>
        )
      })}
    </span>
  )
}

/**
 * animateSplitText — staggered rise + fade for [data-split-unit] children.
 *
 * Timing knobs:
 * - stagger: 0.035 (chars) / 0.08 (words)
 * - duration: 1.0
 * - ease: "power4.out" — strong decelerate for premium feel
 */
export function animateSplitText(
  root: HTMLElement | null,
  opts: {
    delay?: number
    stagger?: number
    duration?: number
    ease?: string
  } = {},
) {
  if (!root) return null
  const units = root.querySelectorAll<HTMLElement>('[data-split-unit]')
  if (!units.length) return null

  return gsap.to(units, {
    opacity: 1,
    y: 0,
    duration: opts.duration ?? 1,
    stagger: opts.stagger ?? 0.04,
    ease: opts.ease ?? 'power4.out',
    delay: opts.delay ?? 0,
  })
}

/** Hook-friendly wrapper that auto-plays on mount when `play` is true */
export function useSplitReveal(
  play: boolean,
  opts?: { mode?: SplitMode; stagger?: number; delay?: number },
) {
  const ref = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    if (!play || !ref.current) return
    const tween = animateSplitText(ref.current, {
      stagger: opts?.stagger ?? (opts?.mode === 'words' ? 0.08 : 0.035),
      delay: opts?.delay ?? 0.15,
    })
    return () => {
      tween?.kill()
    }
  }, [play, opts?.stagger, opts?.delay, opts?.mode])

  return ref
}

export function SplitHeading({
  children,
  play,
  mode = 'chars',
  className,
  stagger,
  delay,
}: {
  children: string
  play: boolean
  mode?: SplitMode
  className?: string
  stagger?: number
  delay?: number
}): ReactNode {
  const ref = useSplitReveal(play, { mode, stagger, delay })
  return (
    <h1 ref={ref} className={className}>
      <SplitText text={children} mode={mode} />
    </h1>
  )
}
