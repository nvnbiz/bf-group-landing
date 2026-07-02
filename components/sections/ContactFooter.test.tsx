// components/sections/ContactFooter.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactFooter } from './ContactFooter'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ContactFooter', () => {
  it('submits the form to /api/contact and shows a success message', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    }) as unknown as typeof fetch

    render(<ContactFooter />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText('Имя'), 'Иван')
    await user.type(screen.getByLabelText('Контакт (телефон, email или Telegram)'), '@ivan')
    await user.type(screen.getByLabelText('Задача'), 'Нужен сайт')
    await user.click(screen.getByRole('button', { name: 'Отправить заявку' }))

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('Заявка отправлена')
    })

    expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({ method: 'POST' }))
  })

  it('shows an error message when the API call fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ ok: false, error: 'Ошибка сервера' }),
    }) as unknown as typeof fetch

    render(<ContactFooter />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText('Имя'), 'Иван')
    await user.type(screen.getByLabelText('Контакт (телефон, email или Telegram)'), '@ivan')
    await user.type(screen.getByLabelText('Задача'), 'Нужен сайт')
    await user.click(screen.getByRole('button', { name: 'Отправить заявку' }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Ошибка сервера')
    })
  })

  it('renders a direct Telegram link as a fallback channel', () => {
    render(<ContactFooter />)
    expect(screen.getByRole('link', { name: 'Написать в Telegram' })).toHaveAttribute(
      'href',
      'https://t.me/bfgroup'
    )
  })
})
