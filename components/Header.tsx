const NAV_LINKS = [
  { href: '#pain', label: 'О задачах' },
  { href: '#services', label: 'Услуги' },
  { href: '#cases', label: 'Кейсы' },
  { href: '#process', label: 'Процесс' },
  { href: '#testimonials', label: 'Отзывы' },
  { href: '#faq', label: 'Вопросы' },
  { href: '#contact', label: 'Контакты' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg-base/80 backdrop-blur">
      <nav
        aria-label="Основная навигация"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <a
          href="#hero"
          className="font-heading text-lg font-bold text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
        >
          BF GROUP
        </a>
        <ul className="hidden gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
