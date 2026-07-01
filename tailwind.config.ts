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
