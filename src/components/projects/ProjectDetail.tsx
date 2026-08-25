import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/data/content'
import { MagneticButton } from '@/components/ui/MagneticButton'

type ProjectDetailProps = {
  project: Project
  onClose: () => void
}

/**
 * ProjectDetail — shared-element style overlay (layoutId) with clip wipe.
 * Not a hard page reload — AnimatePresence handles enter/exit.
 */
export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-end justify-center md:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <button
        type="button"
        aria-label="Close project"
        className="absolute inset-0 bg-[rgba(8,8,10,0.72)] backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.article
        layoutId={`project-${project.id}`}
        className="relative z-10 max-h-[90dvh] w-full max-w-3xl overflow-y-auto border border-[var(--color-border)] bg-[var(--color-ink)]"
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={{ clipPath: 'inset(0% 0 0 0)' }}
        exit={{ clipPath: 'inset(100% 0 0 0)' }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className="relative flex h-48 items-end p-8 md:h-56"
          style={{
            background: `linear-gradient(145deg, ${project.accent}44, #0e0e11 70%)`,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase transition-colors hover:text-[var(--color-text)]"
            data-cursor="link"
          >
            Close
          </button>
          <h2 className="font-display text-3xl font-bold text-[var(--color-text)] md:text-4xl">
            {project.title}
          </h2>
        </div>

        <div className="space-y-6 p-8">
          <p className="text-[11px] tracking-[0.2em] text-[var(--color-accent)] uppercase">
            {project.stack.join(' · ')}
          </p>
          <p className="text-base leading-relaxed text-[var(--color-muted)]">
            {project.description}
          </p>
          <MagneticButton
            type="button"
            onClick={onClose}
            className="border border-[var(--color-border)] px-6 py-3 text-xs tracking-[0.2em] text-[var(--color-text)] uppercase transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Back to work
          </MagneticButton>
        </div>
      </motion.article>
    </motion.div>
  )
}
