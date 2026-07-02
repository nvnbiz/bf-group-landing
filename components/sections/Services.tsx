import { services } from '@/data/content'
import { FadeIn } from '@/components/motion/FadeIn'

export function Services() {
  return (
    <section id="services" className="bg-bg-base px-6 py-20">
      <h2 className="text-center font-heading text-3xl font-bold text-text-primary">Что делаем</h2>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {services.map((service, index) => (
          <FadeIn key={service.id} delay={index * 0.1} className="rounded-2xl bg-bg-card p-6">
            <h3 className="font-heading text-xl font-semibold text-text-primary">{service.title}</h3>
            <p className="mt-3 font-body text-text-secondary">{service.description}</p>
            <a
              href={service.ctaHref}
              className="mt-4 inline-block font-body text-accent-cyan hover:text-accent-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
            >
              Узнать подробнее →
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
