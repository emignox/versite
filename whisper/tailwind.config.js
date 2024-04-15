/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        slideInFromLeft: "slideInFromLeft 1.5s ease-out",
        slideInFromRight: "slideInFromRight 1.5s ease-out",
        slideInFromTop: "slideInFromTop 1.5s ease-out",
      },
      keyframes: {
        slideInFromLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideInFromRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideInFromTop: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      colors: {
        "custom-blue": "#00349B",
        "custom-white": "#C9CABA",
        "custom-dark-blue": "#002163",
      },
    },
  },
  plugins: [],
};
