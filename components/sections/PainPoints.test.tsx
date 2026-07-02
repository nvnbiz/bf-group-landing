import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PainPoints } from './PainPoints'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
}))

describe('PainPoints', () => {
  it('renders every pain point from the content data', () => {
    render(<PainPoints />)
    expect(screen.getByText('Сайт есть, а заявок нет')).toBeInTheDocument()
    expect(screen.getByText(/автоматизировать общение/)).toBeInTheDocument()
  })

  it('renders the BF GROUP positioning statement', () => {
    render(<PainPoints />)
    expect(screen.getByText(/BF GROUP — это команда/)).toBeInTheDocument()
  })
})
