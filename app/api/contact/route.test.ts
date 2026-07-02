import { describe, it, expect, vi, afterEach } from 'vitest'

vi.mock('@/lib/telegram', () => ({
  sendTelegramMessage: vi.fn(),
}))

import { POST } from './route'
import { sendTelegramMessage } from '@/lib/telegram'

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('POST /api/contact', () => {
  it('returns 400 when required fields are missing', async () => {
    const response = await POST(makeRequest({ name: '', contact: '', message: '' }))
    const json = await response.json()

    expect(response.status).toBe(400)
    expect(json.ok).toBe(false)
  })

  it('forwards a valid submission to Telegram and returns ok', async () => {
    vi.mocked(sendTelegramMessage).mockResolvedValue(true)

    const response = await POST(makeRequest({ name: 'Иван', contact: '@ivan', message: 'Нужен сайт' }))
    const json = await response.json()

    expect(sendTelegramMessage).toHaveBeenCalledWith(expect.stringContaining('Иван'))
    expect(response.status).toBe(200)
    expect(json.ok).toBe(true)
  })

  it('returns 502 when Telegram delivery fails', async () => {
    vi.mocked(sendTelegramMessage).mockResolvedValue(false)

    const response = await POST(makeRequest({ name: 'Иван', contact: '@ivan', message: 'Нужен сайт' }))

    expect(response.status).toBe(502)
  })

  it('returns 500 when sendTelegramMessage throws', async () => {
    vi.mocked(sendTelegramMessage).mockRejectedValue(new Error('missing env'))

    const response = await POST(makeRequest({ name: 'Иван', contact: '@ivan', message: 'Нужен сайт' }))

    expect(response.status).toBe(500)
  })
})
