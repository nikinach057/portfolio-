import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { ProjectDetail } from '@/components/projects/ProjectDetail'
import { projects, type Project } from '@/data/content'

/** Projects — tilt gallery + shared-element detail overlay */
export function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section
      id="projects"
      className="relative px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Featured Projects" eyebrow="Work" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={setActive}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <ProjectDetail project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
