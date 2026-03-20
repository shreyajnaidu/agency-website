// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0A0A0A',
        charcoal: '#171717',
        gold: '#C6A96B',
        offwhite: '#F5F5F5',
        grey: '#A1A1A1',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      borderWidth: {
        '08': '0.8px',
      },
    },
  },
  plugins: [],
}