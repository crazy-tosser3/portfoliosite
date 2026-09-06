import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Lab } from './components/Lab'
import { Certificates } from './components/Certificates'
import { Contact } from './components/Contact'
import {
  certificates,
  contact,
  labEntries,
  nowItems,
  profile,
  projects,
} from './data'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero profile={profile} now={nowItems} />
        <Projects projects={projects} />
        <Lab entries={labEntries} />
        <Certificates certificates={certificates} />
        <Contact contact={contact} />
      </main>
    </>
  )
}
