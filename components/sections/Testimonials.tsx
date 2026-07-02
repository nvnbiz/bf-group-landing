import { testimonials } from '@/data/content'
import { FadeIn } from '@/components/motion/FadeIn'

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-bg-base px-6 py-20">
      <h2 className="text-center font-heading text-3xl font-bold text-text-primary">Что говорят клиенты</h2>
      <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <FadeIn key={`${testimonial.name}-${index}`} delay={index * 0.1} className="rounded-2xl bg-bg-card p-6">
            <p className="font-body italic text-text-secondary">&ldquo;{testimonial.text}&rdquo;</p>
            <p className="mt-4 font-body font-semibold text-text-primary">{testimonial.name}</p>
            <p className="font-mono text-sm text-accent-cyan">{testimonial.company}</p>
          </FadeIn>
        ))}
      </div>
      <FadeIn className="mx-auto mt-12 max-w-3xl rounded-2xl bg-bg-card p-6 text-center">
        <h3 className="font-heading text-xl font-semibold text-text-primary">Почему BF GROUP, а не агентство</h3>
        <p className="mt-3 font-body text-text-secondary">
          Личное участие на всех этапах, экспертиза именно в ИИ-инструментах, скорость принятия решений без
          согласований внутри команды.
        </p>
      </FadeIn>
    </section>
  )
}
