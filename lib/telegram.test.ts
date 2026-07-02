import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { sendTelegramMessage } from './telegram'

describe('sendTelegramMessage', () => {
  beforeEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = 'test-token'
    process.env.TELEGRAM_CHAT_ID = 'test-chat-id'
  })

  afterEach(() => {
    vi.restoreAllMocks()
    delete process.env.TELEGRAM_BOT_TOKEN
    delete process.env.TELEGRAM_CHAT_ID
  })

  it('sends a POST request to the Telegram API with the message text', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    global.fetch = fetchMock as unknown as typeof fetch

    const result = await sendTelegramMessage('Новая заявка')

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.telegram.org/bottest-token/sendMessage',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ chat_id: 'test-chat-id', text: 'Новая заявка' }),
      })
    )
    expect(result).toBe(true)
  })

  it('returns false when the Telegram API responds with an error status', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false }) as unknown as typeof fetch

    const result = await sendTelegramMessage('Новая заявка')

    expect(result).toBe(false)
  })

  it('throws when the bot token or chat id is missing', async () => {
    delete process.env.TELEGRAM_BOT_TOKEN

    await expect(sendTelegramMessage('Новая заявка')).rejects.toThrow(
      'TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set'
    )
  })
})
