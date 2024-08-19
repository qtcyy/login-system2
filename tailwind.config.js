/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  screens: {
    sm: "480px",
    md: "768px",
    lg: "976px",
    xl: "1440px",
  },
  colors: {
    blue: "#1fb6ff",
    purple: "#7e5bef",
    pink: "#ff49db",
    orange: "#ff7849",
    green: "#13ce66",
    yellow: "#ffc82c",
    "gray-dark": "#273444",
    gray: "#8492a6",
    "gray-light": "#d3dce6",
  },
  fontFamily: {
    sans: ["Graphik", "sans-serif"],
    serif: ["Merriweather", "serif"],
  },

  theme: {
    extend: {
      spacing: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },
    },
  },
  plugins: [],
};
