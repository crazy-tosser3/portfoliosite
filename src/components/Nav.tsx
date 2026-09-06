const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#lab', label: 'Lab' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  return (
    <nav className="site-nav" aria-label="Разделы сайта">
      {links.map((link) => (
        <a href={link.href} key={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
  )
}
