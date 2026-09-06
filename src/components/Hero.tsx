import { Terminal } from './Terminal'
import type { NowItem, Profile } from '../data/types'

export function Hero({ profile, now }: { profile: Profile; now: NowItem[] }) {
  return (
    <section className="hero">
      <div>
        <h1>{profile.name}</h1>
        <p className="subtitle">{profile.subtitle}</p>
        <Terminal profile={profile} />
      </div>

      <aside className="now-panel">
        <h2>CURRENTLY</h2>
        <dl>
          {now.map((item) => (
            <div className="now-item" key={`${item.label}-${item.value}`}>
              <dt className="now-label">{item.label}</dt>
              <dd className="now-value">{item.value}</dd>
            </div>
          ))}
        </dl>
        <p className="updated">Updated: {profile.updated}</p>
      </aside>
    </section>
  )
}
