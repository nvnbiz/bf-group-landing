import { NextResponse } from 'next/server'
import { sendTelegramMessage } from '@/lib/telegram'

interface ContactPayload {
  name: string
  contact: string
  message: string
}

function isValidPayload(data: unknown): data is ContactPayload {
  if (typeof data !== 'object' || data === null) return false
  const payload = data as Record<string, unknown>
  return (
    typeof payload.name === 'string' && payload.name.trim().length > 0 &&
    typeof payload.contact === 'string' && payload.contact.trim().length > 0 &&
    typeof payload.message === 'string' && payload.message.trim().length > 0
  )
}

export async function POST(request: Request) {
  const data = await request.json()

  if (!isValidPayload(data)) {
    return NextResponse.json({ ok: false, error: 'Заполните все поля формы' }, { status: 400 })
  }

  const text = `Новая заявка с сайта BF GROUP\nИмя: ${data.name}\nКонтакт: ${data.contact}\nЗадача: ${data.message}`

  try {
    const sent = await sendTelegramMessage(text)
    if (!sent) {
      return NextResponse.json(
        { ok: false, error: 'Не удалось отправить заявку, попробуйте написать в Telegram напрямую' },
        { status: 502 }
      )
    }
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch {
    return NextResponse.json({ ok: false, error: 'Сервис заявок временно недоступен' }, { status: 500 })
  }
}
