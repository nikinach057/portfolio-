import { Suspense, lazy, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/useMediaQuery'

/**
 * Lazy-loaded hero 3D content — keeps initial JS bundle lighter.
 * Canvas mounts only after Preloader finishes (controlled by parent).
 */
const HeroSceneContent = lazy(() =>
  import('./HeroScene').then((m) => ({ default: m.HeroScene })),
)

type SceneProps = {
  /** Extra R3F children if needed later */
  children?: ReactNode
  className?: string
  /** When false, skip Canvas entirely (mobile / reduced motion fallbacks) */
  enabled?: boolean
}

/**
 * Scene — shared R3F Canvas wrapper.
 * dpr capped at 1.5 for mid-range laptop 60fps.
 * frameloop "always" only while hero is visible; parent can unmount to pause.
 */
export function Scene({ children, className = '', enabled = true }: SceneProps) {
  const isMobile = useIsMobile()
  const reduced = usePrefersReducedMotion()
  const active = enabled && !isMobile && !reduced

  if (!active) {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden bg-black ${className}`}
        aria-hidden
      >
        {/* Mobile fallback — static Mengin-like glow + horizon (no WebGL) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(180,180,185,0.45)_0%,rgba(40,40,45,0.35)_35%,#000_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[38%] bg-black [clip-path:ellipse(85%_100%_at_50%_100%)]" />
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg_viewBox=%270_0_256_256%27_xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter_id=%27n%27%3E%3CfeTurbulence_type=%27fractalNoise%27_baseFrequency=%270.9%27_numOctaves=%274%27_stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect_width=%27100%25%27_height=%27100%25%27_filter=%27url(%23n)%27/%3E%3C/svg%3E')]" />
      </div>
    )
  }

  return (
    <div className={`absolute inset-0 bg-black ${className}`}>
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            antialias: false,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          camera={{ position: [0, 0, 1], fov: 50 }}
          style={{ background: '#000' }}
        >
          {children ?? <HeroSceneContent />}
        </Canvas>
      </Suspense>
    </div>
  )
}
