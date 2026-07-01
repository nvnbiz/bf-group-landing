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
