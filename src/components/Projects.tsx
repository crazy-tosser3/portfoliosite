import { useState } from 'react'
import { ProjectModal } from './ProjectModal'
import type { Project } from '../data/types'

export function Projects({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="projects">
      <h2>PROJECTS</h2>

      <div className="card">
        {projects.map((project) => (
          <button
            type="button"
            className="project"
            key={project.title}
            onClick={() => setSelected(project)}
          >
            <span className="project-title">{project.title}</span>
            <span className="project-stack">{project.stack.join(' • ')}</span>
          </button>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
