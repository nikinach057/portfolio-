import { useEffect, useRef } from 'react'

export type MousePosition = {
  x: number
  y: number
  /** Normalized -1..1 relative to viewport center */
  nx: number
  ny: number
}

/**
 * useMousePosition — tracks pointer with optional lerp damping.
 * 3D scenes read the ref each frame so React doesn't re-render on every move.
 *
 * @param lerp - 0..1 smoothing factor (lower = more lag / more premium feel). Default 0.08
 */
export function useMousePosition(lerp = 0.08) {
  const target = useRef<MousePosition>({ x: 0, y: 0, nx: 0, ny: 0 })
  const current = useRef<MousePosition>({ x: 0, y: 0, nx: 0, ny: 0 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      target.current = {
        x: e.clientX,
        y: e.clientY,
        nx: (e.clientX / w) * 2 - 1,
        ny: -((e.clientY / h) * 2 - 1),
      }
    }

    const tick = () => {
      const t = target.current
      const c = current.current
      // Exponential lerp — never 1:1 snappy
      c.x += (t.x - c.x) * lerp
      c.y += (t.y - c.y) * lerp
      c.nx += (t.nx - c.nx) * lerp
      c.ny += (t.ny - c.ny) * lerp
      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [lerp])

  return current
}
