import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

type PreloaderProps = {
  /** Called after wipe completes — parent should unmount Preloader */
  onComplete: () => void
}

/**
 * Preloader — progress bar + clip-path curtain wipe into the site.
 *
 * Timeline overview (edit timings here):
 * 1. Fake load progress 0→100 over ~1.8s (ease power2.inOut)
 * 2. Hold ~0.25s on "100"
 * 3. Curtain wipe (clip-path) over 1.1s with power4.inOut
 * 4. onComplete()
 *
 * Swap the fake progress for real asset loading later via onProgress callbacks.
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const completed = useRef(false)
  const [displayPct, setDisplayPct] = useState(0)

  useEffect(() => {
    const root = rootRef.current
    const bar = barRef.current
    if (!root || !bar) return

    const progress = { value: 0 }

    const finish = () => {
      if (completed.current) return
      completed.current = true
      onComplete()
    }

    const tl = gsap.timeline({ onComplete: finish })

    // --- Phase 1: animated progress ---
    tl.to(progress, {
      value: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(progress.value)
        setDisplayPct(v)
        bar.style.transform = `scaleX(${progress.value / 100})`
      },
    })

    // --- Phase 2: brief settle ---
    tl.to({}, { duration: 0.25 })

    // --- Phase 3: curtain wipe upward (clip-path) ---
    // inset(top right bottom left) — expanding top edge reveals content below
    tl.to(root, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 1.1,
      ease: 'power4.inOut',
    })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--color-void)]"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="mb-12 flex items-center gap-3" aria-hidden>
        <span className="font-display text-sm font-semibold tracking-[0.35em] text-[var(--color-muted)] uppercase">
          Loading
        </span>
      </div>

      <div className="relative mb-6 h-14 w-14" aria-hidden>
        <div className="absolute inset-0 animate-[spin_3.5s_cubic-bezier(0.65,0,0.35,1)_infinite] rounded-full border border-[var(--color-border)] border-t-[var(--color-accent)]" />
        <div className="absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(201,166,107,0.25),transparent_70%)]" />
      </div>

      <div className="relative h-px w-[min(72vw,280px)] overflow-hidden bg-[var(--color-elevated)]">
        <div
          ref={barRef}
          className="absolute inset-y-0 left-0 origin-left w-full scale-x-0 bg-[var(--color-accent)]"
        />
      </div>

      <span
        ref={percentRef}
        className="font-display mt-5 text-xs tracking-[0.25em] text-[var(--color-muted)] tabular-nums"
      >
        {String(displayPct).padStart(3, '0')}
      </span>
    </div>
  )
}
