import { useEffect, useRef } from 'react'
import type { Project } from '../data/types'

type Props = {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  // <dialog> сам даёт Escape, ловушку фокуса и возврат фокуса на карточку.
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    if (project && !dialog.open) dialog.showModal()
    else if (!project && dialog.open) dialog.close()
  }, [project])

  return (
    <dialog
      className="modal"
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose()
      }}
      aria-labelledby="modal-title"
    >
      {project && (
        <div className="modal-card">
          <button type="button" className="close" onClick={onClose} aria-label="Закрыть">
            ✕
          </button>

          <h2 id="modal-title">{project.title}</h2>
          <p className="modal-desc">{project.desc}</p>

          {project.details?.map((paragraph) => (
            <p className="modal-details" key={paragraph}>
              {paragraph}
            </p>
          ))}

          <ul className="stack">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {(project.repo || project.demo) && (
            <div className="modal-links">
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer">
                  Репозиторий →
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  Демо →
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </dialog>
  )
}
