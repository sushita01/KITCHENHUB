/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryPink: "#ff6f91",
        primaryRed: "#ff3b3f",
        primaryMaroon: "#800000",
        primaryPurple: "#6a0dad",
        lightWhite: "#fefefe",
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
