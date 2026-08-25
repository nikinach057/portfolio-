import { useRef, type ReactNode, type MouseEvent, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react'
import gsap from 'gsap'

type MagneticProps = {
  children: ReactNode
  className?: string
  /** Max pull in px — lower = subtler. Default 12 */
  strength?: number
} & (
  | ({ as?: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: 'a' } & AnchorHTMLAttributes<HTMLAnchorElement>)
)

/**
 * MagneticButton — eases toward the cursor on hover (power3.out).
 * strength: try 8–18 depending on button size.
 */
export function MagneticButton({
  children,
  className = '',
  strength = 12,
  as = 'button',
  ...rest
}: MagneticProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, {
      x: (x / rect.width) * strength,
      y: (y / rect.height) * strength,
      duration: 0.45,
      ease: 'power3.out',
    })
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.4)' })
  }

  const shared = {
    ref: ref as never,
    className: `inline-flex items-center justify-center will-change-transform ${className}`,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    'data-cursor': 'link' as const,
  }

  if (as === 'a') {
    return (
      <a {...shared} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      {...shared}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
