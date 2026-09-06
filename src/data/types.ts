export type TerminalBlock = {
  cmd: string
  output: string[]
}

export type Profile = {
  type: 'profile'
  name: string
  subtitle: string
  prompt: string
  updated: string
  terminal: TerminalBlock[]
}

export type NowItem = {
  type: 'now'
  label: string
  value: string
}

export type Project = {
  type: 'project'
  title: string
  desc: string
  stack: string[]
  details?: string[]
  repo?: string | null
  demo?: string | null
}

export type LabEntry = {
  type: 'lab'
  title: string
  desc: string
  date?: string
}

export type Certificate = {
  type: 'cert'
  title: string
  desc: string
  pdf: string
  preview?: string | null
  repo?: string | null
  date?: string
}

export type ContactLink = {
  label: string
  href: string
}

export type Contact = {
  type: 'contact'
  heading: string[]
  availability: string
  text: string
  links: ContactLink[]
}

export type Entry = Profile | NowItem | Project | LabEntry | Certificate | Contact

export type EntryType = Entry['type']
