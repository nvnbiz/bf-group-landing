# BF GROUP Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the BF GROUP portfolio landing page as a Next.js site matching `docs/superpowers/specs/2026-07-01-bf-group-landing-design.md`, with a working Telegram-integrated contact form, placeholder content, and accessibility/reduced-motion compliance.

**Architecture:** Next.js 14 App Router + TypeScript + Tailwind CSS. One `app/page.tsx` composes 8 section components in spec order. A serverless API route forwards contact form submissions to Telegram. Framer Motion handles per-element fade-ins (skipped under `prefers-reduced-motion`); GSAP + Lenis handle exactly two "strong" scroll effects (hero parallax, cases reveal).

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion, GSAP + ScrollTrigger, Lenis, Vitest, React Testing Library, jest-axe.

## Global Constraints

- Next.js 14 (App Router) + TypeScript strict mode + Tailwind CSS, deploy target Vercel.
- Package manager: npm only.
- Testing: Vitest + React Testing Library + jsdom + jest-axe. Every new module gets a test written before implementation (TDD).
- BF GROUP colors: `bg.base #0A0E1A`, `bg.card #0F1428`, `accent.blue #2952E3`, `accent.cyan #4FC3F7`, `accent.violet #8B5CF6`, `text.primary #FFFFFF`, `text.secondary #B4B9C9`.
- Fonts: Inter (`--font-sans`, used for both heading and body tokens, `latin`+`cyrillic` subsets — chosen over Space Grotesk because Space Grotesk has no Cyrillic glyphs and the site is Russian-only), JetBrains Mono (`--font-mono`, `latin`+`cyrillic` subsets, for technical details/tags/numbers).
- Language: Russian only, all UI copy in Russian.
- All animations must respect `prefers-reduced-motion` (via the `usePrefersReducedMotion` hook for JS-driven animation, or Tailwind `motion-reduce:`/`motion-safe:` variants for pure CSS animation).
- Contact form: exactly 3 fields (name, contact, message), submits via `POST /api/contact`, which forwards to Telegram Bot API.
- Placeholder content lives only in `data/content.ts`, marked `[TODO: ...]`.
- Sections render in this exact order with these exact `id` attributes: `hero`, `pain`, `services`, `cases`, `process`, `testimonials`, `faq`, `contact`.

---

### Task 1: Project scaffolding and test infrastructure

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `postcss.config.js`
- Create: `tailwind.config.ts`
- Create: `.eslintrc.json`
- Create: `.gitignore`
- Create: `next-env.d.ts`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Test: `tests/smoke.test.ts`

**Interfaces:**
- Produces: a runnable Next.js app (`npm run dev`, `npm run build`) and a runnable Vitest suite (`npm test`), with path alias `@/*` resolving to the project root in both TypeScript and Vitest.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "bf-group-landing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "next": "^14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^11.3.19",
    "gsap": "^3.12.5",
    "lenis": "^1.1.13"
  },
  "devDependencies": {
    "typescript": "^5.5.4",
    "@types/node": "^20.14.14",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "tailwindcss": "^3.4.7",
    "postcss": "^8.4.40",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.5",
    "vitest": "^2.0.5",
    "@vitejs/plugin-react": "^4.3.1",
    "jsdom": "^24.1.1",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.4.8",
    "@testing-library/user-event": "^14.5.2",
    "jest-axe": "^9.0.0",
    "@types/jest-axe": "^3.5.9"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {}

export default nextConfig
```

- [ ] **Step 4: Create `postcss.config.js`**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 5: Create `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
```

- [ ] **Step 6: Create `.eslintrc.json`**

```json
{
  "extends": "next/core-web-vitals"
}
```

- [ ] **Step 7: Create `.gitignore`**

```
node_modules
.next
.env
.env.local
```

- [ ] **Step 8: Create `next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

- [ ] **Step 9: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 10: Create `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BF GROUP',
  description: 'Сайты, приложения и ИИ-агенты для экспертов и бизнеса',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 11: Create `app/page.tsx`**

```tsx
export default function Home() {
  return <main>BF GROUP</main>
}
```

- [ ] **Step 12: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

- [ ] **Step 13: Create `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom/vitest'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (typeof window !== 'undefined' && !window.ResizeObserver) {
  window.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver
}
```

- [ ] **Step 14: Write the smoke test**

```ts
// tests/smoke.test.ts
import { describe, it, expect } from 'vitest'

describe('smoke test', () => {
  it('sums numbers', () => {
    expect(1 + 1).toBe(2)
  })
})
```

- [ ] **Step 15: Install dependencies**

Run: `npm install`
Expected: install completes with no errors.

- [ ] **Step 16: Run the test suite and verify it passes**

Run: `npm test`
Expected: PASS — 1 test passed (smoke test).

- [ ] **Step 17: Run the production build and verify it succeeds**

Run: `npm run build`
Expected: build completes with "Compiled successfully".

- [ ] **Step 18: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with Tailwind and Vitest"
```

---

### Task 2: BF GROUP Tailwind theme tokens

**Files:**
- Modify: `tailwind.config.ts`
- Test: `tests/tailwind-theme.test.ts`

**Interfaces:**
- Consumes: `tailwind.config.ts` from Task 1.
- Produces: `theme.extend.colors` object with keys `bg.base`, `bg.card`, `accent.blue`, `accent.cyan`, `accent.violet`, `text.primary`, `text.secondary`; `theme.extend.fontFamily` with keys `heading`, `body`, `mono` referencing CSS variables `var(--font-sans)` and `var(--font-mono)`.

- [ ] **Step 1: Write the failing test**

```ts
// tests/tailwind-theme.test.ts
import { describe, it, expect } from 'vitest'
import tailwindConfig from '../tailwind.config'

describe('BF GROUP tailwind theme', () => {
  const extend = tailwindConfig.theme?.extend as {
    colors: Record<string, Record<string, string>>
    fontFamily: Record<string, string[]>
  }

  it('defines the BF GROUP background colors', () => {
    expect(extend.colors.bg.base).toBe('#0A0E1A')
    expect(extend.colors.bg.card).toBe('#0F1428')
  })

  it('defines the BF GROUP accent colors', () => {
    expect(extend.colors.accent.blue).toBe('#2952E3')
    expect(extend.colors.accent.cyan).toBe('#4FC3F7')
    expect(extend.colors.accent.violet).toBe('#8B5CF6')
  })

  it('defines the BF GROUP text colors', () => {
    expect(extend.colors.text.primary).toBe('#FFFFFF')
    expect(extend.colors.text.secondary).toBe('#B4B9C9')
  })

  it('defines heading/body/mono font families referencing CSS variables', () => {
    expect(extend.fontFamily.heading).toEqual(['var(--font-sans)'])
    expect(extend.fontFamily.body).toEqual(['var(--font-sans)'])
    expect(extend.fontFamily.mono).toEqual(['var(--font-mono)'])
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tailwind-theme`
Expected: FAIL — `Cannot read properties of undefined (reading 'bg')`.

- [ ] **Step 3: Implement the theme tokens**

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0A0E1A',
          card: '#0F1428',
        },
        accent: {
          blue: '#2952E3',
          cyan: '#4FC3F7',
          violet: '#8B5CF6',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B4B9C9',
        },
      },
      fontFamily: {
        heading: ['var(--font-sans)'],
        body: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tailwind-theme`
Expected: PASS — 4 tests passed.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts tests/tailwind-theme.test.ts
git commit -m "feat: add BF GROUP color and font tokens to Tailwind theme"
```

---

### Task 3: `usePrefersReducedMotion` hook

**Files:**
- Create: `lib/hooks/usePrefersReducedMotion.ts`
- Test: `lib/hooks/usePrefersReducedMotion.test.tsx`

**Interfaces:**
- Produces: `usePrefersReducedMotion(): boolean` — a client-side hook reading `(prefers-reduced-motion: reduce)` and updating on change.

- [ ] **Step 1: Write the failing test**

```tsx
// lib/hooks/usePrefersReducedMotion.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('usePrefersReducedMotion', () => {
  it('returns false when the user has no reduced motion preference', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)
  })

  it('returns true when the user prefers reduced motion', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- usePrefersReducedMotion`
Expected: FAIL — cannot find module `./usePrefersReducedMotion`.

- [ ] **Step 3: Implement the hook**

```ts
// lib/hooks/usePrefersReducedMotion.ts
'use client'

import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY)
    setPrefersReduced(mediaQueryList.matches)

    const listener = (event: MediaQueryListEvent) => setPrefersReduced(event.matches)
    mediaQueryList.addEventListener('change', listener)

    return () => mediaQueryList.removeEventListener('change', listener)
  }, [])

  return prefersReduced
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- usePrefersReducedMotion`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add lib/hooks/usePrefersReducedMotion.ts lib/hooks/usePrefersReducedMotion.test.tsx
git commit -m "feat: add usePrefersReducedMotion hook"
```

---

### Task 4: Telegram notification helper

**Files:**
- Create: `lib/telegram.ts`
- Test: `lib/telegram.test.ts`

**Interfaces:**
- Produces: `sendTelegramMessage(text: string): Promise<boolean>` — reads `process.env.TELEGRAM_BOT_TOKEN` and `process.env.TELEGRAM_CHAT_ID`, POSTs to the Telegram Bot API, returns `response.ok`. Throws if either env var is missing.

- [ ] **Step 1: Write the failing test**

```ts
// lib/telegram.test.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- telegram`
Expected: FAIL — cannot find module `./telegram`.

- [ ] **Step 3: Implement the helper**

```ts
// lib/telegram.ts
export async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    throw new Error('TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set')
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  })

  return response.ok
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- telegram`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add lib/telegram.ts lib/telegram.test.ts
git commit -m "feat: add Telegram bot notification helper"
```

---

### Task 5: Contact API route

**Files:**
- Create: `app/api/contact/route.ts`
- Test: `app/api/contact/route.test.ts`

**Interfaces:**
- Consumes: `sendTelegramMessage(text: string): Promise<boolean>` from Task 4.
- Produces: `POST(request: Request): Promise<Response>` returning `{ ok: boolean, error?: string }` JSON with status 400 (invalid payload), 200 (success), 502 (Telegram delivery failed), or 500 (unexpected error).

- [ ] **Step 1: Write the failing test**

```ts
// app/api/contact/route.test.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- app/api/contact`
Expected: FAIL — cannot find module `./route`.

- [ ] **Step 3: Implement the route**

```ts
// app/api/contact/route.ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- app/api/contact`
Expected: PASS — 4 tests passed.

- [ ] **Step 5: Commit**

```bash
git add app/api/contact/route.ts app/api/contact/route.test.ts
git commit -m "feat: add contact form API route forwarding to Telegram"
```

---

### Task 6: Placeholder content data module

**Files:**
- Create: `data/content.ts`
- Test: `data/content.test.ts`

**Interfaces:**
- Produces: typed arrays `painPoints: PainPoint[]`, `services: Service[]`, `caseStudies: CaseStudy[]`, `processSteps: ProcessStep[]`, `testimonials: Testimonial[]`, `guarantees: string[]`, `faqItems: FaqItem[]`, `pricingTiers: PricingTier[]`, and types `PainPoint`, `Service`, `CaseCategory`, `CaseStudy`, `ProcessStep`, `Testimonial`, `FaqItem`, `PricingTier`. `Service.id` values are exactly `'sites'`, `'apps'`, `'ai'`.

- [ ] **Step 1: Write the failing test**

```ts
// data/content.test.ts
import { describe, it, expect } from 'vitest'
import {
  painPoints, services, caseStudies, processSteps, testimonials, guarantees, faqItems, pricingTiers,
} from './content'

describe('placeholder content', () => {
  it('has at least 2 pain points', () => {
    expect(painPoints.length).toBeGreaterThanOrEqual(2)
  })

  it('has exactly 3 services matching the spec categories', () => {
    expect(services.map((service) => service.id)).toEqual(['sites', 'apps', 'ai'])
  })

  it('has at least one case study per service category', () => {
    const categories = caseStudies.map((caseStudy) => caseStudy.category)
    expect(categories).toContain('sites')
    expect(categories).toContain('apps')
    expect(categories).toContain('ai')
  })

  it('marks the AI case study as a demo', () => {
    const aiCase = caseStudies.find((caseStudy) => caseStudy.category === 'ai')
    expect(aiCase?.isDemo).toBe(true)
  })

  it('has exactly 4 process steps in order', () => {
    expect(processSteps.map((step) => step.step)).toEqual([1, 2, 3, 4])
  })

  it('has at least 2 testimonials, 3 guarantees, 4 FAQ items and 3 pricing tiers', () => {
    expect(testimonials.length).toBeGreaterThanOrEqual(2)
    expect(guarantees.length).toBeGreaterThanOrEqual(3)
    expect(faqItems.length).toBeGreaterThanOrEqual(4)
    expect(pricingTiers.length).toBe(3)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- data/content`
Expected: FAIL — cannot find module `./content`.

- [ ] **Step 3: Implement the content module**

```ts
// data/content.ts
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
    title: 'Веб и мобильные приложения',
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
  'Работаю по договору — фиксируем объём, сроки и стоимость на берегу',
  'Поддержка после сдачи проекта — не пропадаю после оплаты',
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- data/content`
Expected: PASS — 6 tests passed.

- [ ] **Step 5: Commit**

```bash
git add data/content.ts data/content.test.ts
git commit -m "feat: add placeholder content data module"
```

---

### Task 7: `FadeIn` motion wrapper

**Files:**
- Create: `components/motion/FadeIn.tsx`
- Test: `components/motion/FadeIn.test.tsx`

**Interfaces:**
- Consumes: `usePrefersReducedMotion(): boolean` from Task 3.
- Produces: `FadeIn({ children: ReactNode; className?: string; delay?: number })` — plain `<div>` when reduced motion is preferred, otherwise a Framer Motion fade/slide-in on scroll into view.

- [ ] **Step 1: Write the failing test**

```tsx
// components/motion/FadeIn.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FadeIn } from './FadeIn'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: vi.fn(),
}))

import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'

describe('FadeIn', () => {
  it('renders children wrapped in a plain div when the user prefers reduced motion', () => {
    vi.mocked(usePrefersReducedMotion).mockReturnValue(true)
    render(<FadeIn>Контент</FadeIn>)
    expect(screen.getByText('Контент')).toBeInTheDocument()
  })

  it('renders children with animation when motion is not reduced', () => {
    vi.mocked(usePrefersReducedMotion).mockReturnValue(false)
    render(<FadeIn>Контент</FadeIn>)
    expect(screen.getByText('Контент')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- FadeIn`
Expected: FAIL — cannot find module `./FadeIn`.

- [ ] **Step 3: Implement the component**

```tsx
// components/motion/FadeIn.tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- FadeIn`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add components/motion/FadeIn.tsx components/motion/FadeIn.test.tsx
git commit -m "feat: add FadeIn motion wrapper respecting reduced motion"
```

---

### Task 8: `Header` sticky navigation

**Files:**
- Create: `components/Header.tsx`
- Test: `components/Header.test.tsx`

**Interfaces:**
- Produces: `Header()` — sticky nav with a logo link to `#hero` and links to `#pain`, `#services`, `#cases`, `#process`, `#testimonials`, `#faq`, `#contact`.

- [ ] **Step 1: Write the failing test**

```tsx
// components/Header.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
  it('renders the BF GROUP logo link to the hero section', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: 'BF GROUP' })).toHaveAttribute('href', '#hero')
  })

  it('renders a navigation landmark with links to every section', () => {
    render(<Header />)
    const nav = screen.getByRole('navigation', { name: 'Основная навигация' })
    expect(nav).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Контакты' })).toHaveAttribute('href', '#contact')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Header`
Expected: FAIL — cannot find module `./Header`.

- [ ] **Step 3: Implement the component**

```tsx
// components/Header.tsx
const NAV_LINKS = [
  { href: '#pain', label: 'О задачах' },
  { href: '#services', label: 'Услуги' },
  { href: '#cases', label: 'Кейсы' },
  { href: '#process', label: 'Процесс' },
  { href: '#testimonials', label: 'Отзывы' },
  { href: '#faq', label: 'Вопросы' },
  { href: '#contact', label: 'Контакты' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg-base/80 backdrop-blur">
      <nav
        aria-label="Основная навигация"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <a
          href="#hero"
          className="font-heading text-lg font-bold text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
        >
          BF GROUP
        </a>
        <ul className="hidden gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Header`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add components/Header.tsx components/Header.test.tsx
git commit -m "feat: add sticky Header navigation"
```

---

### Task 9: `Hero` section

**Files:**
- Create: `components/sections/Hero.tsx`
- Test: `components/sections/Hero.test.tsx`

**Interfaces:**
- Produces: `Hero()` — `<section id="hero">` with result-first `<h1>`, subheadline, primary CTA link to `#contact` ("Обсудить проект"), secondary CTA link to `#cases` ("Смотреть кейсы"), and a decorative glow that is static under `motion-reduce`.

- [ ] **Step 1: Write the failing test**

```tsx
// components/sections/Hero.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders the result-first headline', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1, name: /приносят заявки/i })).toBeInTheDocument()
  })

  it('links the primary CTA to the contact section', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: 'Обсудить проект' })).toHaveAttribute('href', '#contact')
  })

  it('links the secondary CTA to the case studies section', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: 'Смотреть кейсы' })).toHaveAttribute('href', '#cases')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Hero`
Expected: FAIL — cannot find module `./Hero`.

- [ ] **Step 3: Implement the component**

```tsx
// components/sections/Hero.tsx
export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-bg-base px-6 py-24 text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,theme(colors.accent.violet/30%),transparent_60%)] motion-safe:animate-pulse motion-reduce:animate-none"
      />
      <h1 className="font-heading text-4xl font-bold text-text-primary md:text-6xl">
        Сайты, приложения и ИИ-агенты, которые приносят заявки, а не просто красиво выглядят
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Hero`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Hero.tsx components/sections/Hero.test.tsx
git commit -m "feat: add Hero section"
```

---

### Task 10: `PainPoints` section

**Files:**
- Create: `components/sections/PainPoints.tsx`
- Test: `components/sections/PainPoints.test.tsx`

**Interfaces:**
- Consumes: `painPoints: PainPoint[]` from Task 6, `FadeIn` from Task 7.
- Produces: `PainPoints()` — `<section id="pain">` listing pain points plus the BF GROUP positioning statement.

- [ ] **Step 1: Write the failing test**

```tsx
// components/sections/PainPoints.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PainPoints } from './PainPoints'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
}))

describe('PainPoints', () => {
  it('renders every pain point from the content data', () => {
    render(<PainPoints />)
    expect(screen.getByText('Сайт есть, а заявок нет')).toBeInTheDocument()
    expect(screen.getByText(/автоматизировать общение/)).toBeInTheDocument()
  })

  it('renders the BF GROUP positioning statement', () => {
    render(<PainPoints />)
    expect(screen.getByText(/BF GROUP — это команда/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- PainPoints`
Expected: FAIL — cannot find module `./PainPoints`.

- [ ] **Step 3: Implement the component**

```tsx
// components/sections/PainPoints.tsx
import { painPoints } from '@/data/content'
import { FadeIn } from '@/components/motion/FadeIn'

export function PainPoints() {
  return (
    <section id="pain" className="bg-bg-base px-6 py-20">
      <FadeIn className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-3xl font-bold text-text-primary">Знакомая ситуация?</h2>
        <ul className="mt-8 space-y-4 text-left">
          {painPoints.map((point) => (
            <li key={point.text} className="rounded-lg bg-bg-card p-4 font-body text-text-secondary">
              {point.text}
            </li>
          ))}
        </ul>
        <p className="mt-8 font-body text-text-primary">
          BF GROUP — это команда, которая берёт на себя всё: от идеи до запуска сайта, приложения или ИИ-агента.
        </p>
      </FadeIn>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- PainPoints`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add components/sections/PainPoints.tsx components/sections/PainPoints.test.tsx
git commit -m "feat: add PainPoints section"
```

---

### Task 11: `Services` section

**Files:**
- Create: `components/sections/Services.tsx`
- Test: `components/sections/Services.test.tsx`

**Interfaces:**
- Consumes: `services: Service[]` from Task 6, `FadeIn` from Task 7.
- Produces: `Services()` — `<section id="services">` with a 3-card bento-grid, each card with a micro-CTA link to `#cases`.

- [ ] **Step 1: Write the failing test**

```tsx
// components/sections/Services.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Services } from './Services'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
}))

describe('Services', () => {
  it('renders all 3 service cards with a micro-CTA linking to cases', () => {
    render(<Services />)

    expect(screen.getByRole('heading', { name: 'Сайты и лендинги' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Веб и мобильные приложения' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'ИИ-агенты и автоматизация' })).toBeInTheDocument()

    const ctaLinks = screen.getAllByRole('link', { name: 'Узнать подробнее →' })
    expect(ctaLinks).toHaveLength(3)
    ctaLinks.forEach((link) => expect(link).toHaveAttribute('href', '#cases'))
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Services`
Expected: FAIL — cannot find module `./Services`.

- [ ] **Step 3: Implement the component**

```tsx
// components/sections/Services.tsx
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Services`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Services.tsx components/sections/Services.test.tsx
git commit -m "feat: add Services bento-grid section"
```

---

### Task 12: `CaseStudies` section

**Files:**
- Create: `components/sections/CaseStudies.tsx`
- Test: `components/sections/CaseStudies.test.tsx`

**Interfaces:**
- Consumes: `caseStudies: CaseStudy[]` from Task 6, `FadeIn` from Task 7.
- Produces: `CaseStudies()` — `<section id="cases">` rendering Problem/Solution/Result cards, with a "Демо-режим" badge on any case where `isDemo` is true.

- [ ] **Step 1: Write the failing test**

```tsx
// components/sections/CaseStudies.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CaseStudies } from './CaseStudies'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
}))

describe('CaseStudies', () => {
  it('renders a card for every case study', () => {
    render(<CaseStudies />)
    expect(screen.getAllByRole('link', { name: 'Смотреть проект →' })).toHaveLength(3)
  })

  it('marks the AI case study with a demo badge', () => {
    render(<CaseStudies />)
    expect(screen.getByText('Демо-режим')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- CaseStudies`
Expected: FAIL — cannot find module `./CaseStudies`.

- [ ] **Step 3: Implement the component**

```tsx
// components/sections/CaseStudies.tsx
import { caseStudies } from '@/data/content'
import { FadeIn } from '@/components/motion/FadeIn'

export function CaseStudies() {
  return (
    <section id="cases" className="bg-bg-base px-6 py-20">
      <h2 className="text-center font-heading text-3xl font-bold text-text-primary">Результаты, а не обещания</h2>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
        {caseStudies.map((caseStudy, index) => (
          <FadeIn key={caseStudy.id} delay={index * 0.1} className="rounded-2xl bg-bg-card p-6">
            {caseStudy.isDemo && (
              <span className="mb-3 inline-block rounded-full bg-accent-violet/20 px-3 py-1 font-mono text-xs text-accent-violet">
                Демо-режим
              </span>
            )}
            <h3 className="font-heading text-xl font-semibold text-text-primary">{caseStudy.title}</h3>
            <p className="mt-3 font-body text-text-secondary"><strong>Проблема:</strong> {caseStudy.problem}</p>
            <p className="mt-2 font-body text-text-secondary"><strong>Решение:</strong> {caseStudy.solution}</p>
            <p className="mt-2 font-mono text-accent-cyan"><strong>Результат:</strong> {caseStudy.result}</p>
            <a
              href={caseStudy.link}
              className="mt-4 inline-block font-body text-accent-cyan hover:text-accent-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
            >
              Смотреть проект →
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- CaseStudies`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add components/sections/CaseStudies.tsx components/sections/CaseStudies.test.tsx
git commit -m "feat: add CaseStudies section with AI demo badge"
```

---

### Task 13: `Process` section

**Files:**
- Create: `components/sections/Process.tsx`
- Test: `components/sections/Process.test.tsx`

**Interfaces:**
- Consumes: `processSteps: ProcessStep[]` from Task 6, `FadeIn` from Task 7.
- Produces: `Process()` — `<section id="process">` with an ordered list of the 4 steps.

- [ ] **Step 1: Write the failing test**

```tsx
// components/sections/Process.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Process } from './Process'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
}))

describe('Process', () => {
  it('renders all 4 steps in order', () => {
    render(<Process />)
    const headings = screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent)
    expect(headings).toEqual([
      'Заявка и знакомство',
      'Бриф и оценка',
      'Разработка с промежуточными демо',
      'Запуск и поддержка',
    ])
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Process`
Expected: FAIL — cannot find module `./Process`.

- [ ] **Step 3: Implement the component**

```tsx
// components/sections/Process.tsx
import { processSteps } from '@/data/content'
import { FadeIn } from '@/components/motion/FadeIn'

export function Process() {
  return (
    <section id="process" className="bg-bg-base px-6 py-20">
      <h2 className="text-center font-heading text-3xl font-bold text-text-primary">Как проходит работа</h2>
      <ol className="mx-auto mt-12 max-w-3xl space-y-6">
        {processSteps.map((step) => (
          <FadeIn key={step.step} delay={(step.step - 1) * 0.1}>
            <li className="flex gap-4 rounded-2xl bg-bg-card p-6">
              <span className="font-mono text-2xl font-bold text-accent-cyan">{step.step}</span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-text-primary">{step.title}</h3>
                <p className="mt-1 font-body text-text-secondary">{step.description}</p>
              </div>
            </li>
          </FadeIn>
        ))}
      </ol>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Process`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Process.tsx components/sections/Process.test.tsx
git commit -m "feat: add Process section"
```

---

### Task 14: `Testimonials` + USP section

**Files:**
- Create: `components/sections/Testimonials.tsx`
- Test: `components/sections/Testimonials.test.tsx`

**Interfaces:**
- Consumes: `testimonials: Testimonial[]` from Task 6, `FadeIn` from Task 7.
- Produces: `Testimonials()` — `<section id="testimonials">` with testimonial cards plus the "Почему BF GROUP, а не агентство" block.

- [ ] **Step 1: Write the failing test**

```tsx
// components/sections/Testimonials.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Testimonials } from './Testimonials'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
}))

describe('Testimonials', () => {
  it('renders every testimonial', () => {
    render(<Testimonials />)
    expect(screen.getAllByText('[TODO: текст отзыва]', { exact: false }).length).toBeGreaterThanOrEqual(2)
  })

  it('renders the "why BF GROUP" USP block', () => {
    render(<Testimonials />)
    expect(screen.getByRole('heading', { name: 'Почему BF GROUP, а не агентство' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Testimonials`
Expected: FAIL — cannot find module `./Testimonials`.

- [ ] **Step 3: Implement the component**

```tsx
// components/sections/Testimonials.tsx
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- Testimonials`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Testimonials.tsx components/sections/Testimonials.test.tsx
git commit -m "feat: add Testimonials and USP section"
```

---

### Task 15: `GuaranteesFaq` section

**Files:**
- Create: `components/sections/GuaranteesFaq.tsx`
- Test: `components/sections/GuaranteesFaq.test.tsx`

**Interfaces:**
- Consumes: `guarantees: string[]`, `faqItems: FaqItem[]`, `pricingTiers: PricingTier[]` from Task 6, `FadeIn` from Task 7.
- Produces: `GuaranteesFaq()` — `<section id="faq">` with a guarantees list, native `<details>`/`<summary>` FAQ disclosures, and a pricing tier list.

- [ ] **Step 1: Write the failing test**

```tsx
// components/sections/GuaranteesFaq.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GuaranteesFaq } from './GuaranteesFaq'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
}))

describe('GuaranteesFaq', () => {
  it('renders all guarantees', () => {
    render(<GuaranteesFaq />)
    expect(
      screen.getByText('Работаю по договору — фиксируем объём, сроки и стоимость на берегу')
    ).toBeInTheDocument()
  })

  it('renders every FAQ question as a disclosure', () => {
    render(<GuaranteesFaq />)
    expect(screen.getByText('Работаете по договору?')).toBeInTheDocument()
    expect(screen.getByText('Какие сроки?')).toBeInTheDocument()
  })

  it('renders pricing tiers for all 3 services', () => {
    render(<GuaranteesFaq />)
    expect(screen.getByText('Сайты и лендинги')).toBeInTheDocument()
    expect(screen.getByText('Приложения')).toBeInTheDocument()
    expect(screen.getByText('ИИ-агенты')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- GuaranteesFaq`
Expected: FAIL — cannot find module `./GuaranteesFaq`.

- [ ] **Step 3: Implement the component**

```tsx
// components/sections/GuaranteesFaq.tsx
import { guarantees, faqItems, pricingTiers } from '@/data/content'
import { FadeIn } from '@/components/motion/FadeIn'

export function GuaranteesFaq() {
  return (
    <section id="faq" className="bg-bg-base px-6 py-20">
      <h2 className="text-center font-heading text-3xl font-bold text-text-primary">
        Вопросы, которые обычно задают
      </h2>

      <FadeIn className="mx-auto mt-10 max-w-3xl rounded-2xl bg-bg-card p-6">
        <h3 className="font-heading text-lg font-semibold text-text-primary">Гарантии</h3>
        <ul className="mt-4 space-y-2 font-body text-text-secondary">
          {guarantees.map((guarantee) => (
            <li key={guarantee}>{guarantee}</li>
          ))}
        </ul>
      </FadeIn>

      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {faqItems.map((item) => (
          <details key={item.question} className="rounded-2xl bg-bg-card p-6">
            <summary className="cursor-pointer font-body font-semibold text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan">
              {item.question}
            </summary>
            <p className="mt-3 font-body text-text-secondary">{item.answer}</p>
          </details>
        ))}
      </div>

      <FadeIn className="mx-auto mt-10 max-w-3xl rounded-2xl bg-bg-card p-6">
        <h3 className="font-heading text-lg font-semibold text-text-primary">Ориентировочная стоимость</h3>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <li key={tier.title} className="font-body text-text-secondary">
              <p className="font-semibold text-text-primary">{tier.title}</p>
              <p className="font-mono text-accent-cyan">{tier.priceFrom}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-body text-sm text-text-secondary">Точная стоимость — после брифа.</p>
      </FadeIn>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- GuaranteesFaq`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add components/sections/GuaranteesFaq.tsx components/sections/GuaranteesFaq.test.tsx
git commit -m "feat: add GuaranteesFaq section with pricing placeholders"
```

---

### Task 16: `ContactFooter` form + footer

**Files:**
- Create: `components/sections/ContactFooter.tsx`
- Test: `components/sections/ContactFooter.test.tsx`

**Interfaces:**
- Consumes: `POST /api/contact` from Task 5 (called via `fetch`).
- Produces: `ContactFooter()` — `<section id="contact">` with a 3-field form (`name`, `contact`, `message`) posting JSON to `/api/contact`, a direct Telegram link, and the footer.

- [ ] **Step 1: Write the failing test**

```tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- ContactFooter`
Expected: FAIL — cannot find module `./ContactFooter`.

- [ ] **Step 3: Implement the component**

```tsx
// components/sections/ContactFooter.tsx
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
          <label htmlFor="name" className="block font-body text-sm text-text-secondary">
            Имя
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-lg bg-bg-card p-3 font-body text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
          />
        </div>
        <div>
          <label htmlFor="contact" className="block font-body text-sm text-text-secondary">
            Контакт (телефон, email или Telegram)
          </label>
          <input
            id="contact"
            name="contact"
            required
            className="mt-1 w-full rounded-lg bg-bg-card p-3 font-body text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-cyan"
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-body text-sm text-text-secondary">
            Задача
          </label>
          <textarea
            id="message"
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- ContactFooter`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add components/sections/ContactFooter.tsx components/sections/ContactFooter.test.tsx
git commit -m "feat: add ContactFooter form wired to /api/contact"
```

---

### Task 17: `ScrollEffects`, layout, and page composition

**Files:**
- Create: `components/ScrollEffects.tsx`
- Test: `components/ScrollEffects.test.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Test: `app/page.test.tsx`

**Interfaces:**
- Consumes: `usePrefersReducedMotion` from Task 3; `Header` from Task 8; `Hero`, `PainPoints`, `Services`, `CaseStudies`, `Process`, `Testimonials`, `GuaranteesFaq`, `ContactFooter` from Tasks 9–16.
- Produces: `ScrollEffects()` — client component with no visible output that wires Lenis + GSAP ScrollTrigger for exactly two effects (hero parallax fade, cases reveal), skipped entirely when reduced motion is preferred. Final `app/page.tsx` renders all 8 sections in spec order.

- [ ] **Step 1: Write the failing `ScrollEffects` test**

```tsx
// components/ScrollEffects.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { ScrollEffects } from './ScrollEffects'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: vi.fn(),
}))
vi.mock('lenis', () => ({
  default: vi.fn().mockImplementation(() => ({
    raf: vi.fn(),
    on: vi.fn(),
    destroy: vi.fn(),
  })),
}))
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    to: vi.fn().mockReturnValue({ kill: vi.fn(), scrollTrigger: { kill: vi.fn() } }),
    from: vi.fn().mockReturnValue({ kill: vi.fn(), scrollTrigger: { kill: vi.fn() } }),
  },
}))
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { update: vi.fn() },
}))

import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import gsap from 'gsap'
import Lenis from 'lenis'

describe('ScrollEffects', () => {
  it('does not initialize Lenis or GSAP scroll triggers when the user prefers reduced motion', () => {
    vi.mocked(usePrefersReducedMotion).mockReturnValue(true)
    render(<ScrollEffects />)
    expect(Lenis).not.toHaveBeenCalled()
    expect(gsap.to).not.toHaveBeenCalled()
  })

  it('initializes Lenis and GSAP scroll triggers when motion is allowed', () => {
    vi.mocked(usePrefersReducedMotion).mockReturnValue(false)
    render(<ScrollEffects />)
    expect(Lenis).toHaveBeenCalled()
    expect(gsap.to).toHaveBeenCalled()
    expect(gsap.from).toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- ScrollEffects`
Expected: FAIL — cannot find module `./ScrollEffects`.

- [ ] **Step 3: Implement `ScrollEffects`**

```tsx
// components/ScrollEffects.tsx
'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'

export function ScrollEffects() {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis()
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)

    const heroTween = gsap.to('#hero > *', {
      opacity: 0.3,
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    const casesTween = gsap.from('#cases', {
      opacity: 0,
      y: 60,
      duration: 0.8,
      scrollTrigger: {
        trigger: '#cases',
        start: 'top 80%',
      },
    })

    return () => {
      heroTween.scrollTrigger?.kill()
      heroTween.kill()
      casesTween.scrollTrigger?.kill()
      casesTween.kill()
      lenis.destroy()
    }
  }, [prefersReducedMotion])

  return null
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- ScrollEffects`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Replace `app/layout.tsx`**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Header } from '@/components/Header'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-sans' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin', 'cyrillic'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'BF GROUP — сайты, приложения и ИИ-агенты',
  description: 'Цифровой мастер BF GROUP создаёт сайты, приложения и ИИ-агентов для экспертов и бизнеса.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg-base font-body text-text-primary">
        <Header />
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 6: Replace `app/page.tsx`**

```tsx
// app/page.tsx
import { Hero } from '@/components/sections/Hero'
import { PainPoints } from '@/components/sections/PainPoints'
import { Services } from '@/components/sections/Services'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Process } from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { GuaranteesFaq } from '@/components/sections/GuaranteesFaq'
import { ContactFooter } from '@/components/sections/ContactFooter'
import { ScrollEffects } from '@/components/ScrollEffects'

export default function Home() {
  return (
    <main>
      <ScrollEffects />
      <Hero />
      <PainPoints />
      <Services />
      <CaseStudies />
      <Process />
      <Testimonials />
      <GuaranteesFaq />
      <ContactFooter />
    </main>
  )
}
```

- [ ] **Step 7: Write the failing page composition test**

```tsx
// app/page.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './page'

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
}))
vi.mock('@/components/ScrollEffects', () => ({
  ScrollEffects: () => null,
}))

describe('Home page composition', () => {
  it('renders all 8 sections in the spec order', () => {
    render(<Home />)

    const sectionIds = Array.from(document.querySelectorAll('section')).map((section) => section.id)
    expect(sectionIds).toEqual(['hero', 'pain', 'services', 'cases', 'process', 'testimonials', 'faq', 'contact'])

    const headings = screen.getAllByRole('heading', { level: 1 }).concat(screen.getAllByRole('heading', { level: 2 }))
    expect(headings.length).toBeGreaterThanOrEqual(8)
  })
})
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npm test -- app/page`
Expected: PASS — 1 test passed.

- [ ] **Step 9: Run the full test suite and the production build**

Run: `npm test`
Expected: PASS — all tests across every task pass.

Run: `npm run build`
Expected: build completes with "Compiled successfully".

- [ ] **Step 10: Commit**

```bash
git add components/ScrollEffects.tsx components/ScrollEffects.test.tsx app/layout.tsx app/page.tsx app/page.test.tsx
git commit -m "feat: compose full landing page with scroll effects and fonts"
```

---

### Task 18: Accessibility audit test

**Files:**
- Test: `tests/accessibility.test.tsx`

**Interfaces:**
- Consumes: `Home` (default export) from `app/page.tsx` (Task 17).

- [ ] **Step 1: Write the failing test**

```tsx
// tests/accessibility.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Home from '@/app/page'

expect.extend(toHaveNoViolations)

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
}))
vi.mock('@/components/ScrollEffects', () => ({
  ScrollEffects: () => null,
}))

describe('Home page accessibility', () => {
  it('has no automatically detectable accessibility violations', async () => {
    const { container } = render(<Home />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 15000)
})
```

- [ ] **Step 2: Run test to verify it fails or passes on first attempt**

Run: `npm test -- accessibility`
Expected: either PASS immediately, or FAIL listing specific axe violations (e.g. missing landmark, color-contrast, heading-order).

- [ ] **Step 3: Fix any reported violations**

If `axe` reports violations, address them directly in the section component named in the violation (e.g. add a missing `aria-label`, adjust a heading level, adjust a color token in `tailwind.config.ts`). Re-run the test after each fix.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- accessibility`
Expected: PASS — 1 test passed, zero violations.

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: PASS — all tests pass.

- [ ] **Step 6: Commit**

```bash
git add tests/accessibility.test.tsx
git commit -m "test: add automated accessibility audit for the home page"
```

---

### Task 19: Deployment configuration and environment docs

**Files:**
- Create: `.env.example`
- Create: `README.md`

**Interfaces:**
- None (documentation only).

- [ ] **Step 1: Create `.env.example`**

```
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

- [ ] **Step 2: Create `README.md`**

```md
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
```

- [ ] **Step 3: Verify the build still succeeds**

Run: `npm run build`
Expected: build completes with "Compiled successfully".

- [ ] **Step 4: Commit**

```bash
git add .env.example README.md
git commit -m "docs: add environment variable and deployment documentation"
```
