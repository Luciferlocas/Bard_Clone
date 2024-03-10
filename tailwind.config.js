/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        gemini: {
          "0%": {
            backgroundPosition: "-100em 0px",
          },
          "100%": {
            backgroundPosition: "100em 0px",
          },
        },
        fade: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        gemini: "gemini 10s infinite",
        fade: "fade 5s"
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
