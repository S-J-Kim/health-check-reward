/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          card: 'rgba(255, 255, 255, 0.15)',
          border: 'rgba(255, 255, 255, 0.3)',
        },
        gradient: {
          start: '#a1c4fd',
          end: '#c2e9fb',
        }
      },
      backdropBlur: {
        'glass': '16px',
      },
      boxShadow: {
        'glass': '0 10px 30px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'shuffle': 'shuffle 1.5s ease-out',
        'pop': 'pop 0.5s ease-out',
      },
      keyframes: {
        shuffle: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
