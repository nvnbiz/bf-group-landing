// components/sections/Hero.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders the result-first headline', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1, name: /Заявки, а не просто/i })).toBeInTheDocument()
  })

  it('links the primary CTA to the contact section', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: 'Обсудить проект' })).toHaveAttribute('href', '#contact')
  })

  it('links the secondary CTA to the case studies section', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: 'Смотреть кейсы' })).toHaveAttribute('href', '#cases')
  })
})
