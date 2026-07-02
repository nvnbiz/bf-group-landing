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

  it('renders steps as direct <li> children of the <ol>', () => {
    const { container } = render(<Process />)
    const ol = container.querySelector('ol')
    expect(ol).not.toBeNull()
    const directLiChildren = Array.from(ol!.children).filter((el) => el.tagName === 'LI')
    expect(directLiChildren).toHaveLength(4)
  })
})
