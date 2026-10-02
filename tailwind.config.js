/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#050711',
          surface: '#0b0f24',
          card: 'rgba(16, 23, 49, 0.7)',
          border: 'rgba(99, 102, 241, 0.2)',
          accent: '#6366f1',
          cyan: '#06b6d4',
          purple: '#a855f7',
          pink: '#ec4899',
          emerald: '#10b981'
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'glow-pulse': 'glow 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(99, 102, 241, 0.6))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(6, 182, 212, 0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
