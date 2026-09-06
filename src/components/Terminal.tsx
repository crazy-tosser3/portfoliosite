import { useEffect, useMemo, useState } from 'react'
import { terminalSegments } from '../data'
import type { Profile } from '../data/types'

const SPEED_MS = 18

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}

export function Terminal({ profile }: { profile: Profile }) {
  const segments = useMemo(() => terminalSegments(profile), [profile])

  const total = useMemo(
    () => segments.reduce((sum, segment) => sum + segment.text.length, 0),
    [segments],
  )

  const reduced = usePrefersReducedMotion()
  const [typed, setTyped] = useState(0)

  const visible = reduced ? total : Math.min(typed, total)
  const done = visible >= total

  useEffect(() => {
    if (reduced) return

    const id = window.setInterval(() => {
      setTyped((prev) => {
        if (prev >= total) {
          window.clearInterval(id)
          return prev
        }
        return prev + 1
      })
    }, SPEED_MS)

    return () => window.clearInterval(id)
  }, [total, reduced])

  return (
    <div className="terminal">
      <div className="terminal-header">
        {/* Все три точки зелёные — так задумано. */}
        <span className="tdot" />
        <span className="tdot" />
        <span className="tdot" />
        <span className="terminal-title">crzto3@portfolio</span>
      </div>

      <div className="terminal-content" aria-label="Терминал с представлением автора">
        {segments.map((segment, i) => {
          const slice = segment.text.slice(0, Math.max(0, visible - segment.start))
          if (slice === '') return null
          return (
            <span
              key={i}
              className={segment.kind === 'prompt' ? 'term-prompt' : undefined}
            >
              {slice}
            </span>
          )
        })}
        <span className={done ? 'caret caret-idle' : 'caret'} aria-hidden="true" />
      </div>
    </div>
  )
}
