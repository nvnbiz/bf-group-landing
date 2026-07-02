// data/content.test.ts
import { describe, it, expect } from 'vitest'
import {
  painPoints, services, caseStudies, processSteps, testimonials, guarantees, faqItems, pricingTiers,
} from './content'

describe('placeholder content', () => {
  it('has at least 2 pain points', () => {
    expect(painPoints.length).toBeGreaterThanOrEqual(2)
  })

  it('has exactly 3 services matching the spec categories', () => {
    expect(services.map((service) => service.id)).toEqual(['sites', 'apps', 'ai'])
  })

  it('has at least one case study per service category', () => {
    const categories = caseStudies.map((caseStudy) => caseStudy.category)
    expect(categories).toContain('sites')
    expect(categories).toContain('apps')
    expect(categories).toContain('ai')
  })

  it('marks the AI case study as a demo', () => {
    const aiCase = caseStudies.find((caseStudy) => caseStudy.category === 'ai')
    expect(aiCase?.isDemo).toBe(true)
  })

  it('has exactly 4 process steps in order', () => {
    expect(processSteps.map((step) => step.step)).toEqual([1, 2, 3, 4])
  })

  it('has at least 2 testimonials, 3 guarantees, 4 FAQ items and 3 pricing tiers', () => {
    expect(testimonials.length).toBeGreaterThanOrEqual(2)
    expect(guarantees.length).toBeGreaterThanOrEqual(3)
    expect(faqItems.length).toBeGreaterThanOrEqual(4)
    expect(pricingTiers.length).toBe(3)
  })
})
