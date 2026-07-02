'use client'

import { FormEvent, useState } from 'react'

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export function ContactFooter() {
  const [state, setState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('loading')
    setErrorMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get('name') ?? ''),
      contact: String(formData.get('contact') ?? ''),
      message: String(formData.get('message') ?? ''),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()

      if (!response.ok || !data.ok) {
        setErrorMessage(data.error ?? 'Не удалось отправить заявку')
        setState('error')
        return
      }

      setState('success')
      form.reset()
    } catch {
      setErrorMessage('Не удалось отправить заявку, попробуйте написать в Telegram напрямую')
      setState('error')
    }
  }

  return (
    <section id="contact" className="bg-bg-base px-6 py-20">
      <h2 className="text-center font-heading text-3xl font-bold text-text-primary">
        Готовы обсудить свой проект?
      </h2>

      <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl space-y-4">
        <div>
          <label htmlFor="contact-name" className="block font-body text-sm text-text-secondary">
            Имя
          </label>
          <input
            id="contact-name"
            name="name"
            required
            className="mt-1 w-full rounded-lg bg-bg-card p-3 font-body text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
          />
        </div>
        <div>
          <label htmlFor="contact-input" className="block font-body text-sm text-text-secondary">
            Контакт (телефон, email или Telegram)
          </label>
          <input
            id="contact-input"
            name="contact"
            required
            className="mt-1 w-full rounded-lg bg-bg-card p-3 font-body text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="block font-body text-sm text-text-secondary">
            Задача
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            className="mt-1 w-full rounded-lg bg-bg-card p-3 font-body text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
          />
        </div>

        <button
          type="submit"
          disabled={state === 'loading'}
          className="w-full rounded-full bg-accent-blue px-8 py-3 font-body font-semibold text-text-primary hover:bg-accent-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan disabled:opacity-60"
        >
          {state === 'loading' ? 'Отправляем…' : 'Отправить заявку'}
        </button>

        {state === 'success' && (
          <p role="status" className="font-body text-accent-cyan">
            Заявка отправлена! Отвечаю в течение 24 часов.
          </p>
        )}
        {state === 'error' && (
          <p role="alert" className="font-body text-red-400">
            {errorMessage}
          </p>
        )}
      </form>

      <p className="mt-6 text-center font-body text-text-secondary">
        Или напишите напрямую:{' '}
        <a
          href="https://t.me/bfgroup"
          className="font-semibold text-accent-cyan hover:text-accent-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
        >
          Написать в Telegram
        </a>
      </p>

      <footer className="mt-16 border-t border-white/10 pt-6 text-center font-body text-sm text-text-secondary">
        <p>[TODO: соцсети] · [TODO: email]</p>
        <p className="mt-2">© 2026 BF GROUP</p>
      </footer>
    </section>
  )
}
