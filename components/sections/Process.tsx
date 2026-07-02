import { processSteps } from '@/data/content'
import { FadeIn } from '@/components/motion/FadeIn'

export function Process() {
  return (
    <section id="process" className="bg-bg-base px-6 py-20">
      <h2 className="text-center font-heading text-3xl font-bold text-text-primary">Как проходит работа</h2>
      <ol className="mx-auto mt-12 max-w-3xl space-y-6">
        {processSteps.map((step) => (
          <FadeIn key={step.step} delay={(step.step - 1) * 0.1}>
            <li className="flex gap-4 rounded-2xl bg-bg-card p-6">
              <span className="font-mono text-2xl font-bold text-accent-cyan">{step.step}</span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-text-primary">{step.title}</h3>
                <p className="mt-1 font-body text-text-secondary">{step.description}</p>
              </div>
            </li>
          </FadeIn>
        ))}
      </ol>
    </section>
  )
}
