/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#00349B",
        "custom-white": "#C9CABA",
      },
    },
  },
  plugins: [],
};
