// components/Header.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from './Header'

describe('Header', () => {
  it('renders the BF GROUP logo link to the hero section', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: 'BF GROUP' })).toHaveAttribute('href', '#hero')
  })

  it('renders a navigation landmark with links to every section', () => {
    render(<Header />)
    const nav = screen.getByRole('navigation', { name: 'Основная навигация' })
    expect(nav).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Контакты' })).toHaveAttribute('href', '#contact')
  })

  it('renders a mobile menu button collapsed by default', () => {
    render(<Header />)
    const button = screen.getByRole('button', { name: 'Открыть меню' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('reveals the 7 nav links in the mobile menu when the button is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)

    // Only the desktop nav's "Вопросы" link exists before the mobile menu opens.
    expect(screen.getAllByRole('link', { name: 'Вопросы' })).toHaveLength(1)

    const button = screen.getByRole('button', { name: 'Открыть меню' })
    await user.click(button)

    expect(screen.getByRole('button', { name: 'Закрыть меню' })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
    // After opening, the mobile menu adds a second copy of each link.
    expect(screen.getAllByRole('link', { name: 'Вопросы' })).toHaveLength(2)
    expect(screen.getAllByRole('link', { name: 'Контакты' })).toHaveLength(2)
  })

  it('closes the mobile menu when a nav link is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)

    await user.click(screen.getByRole('button', { name: 'Открыть меню' }))
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')

    const contactLinks = screen.getAllByRole('link', { name: 'Контакты' })
    // The mobile menu's copy of the link is rendered last in the DOM.
    await user.click(contactLinks[contactLinks.length - 1])

    expect(screen.getByRole('button', { name: 'Открыть меню' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
    expect(screen.getAllByRole('link', { name: 'Контакты' })).toHaveLength(1)
  })
})
