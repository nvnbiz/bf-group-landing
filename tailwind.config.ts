import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#170B2E',
          card: '#22123F',
        },
        accent: {
          blue: '#6839D6',
          cyan: '#4FC3F7',
          violet: '#9D7BFF',
        },
        text: {
          primary: '#F5F3FF',
          secondary: '#B9AEDB',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
}

export default config
