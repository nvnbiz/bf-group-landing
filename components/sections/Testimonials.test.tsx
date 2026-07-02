import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Testimonials } from './Testimonials'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
}))

describe('Testimonials', () => {
  it('renders every testimonial', () => {
    render(<Testimonials />)
    expect(screen.getAllByText('[TODO: текст отзыва]', { exact: false }).length).toBeGreaterThanOrEqual(2)
  })

  it('renders the "why BF GROUP" USP block', () => {
    render(<Testimonials />)
    expect(screen.getByRole('heading', { name: 'Почему BF GROUP, а не агентство' })).toBeInTheDocument()
  })
})
