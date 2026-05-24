import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'obsidian': '#0A0705',
        'deep-noir': '#110E0A',
        'burgundy': '#7A1E2E',
        'gold': '#C9A84C',
        'gold-light': '#E8C96D',
        'ember': '#E8652A',
        'ivory': '#F5ECD7',
        'ivory-dim': '#B8A99A',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-jakarta)', 'sans-serif'],
      },
      fontSize: {
        'display-xl': 'clamp(3rem, 8vw, 7rem)',
        'display-lg': 'clamp(2.5rem, 6vw, 5rem)',
        'display-md': 'clamp(2rem, 4vw, 3.5rem)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      animation: {
        'ember-rise': 'emberRise 4s ease-in infinite',
        'cursor-pulse': 'cursorPulse 2s ease infinite',
      },
      keyframes: {
        emberRise: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.8' },
          '100%': { transform: 'translateY(-100vh) scale(0)', opacity: '0' },
        },
        cursorPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
