/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["winter", "light", "dark"],
    darkTheme: "winter",
  },
  plugins: [require("daisyui")],
};
