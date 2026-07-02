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
