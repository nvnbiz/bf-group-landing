import { guarantees, faqItems, pricingTiers } from '@/data/content'
import { FadeIn } from '@/components/motion/FadeIn'

export function GuaranteesFaq() {
  return (
    <section id="faq" className="bg-bg-base px-6 py-20">
      <h2 className="text-center font-heading text-3xl font-bold text-text-primary">
        Вопросы, которые обычно задают
      </h2>

      <FadeIn className="mx-auto mt-10 max-w-3xl rounded-2xl bg-bg-card p-6">
        <h3 className="font-heading text-lg font-semibold text-text-primary">Гарантии</h3>
        <ul className="mt-4 space-y-2 font-body text-text-secondary">
          {guarantees.map((guarantee) => (
            <li key={guarantee}>{guarantee}</li>
          ))}
        </ul>
      </FadeIn>

      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {faqItems.map((item) => (
          <details key={item.question} className="rounded-2xl bg-bg-card p-6">
            <summary className="cursor-pointer font-body font-semibold text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan">
              {item.question}
            </summary>
            <p className="mt-3 font-body text-text-secondary">{item.answer}</p>
          </details>
        ))}
      </div>

      <FadeIn className="mx-auto mt-10 max-w-3xl rounded-2xl bg-bg-card p-6">
        <h3 className="font-heading text-lg font-semibold text-text-primary">Ориентировочная стоимость</h3>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <li key={tier.title} className="font-body text-text-secondary">
              <p className="font-semibold text-text-primary">{tier.title}</p>
              <p className="font-mono text-accent-cyan">{tier.priceFrom}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-body text-sm text-text-secondary">Точная стоимость — после брифа.</p>
      </FadeIn>
    </section>
  )
}
