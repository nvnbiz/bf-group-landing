import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Process } from './Process'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
}))

describe('Process', () => {
  it('renders all 4 steps in order', () => {
    render(<Process />)
    const headings = screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent)
    expect(headings).toEqual([
      'Заявка и знакомство',
      'Бриф и оценка',
      'Разработка с промежуточными демо',
      'Запуск и поддержка',
    ])
  })
})
