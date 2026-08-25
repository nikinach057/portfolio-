import { useEffect, useState } from 'react'

/**
 * useMediaQuery — reactive matchMedia hook.
 * Used to disable heavy 3D on coarse pointers / narrow viewports.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setMatches(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** Treat tablets/phones as "reduced 3D" targets */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px), (pointer: coarse)')
}

/** Prefer reduced motion — skip elaborate timelines */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
