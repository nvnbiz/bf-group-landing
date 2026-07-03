import { describe, it, expect } from 'vitest'
import tailwindConfig from '../tailwind.config'

describe('BF GROUP tailwind theme', () => {
  const extend = tailwindConfig.theme?.extend as {
    colors: Record<string, Record<string, string>>
    fontFamily: Record<string, string[]>
  }

  it('defines the BF GROUP background colors', () => {
    expect(extend.colors.bg.base).toBe('#170B2E')
    expect(extend.colors.bg.card).toBe('#22123F')
  })

  it('defines the BF GROUP accent colors', () => {
    expect(extend.colors.accent.blue).toBe('#6839D6')
    expect(extend.colors.accent.cyan).toBe('#4FC3F7')
    expect(extend.colors.accent.violet).toBe('#9D7BFF')
  })

  it('defines the BF GROUP text colors', () => {
    expect(extend.colors.text.primary).toBe('#F5F3FF')
    expect(extend.colors.text.secondary).toBe('#B9AEDB')
  })

  it('defines heading/body/mono font families referencing CSS variables', () => {
    expect(extend.fontFamily.heading).toEqual(['var(--font-heading)'])
    expect(extend.fontFamily.body).toEqual(['var(--font-body)'])
    expect(extend.fontFamily.mono).toEqual(['var(--font-mono)'])
  })
})
