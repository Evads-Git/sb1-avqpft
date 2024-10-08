/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bebas': ['"Bebas Neue"', 'cursive'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      colors: {
        'netflix-red': '#E50914',
        'netflix-black': '#141414',
      },
    },
  },
  plugins: [],
}