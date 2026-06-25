import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './contexts/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-lato)', 'system-ui', 'sans-serif'],
      },
      colors: {
        parchment: 'var(--bg-parchment)',
        warm: 'var(--bg-warm)',
        mahogany: 'var(--bg-dark)',
        'text-primary': 'var(--text-primary)',
        'text-muted': 'var(--text-muted)',
        red: {
          barber: 'var(--red-primary)',
          hover: 'var(--red-hover)',
        },
        navy: 'var(--navy)',
        gold: 'var(--gold)',
        border: 'var(--border)',
        surface: 'var(--surface)',
      },
    },
  },
  plugins: [],
}

export default config
