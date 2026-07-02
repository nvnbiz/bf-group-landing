'use client'

import { useState } from 'react'

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
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg-base/80 backdrop-blur">
      <nav
        aria-label="Основная навигация"
        className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
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
        <button
          type="button"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan md:hidden"
        >
          <span
            className={`block h-0.5 w-6 bg-text-primary transition-transform ${
              isOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-text-primary transition-opacity ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-text-primary transition-transform ${
              isOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
        {isOpen && (
          <ul className="absolute inset-x-0 top-full flex flex-col gap-4 border-t border-white/10 bg-bg-base px-6 py-4 md:hidden">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm text-text-secondary hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  )
}
