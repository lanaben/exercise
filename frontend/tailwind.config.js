/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#090F2D',
        secondary: '#E36931',
        background: '#E1E5DB',
        border: '#56BCDB'
      }
    },
  },
  plugins: [],
}

