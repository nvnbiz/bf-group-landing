// components/Header.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
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
})
