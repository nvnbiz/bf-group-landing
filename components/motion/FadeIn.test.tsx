import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FadeIn } from './FadeIn'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: vi.fn(),
}))

import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'

describe('FadeIn', () => {
  it('renders children wrapped in a plain div when the user prefers reduced motion', () => {
    vi.mocked(usePrefersReducedMotion).mockReturnValue(true)
    render(<FadeIn>Контент</FadeIn>)
    expect(screen.getByText('Контент')).toBeInTheDocument()
  })

  it('renders children with animation when motion is not reduced', () => {
    vi.mocked(usePrefersReducedMotion).mockReturnValue(false)
    render(<FadeIn>Контент</FadeIn>)
    expect(screen.getByText('Контент')).toBeInTheDocument()
  })
})
