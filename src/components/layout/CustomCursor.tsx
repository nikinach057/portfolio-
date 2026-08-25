import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { useIsMobile } from '@/hooks/useMediaQuery'

type CursorState = 'default' | 'view' | 'drag' | 'link'

/**
 * CustomCursor — soft ring that grows / labels on interactive hover.
 *
 * State is driven by data-cursor="view|drag|link" on interactive elements.
 * Lerp (~0.15) keeps motion damped — edit for snappier or softer follow.
 */
export function CustomCursor() {
  const isMobile = useIsMobile()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [label, setLabel] = useState('')
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (isMobile) return

    const LERP = 0.15 // cursor follow damping — lower = more lag

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.('[data-cursor]')
      const state = (el?.getAttribute('data-cursor') as CursorState) || 'default'
      const customLabel = el?.getAttribute('data-cursor-label') || ''

      const ring = ringRef.current
      const labelEl = labelRef.current
      if (!ring) return

      if (state === 'default') {
        gsap.to(ring, {
          width: 40,
          height: 40,
          borderColor: 'rgba(242,240,235,0.35)',
          backgroundColor: 'transparent',
          duration: 0.45,
          ease: 'power3.out',
        })
        setLabel('')
        if (labelEl) gsap.to(labelEl, { opacity: 0, duration: 0.2 })
      } else {
        gsap.to(ring, {
          width: 72,
          height: 72,
          borderColor: 'rgba(201,166,107,0.55)',
          backgroundColor: 'rgba(201,166,107,0.12)',
          duration: 0.45,
          ease: 'power3.out',
        })
        const next =
          customLabel ||
          (state === 'view' ? 'View' : state === 'drag' ? 'Drag' : '')
        setLabel(next)
        if (labelEl) gsap.to(labelEl, { opacity: 1, duration: 0.25, delay: 0.05 })
      }
    }

    let raf = 0
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * LERP
      pos.current.y += (target.current.y - pos.current.y) * LERP

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [isMobile])

  if (isMobile || typeof document === 'undefined') return null

  return createPortal(
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] will-change-transform"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(242,240,235,0.35)] will-change-transform"
        aria-hidden
      >
        <span
          ref={labelRef}
          className="font-display text-[10px] font-semibold tracking-[0.18em] text-[var(--color-accent)] uppercase opacity-0"
        >
          {label}
        </span>
      </div>
    </>,
    document.body,
  )
}

/** Helper to mark interactive regions for the cursor */
export function CursorTarget({
  children,
  state = 'link',
  label,
  className,
}: {
  children: ReactNode
  state?: CursorState
  label?: string
  className?: string
}) {
  return (
    <span
      data-cursor={state}
      data-cursor-label={label}
      className={className}
      style={{ display: 'contents' }}
    >
      {children}
    </span>
  )
}
