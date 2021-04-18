// tailwind.config.js
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      gray: colors.coolGray,
      blue: colors.lightBlue,
      greens: colors.green,
      green: {
        100: "#98b7ac",
        200: "rgb(113 142 131)",
        300: "rgb(102 128 119)",
      },
      red: colors.rose,
      pink: colors.fuchsia,
      transparent: "transparent",
      beige: "#e4d8ca",
      white: "#FFF",
    },
    fontFamily: {
      sans: [
        "Montserrat",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
      ],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
};
