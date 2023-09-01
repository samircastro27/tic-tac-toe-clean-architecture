/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
export default {
  content: [
    "./index.html",
    "./src/**/*.vue",
    "./src/infrastructure/composables/mark-color.ts"
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.white,
        secondary: colors.emerald,
        terciary: colors.black,
        accent: colors.pink,
      }
    },
  },
  plugins: [],
}

