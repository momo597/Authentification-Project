/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        mainBg: "url('./assets/main-bg.jpg')",
      },
      colors: {
        formBg: "rgba(255, 255, 255, 0.4)",
        inputBg: "rgba(255, 255, 255, 0.6)",
        buttonBg: "rgba(255, 255, 255, 0.8)",
      },
      fontFamily: {
        Archivo: ["Archivo Narrow", "sans-serif"],
      },
    },
  },
  plugins: [],
};
