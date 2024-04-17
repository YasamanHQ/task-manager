/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Plus Jakarta Sans",
    },
    colors: {
      transparent: "transparent",
      white: "white",
      "bkg-color": "#ecebeb",
      "border-color": "#d8d8d8",
      "app-bg-color": "#dddcea",
      "light-title-font-color": "#262630",
      "light-toggle-color": "#676871",
      "add-item-bg-color": "#ecebeb91",
      "input-ring-color": "#54545e",
      "hover-button-purple-color": "#645fc6be",
      "sidebar-font-color": "#878995",
      "purple-color": "#645fc6",
      "font-color": "#fdfeff",
      "items-bg-color": "#2c2c38",
      "add-item-modal-bg-color": "#03030375",
      "red-color": "#ff2424",
      "dark-bg-color": "#2c2c38",
      "dark-border-color": "#31313d",
      "dark-app-bg-color": "#21212d",
      "dark-add-item-bg-color": "#2c2c3880",
      "dark-shadow-color": "#645fc623",
      "dark-input-ring-color": "#54545e",
    },
    extend: {},
  },
  plugins: [],
  darkMode: "class",
};
