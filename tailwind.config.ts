import type { Config } from 'tailwindcss'

// Palette sampled from design1.png (light/cream + forest green + muted gold),
// component shapes (pill radius, layered cards) borrowed from the Humain360
// reference — see /northstarpublicadjusting.com for both source references.
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF8F3',
          50: '#FFFFFF',
          100: '#FAF8F3',
          200: '#F2EEE3',
        },
        forest: {
          DEFAULT: '#1F3D2E',
          50: '#EAF0EC',
          100: '#C7D8CD',
          400: '#2F5A43',
          500: '#1F3D2E',
          600: '#17301F',
          900: '#0E1B13',
        },
        gold: {
          DEFAULT: '#B4914F',
          100: '#F1E7D3',
          400: '#C7A465',
          500: '#B4914F',
          600: '#93753D',
        },
        ink: {
          DEFAULT: '#14201A',
          muted: '#5B6B60',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '8px',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,32,26,0.04), 0 12px 28px -18px rgba(20,32,26,0.22)',
        floating: '0 22px 50px -24px rgba(20,32,26,0.3)',
      },
      spacing: {
        18: '4.5rem',
      },
      maxWidth: {
        container: '1280px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
