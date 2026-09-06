import raw from './data.jsonl?raw'
import type {
  Certificate,
  Contact,
  Entry,
  EntryType,
  LabEntry,
  NowItem,
  Profile,
  Project,
} from './types'

/**
 * Разбирает JSONL: одна непустая строка — один объект.
 * Строки, начинающиеся с "//", считаются комментариями.
 */
function parse(source: string): Entry[] {
  const entries: Entry[] = []

  source.split('\n').forEach((line, index) => {
    const trimmed = line.trim()
    if (trimmed === '' || trimmed.startsWith('//')) return

    let value: unknown
    try {
      value = JSON.parse(trimmed)
    } catch {
      throw new Error(`data.jsonl:${index + 1} — строка не является корректным JSON`)
    }

    if (typeof value !== 'object' || value === null || !('type' in value)) {
      throw new Error(`data.jsonl:${index + 1} — у записи отсутствует поле "type"`)
    }

    entries.push(value as Entry)
  })

  return entries
}

const entries = parse(raw)

function collect<T extends Entry>(type: EntryType): T[] {
  return entries.filter((entry): entry is T => entry.type === type)
}

function requireOne<T extends Entry>(type: EntryType): T {
  const found = collect<T>(type)
  if (found.length !== 1) {
    throw new Error(
      `data.jsonl — ожидалась ровно одна запись type:"${type}", найдено ${found.length}`,
    )
  }
  return found[0]
}

export const profile = requireOne<Profile>('profile')
export const contact = requireOne<Contact>('contact')
export const nowItems = collect<NowItem>('now')
export const projects = collect<Project>('project')
export const labEntries = collect<LabEntry>('lab')
export const certificates = collect<Certificate>('cert')

export type TerminalSegment = {
  text: string
  kind: 'prompt' | 'output'
  /** Смещение сегмента в общем потоке символов — по нему режется эффект печати. */
  start: number
}

/** Разворачивает profile.terminal в поток сегментов с посчитанными смещениями. */
export function terminalSegments(p: Profile): TerminalSegment[] {
  const parts: { text: string; kind: 'prompt' | 'output' }[] = []

  p.terminal.forEach((block, i) => {
    if (i > 0) parts.push({ text: '\n\n', kind: 'output' })
    parts.push({ text: `${p.prompt} ${block.cmd}`, kind: 'prompt' })
    if (block.output.length > 0) {
      parts.push({ text: `\n\n${block.output.join('\n')}`, kind: 'output' })
    }
  })

  let offset = 0
  return parts.map((part) => {
    const segment = { ...part, start: offset }
    offset += part.text.length
    return segment
  })
}
