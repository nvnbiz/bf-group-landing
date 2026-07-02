// tests/accessibility.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Home from '@/app/page'

expect.extend(toHaveNoViolations)

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
}))
vi.mock('@/components/ScrollEffects', () => ({
  ScrollEffects: () => null,
}))

describe('Home page accessibility', () => {
  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(<Home />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 15000)
})
