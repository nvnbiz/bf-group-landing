// components/ScrollEffects.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { ScrollEffects } from './ScrollEffects'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: vi.fn(),
}))
vi.mock('lenis', () => ({
  default: vi.fn().mockImplementation(() => ({
    raf: vi.fn(),
    on: vi.fn(),
    destroy: vi.fn(),
  })),
}))
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    to: vi.fn().mockReturnValue({ kill: vi.fn(), scrollTrigger: { kill: vi.fn() } }),
    from: vi.fn().mockReturnValue({ kill: vi.fn(), scrollTrigger: { kill: vi.fn() } }),
  },
}))
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { update: vi.fn() },
}))

import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import gsap from 'gsap'
import Lenis from 'lenis'

describe('ScrollEffects', () => {
  it('does not initialize Lenis or GSAP scroll triggers when the user prefers reduced motion', () => {
    vi.mocked(usePrefersReducedMotion).mockReturnValue(true)
    render(<ScrollEffects />)
    expect(Lenis).not.toHaveBeenCalled()
    expect(gsap.to).not.toHaveBeenCalled()
  })

  it('initializes Lenis and GSAP scroll triggers when motion is allowed', () => {
    vi.mocked(usePrefersReducedMotion).mockReturnValue(false)
    render(<ScrollEffects />)
    expect(Lenis).toHaveBeenCalled()
    expect(gsap.to).toHaveBeenCalled()
    expect(gsap.from).toHaveBeenCalled()
  })

  it('cancels the requestAnimationFrame loop on unmount when motion is allowed', () => {
    vi.mocked(usePrefersReducedMotion).mockReturnValue(false)
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(123)
    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})

    const { unmount } = render(<ScrollEffects />)
    unmount()

    expect(cancelSpy).toHaveBeenCalled()

    rafSpy.mockRestore()
    cancelSpy.mockRestore()
  })
})
