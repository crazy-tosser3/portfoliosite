import type { Contact as ContactData } from '../data/types'

function isExternal(href: string) {
  return href.startsWith('http')
}

export function Contact({ contact }: { contact: ContactData }) {
  return (
    <section id="contact">
      <h2 className="contact-title">
        {contact.heading.map((line, i) => (
          <span key={line}>
            {line}
            {i < contact.heading.length - 1 && <br />}
          </span>
        ))}
      </h2>

      <p className="availability">
        <span className="status-dot" aria-hidden="true" />
        {contact.availability}
      </p>

      <p className="contact-text">{contact.text}</p>

      <nav className="contact-links" aria-label="Контакты">
        {contact.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            {...(isExternal(link.href)
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </section>
  )
}
