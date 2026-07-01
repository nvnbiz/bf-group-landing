import { describe, it, expect } from 'vitest'
import tailwindConfig from '../tailwind.config'

describe('BF GROUP tailwind theme', () => {
  const extend = tailwindConfig.theme?.extend as {
    colors: Record<string, Record<string, string>>
    fontFamily: Record<string, string[]>
  }

  it('defines the BF GROUP background colors', () => {
    expect(extend.colors.bg.base).toBe('#0A0E1A')
    expect(extend.colors.bg.card).toBe('#0F1428')
  })

  it('defines the BF GROUP accent colors', () => {
    expect(extend.colors.accent.blue).toBe('#2952E3')
    expect(extend.colors.accent.cyan).toBe('#4FC3F7')
    expect(extend.colors.accent.violet).toBe('#8B5CF6')
  })

  it('defines the BF GROUP text colors', () => {
    expect(extend.colors.text.primary).toBe('#FFFFFF')
    expect(extend.colors.text.secondary).toBe('#B4B9C9')
  })

  it('defines heading/body/mono font families referencing CSS variables', () => {
    expect(extend.fontFamily.heading).toEqual(['var(--font-sans)'])
    expect(extend.fontFamily.body).toEqual(['var(--font-sans)'])
    expect(extend.fontFamily.mono).toEqual(['var(--font-mono)'])
  })
})
