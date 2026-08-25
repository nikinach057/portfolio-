import { useEffect, useState } from 'react'

type TypedNameProps = {
  text?: string
  /** Start typing when true */
  play?: boolean
  /** Delay before first character (ms) */
  delayMs?: number
  /** Ms per character — tweak for speed */
  charMs?: number
  className?: string
  /** Show blinking caret while typing / briefly after */
  showCursor?: boolean
}

/**
 * TypedName — types the name in place, accent (Capabilities) color.
 * Inherits surrounding font/size via className / parent styles.
 */
export function TypedName({
  text = 'Nachappa PP',
  play = true,
  delayMs = 200,
  charMs = 85,
  className = '',
  showCursor = true,
}: TypedNameProps) {
  const [shown, setShown] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!play) {
      setShown('')
      setDone(false)
      return
    }

    let i = 0
    let intervalId = 0
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i += 1
        setShown(text.slice(0, i))
        if (i >= text.length) {
          window.clearInterval(intervalId)
          setDone(true)
        }
      }, charMs)
    }, delayMs)

    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }
  }, [play, text, delayMs, charMs])

  return (
    <span
      className={`text-[var(--color-accent)] ${className}`}
      aria-label={text}
    >
      {shown}
      {showCursor && (!done || shown.length > 0) && (
        <span
          className={`ml-0.5 inline-block w-[0.08em] translate-y-[0.05em] bg-[var(--color-accent)] align-baseline ${
            done ? 'animate-pulse opacity-0' : 'animate-pulse'
          }`}
          style={{ height: '0.9em' }}
          aria-hidden
        />
      )}
    </span>
  )
}
