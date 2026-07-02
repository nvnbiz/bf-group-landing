import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CaseStudies } from './CaseStudies'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
}))

describe('CaseStudies', () => {
  it('renders a card for every case study', () => {
    render(<CaseStudies />)
    expect(screen.getAllByRole('link', { name: 'Смотреть проект →' })).toHaveLength(3)
  })

  it('marks the AI case study with a demo badge', () => {
    render(<CaseStudies />)
    expect(screen.getByText('Демо-режим')).toBeInTheDocument()
  })
})
