export interface PainPoint {
  text: string
}

export interface Service {
  id: 'sites' | 'apps' | 'ai'
  title: string
  description: string
  ctaHref: string
}

export type CaseCategory = 'sites' | 'apps' | 'ai'

export interface CaseStudy {
  id: string
  category: CaseCategory
  title: string
  problem: string
  solution: string
  result: string
  link: string
  isDemo?: boolean
}

export interface ProcessStep {
  step: number
  title: string
  description: string
}

export interface Testimonial {
  name: string
  company: string
  text: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface PricingTier {
  title: string
  priceFrom: string
}

export const painPoints: PainPoint[] = [
  { text: 'Сайт есть, а заявок нет' },
  { text: 'Хотите автоматизировать общение с клиентами, но не знаете, с чего начать' },
  { text: 'Нужен экспертный подход без цены агентства и долгой переписки с менеджерами' },
]

export const services: Service[] = [
  {
    id: 'sites',
    title: 'Сайты и лендинги',
    description: 'Продающие одностраничники и многостраничные сайты, которые конвертируют посетителей в заявки.',
    ctaHref: '#cases',
  },
  {
    id: 'apps',
    title: 'Веб- и мобильные приложения',
    description: 'От MVP до полноценного продукта — быстро и без лишней бюрократии.',
    ctaHref: '#cases',
  },
  {
    id: 'ai',
    title: 'ИИ-агенты и автоматизация',
    description: 'Помощник, который отвечает клиентам 24/7, обрабатывает заявки и экономит часы ручной работы.',
    ctaHref: '#cases',
  },
]

export const caseStudies: CaseStudy[] = [
  {
    id: 'case-sites-1',
    category: 'sites',
    title: '[TODO: название проекта]',
    problem: '[TODO: описание проблемы клиента]',
    solution: '[TODO: что было сделано]',
    result: '[TODO: рост заявок на +X% за N недель]',
    link: '[TODO: ссылка на проект]',
  },
  {
    id: 'case-apps-1',
    category: 'apps',
    title: '[TODO: название проекта]',
    problem: '[TODO: описание проблемы клиента]',
    solution: '[TODO: что было сделано]',
    result: '[TODO: результат в цифрах]',
    link: '[TODO: ссылка на проект]',
  },
  {
    id: 'case-ai-1',
    category: 'ai',
    title: '[TODO: название проекта]',
    problem: '[TODO: описание проблемы клиента]',
    solution: '[TODO: что было сделано]',
    result: '[TODO: результат в цифрах]',
    link: '[TODO: ссылка на проект]',
    isDemo: true,
  },
]

export const processSteps: ProcessStep[] = [
  { step: 1, title: 'Заявка и знакомство', description: 'Обсуждаем задачу и цели.' },
  { step: 2, title: 'Бриф и оценка', description: 'Фиксируем объём работ, сроки и стоимость.' },
  { step: 3, title: 'Разработка с промежуточными демо', description: 'Вы видите прогресс на каждом этапе.' },
  { step: 4, title: 'Запуск и поддержка', description: 'Сайт, приложение или агент запущен, есть сопровождение.' },
]

export const testimonials: Testimonial[] = [
  { name: '[TODO: имя]', company: '[TODO: компания]', text: '[TODO: текст отзыва]' },
  { name: '[TODO: имя]', company: '[TODO: компания]', text: '[TODO: текст отзыва]' },
]

export const guarantees: string[] = [
  'Работаем по договору — фиксируем объём, сроки и стоимость на берегу',
  'Поддержка после сдачи проекта — не пропадаем после оплаты',
  'Если наступает форс-мажор, заранее согласовываем запасной план и сроки',
]

export const faqItems: FaqItem[] = [
  { question: 'Работаете по договору?', answer: 'Да, договор заключается перед началом работ.' },
  {
    question: 'Что если проект не понравится на промежуточном этапе?',
    answer: 'Промежуточные демо предусмотрены на каждом шаге — правки вносятся до финального согласования.',
  },
  {
    question: 'Какие сроки?',
    answer: 'Зависит от объёма — типовой сайт занимает 2-4 недели, точный срок фиксируется в брифе.',
  },
  {
    question: 'Как происходит оплата?',
    answer: 'Обычно поэтапно: аванс перед стартом и оплата по завершении — точная схема обсуждается в брифе.',
  },
]

export const pricingTiers: PricingTier[] = [
  { title: 'Сайты и лендинги', priceFrom: '[TODO: цена от]' },
  { title: 'Приложения', priceFrom: '[TODO: цена от]' },
  { title: 'ИИ-агенты', priceFrom: '[TODO: цена от]' },
]
