/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        brand: ['"Pirata One"', "Georgia", "serif"],
        title: ['"Source Serif 4"', "Georgia", "serif"],
        welcome: ['"Source Sans 3"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
