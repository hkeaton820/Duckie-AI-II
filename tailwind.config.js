/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        duckie: {
          yellow: '#FFD700',
          light: '#FFF8DC',
          accent: '#FFB347',
          dark: '#DAA520',
        }
      },
      fontFamily: {
        display: ['Quicksand', 'sans-serif'],
      },
      animation: {
        bounce_soft: 'bounce_soft 2s infinite',
      },
      keyframes: {
        bounce_soft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
