/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        card: "#141414",
        accent: "#f5a623",
      },
    },
  },
  plugins: [],
};
