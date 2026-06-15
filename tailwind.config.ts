import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50:  '#e8f7f7',
          100: '#c4eaea',
          200: '#8dd4d4',
          300: '#56bebd',
          400: '#2fa8a7',
          500: '#1A7A7A',
          600: '#155F5F',
          700: '#104848',
          800: '#0b3232',
          900: '#061c1c',
        },
        brand: {
          teal:        '#1A7A7A',
          'teal-dark': '#155F5F',
          orange:      '#E8681A',
          'orange-dark':'#C7551A',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient':   'linear-gradient(135deg, #0a2626 0%, #1A7A7A 50%, #0d3535 100%)',
        'hero-gradient-2': 'linear-gradient(135deg, #0b1e2d 0%, #0f3d3d 40%, #1A7A7A 100%)',
      },
      animation: {
        'fade-in-up':  'fadeInUp 0.6s ease-out forwards',
        'fade-in':     'fadeIn 0.5s ease-out forwards',
        'pulse-slow':  'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
