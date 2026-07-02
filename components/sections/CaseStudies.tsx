import { caseStudies } from '@/data/content'
import { FadeIn } from '@/components/motion/FadeIn'

export function CaseStudies() {
  return (
    <section id="cases" className="bg-bg-base px-6 py-20">
      <h2 className="text-center font-heading text-3xl font-bold text-text-primary">Результаты, а не обещания</h2>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
        {caseStudies.map((caseStudy, index) => (
          <FadeIn key={caseStudy.id} delay={index * 0.1} className="rounded-2xl bg-bg-card p-6">
            {caseStudy.isDemo && (
              <span className="mb-3 inline-block rounded-full bg-accent-violet/20 px-3 py-1 font-mono text-xs text-accent-violet">
                Демо-режим
              </span>
            )}
            <h3 className="font-heading text-xl font-semibold text-text-primary">{caseStudy.title}</h3>
            <p className="mt-3 font-body text-text-secondary"><strong>Проблема:</strong> {caseStudy.problem}</p>
            <p className="mt-2 font-body text-text-secondary"><strong>Решение:</strong> {caseStudy.solution}</p>
            <p className="mt-2 font-mono text-accent-cyan"><strong>Результат:</strong> {caseStudy.result}</p>
            {caseStudy.link.startsWith('[TODO') ? (
              <span className="mt-4 inline-block font-body text-text-secondary">Смотреть проект →</span>
            ) : (
              <a
                href={caseStudy.link}
                className="mt-4 inline-block font-body text-accent-cyan hover:text-accent-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
              >
                Смотреть проект →
              </a>
            )}
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
