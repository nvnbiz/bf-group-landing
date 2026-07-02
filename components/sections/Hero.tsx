export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-bg-base px-6 py-24 text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,theme(colors.accent.violet/30%),transparent_60%)] motion-safe:animate-pulse motion-reduce:animate-none"
      />
      <h1 className="font-heading text-4xl font-bold text-text-primary md:text-6xl">
        Заявки, а не просто красивый сайт: делаю сайты, приложения и ИИ-агентов, которые работают на результат
      </h1>
      <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-text-secondary">
        Для экспертов и бизнеса, которым нужен результат, а не процесс — BF GROUP
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a
          href="#contact"
          className="rounded-full bg-accent-blue px-8 py-3 font-body font-semibold text-text-primary hover:bg-accent-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
        >
          Обсудить проект
        </a>
        <a
          href="#cases"
          className="rounded-full border border-white/20 px-8 py-3 font-body text-text-primary hover:border-accent-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
        >
          Смотреть кейсы
        </a>
      </div>
    </section>
  )
}
