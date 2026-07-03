import type { Metadata } from 'next'
import { Unbounded, Manrope, JetBrains_Mono } from 'next/font/google'
import { Header } from '@/components/Header'
import './globals.css'

const unbounded = Unbounded({ subsets: ['latin', 'cyrillic'], weight: ['700'], variable: '--font-heading' })
const manrope = Manrope({ subsets: ['latin', 'cyrillic'], variable: '--font-body' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin', 'cyrillic'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'BF GROUP — сайты, приложения и ИИ-агенты',
  description: 'Цифровой мастер BF GROUP создаёт сайты, приложения и ИИ-агентов для экспертов и бизнеса.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg-base font-body text-text-primary">
        <Header />
        {children}
      </body>
    </html>
  )
}
