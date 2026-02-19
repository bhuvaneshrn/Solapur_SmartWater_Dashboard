/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#002147',
          blue: '#003366',
          white: '#FFFFFF',
          grey: '#F8F9FA',
          slate: '#334155',
        },
        india: {
          saffron: '#FF9933',
          white: '#FFFFFF',
          green: '#138808',
          blue: '#000080',
        },
        accent: {
          cyan: '#22d3ee',
          teal: '#2dd4bf',
          blue: '#3b82f6',
        }
      },
      backgroundImage: {
        'gov-pattern': "url('https://www.transparenttextures.com/patterns/cubes.png')",
        'grid-pattern': "radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'gov': '0 4px 6px -1px rgba(0, 33, 71, 0.1), 0 2px 4px -1px rgba(0, 33, 71, 0.06)',
      }
    },
  },
  plugins: [],
}