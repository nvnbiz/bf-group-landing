import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Services } from './Services'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
}))

describe('Services', () => {
  it('renders all 3 service cards with a micro-CTA linking to cases', () => {
    render(<Services />)

    expect(screen.getByRole('heading', { name: 'Сайты и лендинги' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Веб и мобильные приложения' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'ИИ-агенты и автоматизация' })).toBeInTheDocument()

    const ctaLinks = screen.getAllByRole('link', { name: 'Узнать подробнее →' })
    expect(ctaLinks).toHaveLength(3)
    ctaLinks.forEach((link) => expect(link).toHaveAttribute('href', '#cases'))
  })
})
