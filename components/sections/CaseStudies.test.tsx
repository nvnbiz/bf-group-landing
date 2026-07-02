import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CaseStudies } from './CaseStudies'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
}))

vi.mock('@/data/content', () => ({
  caseStudies: [
    {
      id: 'case-sites-1',
      category: 'sites',
      title: '[TODO: название проекта]',
      problem: '[TODO: описание проблемы клиента]',
      solution: '[TODO: что было сделано]',
      result: '[TODO: рост заявок на +X% за N недель]',
      link: '[TODO: ссылка на проект]',
    },
    {
      id: 'case-apps-1',
      category: 'apps',
      title: 'Реальный проект',
      problem: 'Проблема',
      solution: 'Решение',
      result: 'Результат',
      link: 'https://example.com/case',
    },
    {
      id: 'case-ai-1',
      category: 'ai',
      title: '[TODO: название проекта]',
      problem: '[TODO: описание проблемы клиента]',
      solution: '[TODO: что было сделано]',
      result: '[TODO: результат в цифрах]',
      link: '[TODO: ссылка на проект]',
      isDemo: true,
    },
  ],
}))

describe('CaseStudies', () => {
  it('renders a card for every case study', () => {
    render(<CaseStudies />)
    expect(screen.getAllByText('Смотреть проект →')).toHaveLength(3)
  })

  it('marks the AI case study with a demo badge', () => {
    render(<CaseStudies />)
    expect(screen.getByText('Демо-режим')).toBeInTheDocument()
  })

  it('renders the CTA as non-clickable text when the link is still a TODO placeholder', () => {
    render(<CaseStudies />)
    // Only 1 of the 3 mocked case studies has a real link, so only 1 anchor should exist.
    expect(screen.getAllByRole('link', { name: 'Смотреть проект →' })).toHaveLength(1)
    const ctas = screen.getAllByText('Смотреть проект →')
    const spanCtas = ctas.filter((el) => el.tagName === 'SPAN')
    expect(spanCtas).toHaveLength(2)
  })

  it('renders the CTA as a real link when the case study has a real URL', () => {
    render(<CaseStudies />)
    const link = screen.getByRole('link', { name: 'Смотреть проект →' })
    expect(link).toHaveAttribute('href', 'https://example.com/case')
  })
})
