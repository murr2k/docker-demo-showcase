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
        docker: {
          blue: '#2496ED',
          darkblue: '#003F8C',
          lightblue: '#5EB3E6',
        },
      },
    },
  },
  plugins: [],
}