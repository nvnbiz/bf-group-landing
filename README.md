# BF GROUP — лендинг-портфолио

## Стек
Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, GSAP + Lenis.

## Установка

```bash
npm install
cp .env.example .env.local
```

Заполните `.env.local`:
- `TELEGRAM_BOT_TOKEN` — токен Telegram-бота (получить у @BotFather)
- `TELEGRAM_CHAT_ID` — ID чата/канала, куда приходят заявки

## Разработка

```bash
npm run dev
```

## Тесты

```bash
npm test
```

## Деплой на Vercel

1. Импортировать репозиторий в Vercel.
2. В настройках проекта → Environment Variables добавить `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.
3. Deploy — Vercel автоматически определит Next.js проект.

## Контент

Плейсхолдер-контент находится в `data/content.ts`, помечен `[TODO: ...]`. Перед публичным запуском заменить на реальные кейсы, отзывы, цены и ссылки.
