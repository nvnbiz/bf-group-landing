import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GuaranteesFaq } from './GuaranteesFaq'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
}))

describe('GuaranteesFaq', () => {
  it('renders all guarantees', () => {
    render(<GuaranteesFaq />)
    expect(
      screen.getByText('Работаю по договору — фиксируем объём, сроки и стоимость на берегу')
    ).toBeInTheDocument()
  })

  it('renders every FAQ question as a disclosure', () => {
    render(<GuaranteesFaq />)
    expect(screen.getByText('Работаете по договору?')).toBeInTheDocument()
    expect(screen.getByText('Какие сроки?')).toBeInTheDocument()
  })

  it('renders pricing tiers for all 3 services', () => {
    render(<GuaranteesFaq />)
    expect(screen.getByText('Сайты и лендинги')).toBeInTheDocument()
    expect(screen.getByText('Приложения')).toBeInTheDocument()
    expect(screen.getByText('ИИ-агенты')).toBeInTheDocument()
  })
})
