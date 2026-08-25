import { useEffect, useRef, useState } from 'react'
import { siteContent } from '@/data/content'
import { TypedName } from '@/components/ui/TypedName'

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <footer
      ref={ref}
      className="border-t border-[var(--color-border)] px-6 py-10 md:px-12"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-display text-xs tracking-[0.2em] uppercase">
          <TypedName
            text={siteContent.brand}
            play={play}
            delayMs={80}
            charMs={70}
            className="tracking-[0.2em]"
          />
        </p>
        <p className="text-xs text-[var(--color-muted)]">
          © 2025{' '}
          <TypedName
            text="Nachappa PP"
            play={play}
            delayMs={400}
            charMs={70}
            showCursor={false}
          />
          . All rights reserved.
        </p>
      </div>
    </footer>
  )
}
