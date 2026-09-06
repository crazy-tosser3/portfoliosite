import type { LabEntry } from '../data/types'

export function Lab({ entries }: { entries: LabEntry[] }) {
  return (
    <section id="lab">
      <h2>LAB</h2>

      {entries.map((entry) => (
        <article className="entry" key={entry.title}>
          <div className="entry-head">
            <b>{entry.title}</b>
            {entry.date && <span className="entry-date">{entry.date}</span>}
          </div>
          <p className="muted">{entry.desc}</p>
        </article>
      ))}
    </section>
  )
}
