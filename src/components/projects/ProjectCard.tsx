import { useRef, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import type { Project } from '@/data/content'

type ProjectCardProps = {
  project: Project
  index: number
  onOpen: (project: Project) => void
}

/**
 * ProjectCard — 3D tilt on pointer move + clip-path image reveal on hover.
 * maxTilt: 8° — keep subtle for premium feel.
 */
export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotY = (px - 0.5) * 14 // degrees
    const rotX = (0.5 - py) * 10
    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      transformPerspective: 900,
      duration: 0.45,
      ease: 'power3.out',
    })
  }

  const onEnter = () => {
    if (!mediaRef.current) return
    gsap.to(mediaRef.current, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.7,
      ease: 'power3.out',
    })
  }

  const onLeave = () => {
    const card = cardRef.current
    if (card) {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: 'power3.out',
      })
    }
    if (mediaRef.current) {
      gsap.to(mediaRef.current, {
        clipPath: 'inset(8% 8% 8% 8%)',
        duration: 0.6,
        ease: 'power3.out',
      })
    }
  }

  return (
    <motion.button
      ref={cardRef}
      type="button"
      layoutId={`project-${project.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpen(project)}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative flex flex-col overflow-hidden border border-[var(--color-border)] bg-[var(--color-ink)] text-left will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
      data-cursor="view"
      data-cursor-label="View"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface)]">
        <div
          ref={mediaRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            clipPath: 'inset(8% 8% 8% 8%)',
            background: `linear-gradient(145deg, ${project.accent}33, #121216 60%)`,
          }}
        >
          <span
            className="font-display text-5xl font-bold opacity-30"
            style={{ color: project.accent }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-display text-lg font-semibold text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-[var(--color-muted)]">
          {project.summary}
        </p>
        <p className="mt-4 text-[11px] tracking-[0.12em] text-[var(--color-muted)] uppercase">
          {project.stack.join(' · ')}
        </p>
      </div>
    </motion.button>
  )
}
