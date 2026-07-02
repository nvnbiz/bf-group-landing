// app/page.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './page'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
}))
vi.mock('@/components/ScrollEffects', () => ({
  ScrollEffects: () => null,
}))

describe('Home page composition', () => {
  it('renders all 8 sections in the spec order', () => {
    render(<Home />)

    const sectionIds = Array.from(document.querySelectorAll('section')).map((section) => section.id)
    expect(sectionIds).toEqual(['hero', 'pain', 'services', 'cases', 'process', 'testimonials', 'faq', 'contact'])

    const headings = screen.getAllByRole('heading', { level: 1 }).concat(screen.getAllByRole('heading', { level: 2 }))
    expect(headings.length).toBeGreaterThanOrEqual(8)
  })
})
