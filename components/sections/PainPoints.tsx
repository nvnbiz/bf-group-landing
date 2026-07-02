import { painPoints } from '@/data/content'
import { FadeIn } from '@/components/motion/FadeIn'

export function PainPoints() {
  return (
    <section id="pain" className="bg-bg-base px-6 py-20">
      <FadeIn className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-3xl font-bold text-text-primary">Знакомая ситуация?</h2>
        <ul className="mt-8 space-y-4 text-left">
          {painPoints.map((point) => (
            <li key={point.text} className="rounded-lg bg-bg-card p-4 font-body text-text-secondary">
              {point.text}
            </li>
          ))}
        </ul>
        <p className="mt-8 font-body text-text-primary">
          BF GROUP — это команда, которая берёт на себя всё: от идеи до запуска сайта, приложения или ИИ-агента.
        </p>
      </FadeIn>
    </section>
  )
}
