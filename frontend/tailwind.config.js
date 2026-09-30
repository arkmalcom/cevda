/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        // Crest royal blue; 900 is the crest itself so existing blue-900 usage follows the brand.
        blue: {
          50: "#eff0fb",
          100: "#e0e2f7",
          200: "#c2c5ef",
          300: "#9ca1e3",
          400: "#7277d2",
          500: "#5359c4",
          600: "#444ab5",
          700: "#3a3fa6",
          800: "#32369a",
          900: "#2b2f8f",
          950: "#1c1f5e",
        },
        amber: {
          50: "#fff8e6",
          100: "#ffefc2",
          200: "#ffe08a",
          300: "#ffd15c",
          400: "#fbc445",
          500: "#f6b42c",
          600: "#db9a14",
          700: "#b07a0e",
          800: "#8a5e10",
          900: "#6e4b12",
          950: "#3f2a08",
        },
        crest: {
          DEFAULT: "#2b2f8f",
          deep: "#1c1f5e",
          soft: "#e0e2f7",
        },
        sun: {
          DEFAULT: "#f6b42c",
          soft: "#ffe08a",
        },
        palm: "#2f8f5b",
        coral: "#f26b5b",
        paper: "#f4f6fa",
        sheet: "#fdfdff",
        ink: "#1b1d3a",
        "amber-ink": "#8a5e10",
      },
      fontFamily: {
        brand: ['"Pirata One"', "Georgia", "serif"],
        display: ['"Bricolage Grotesque Variable"', "system-ui", "sans-serif"],
        title: ['"Bricolage Grotesque Variable"', "system-ui", "sans-serif"],
        sans: ['"Source Sans 3 Variable"', "system-ui", "sans-serif"],
        welcome: ['"Source Sans 3 Variable"', "system-ui", "sans-serif"],
        hand: ['"Shantell Sans Variable"', '"Comic Sans MS"', "cursive"],
      },
      borderRadius: {
        card: "16px",
      },
      boxShadow: {
        sheet: "0 18px 40px -24px rgba(28, 31, 94, 0.35)",
        lift: "0 24px 48px -20px rgba(28, 31, 94, 0.45)",
        polaroid: "0 22px 36px -18px rgba(28, 31, 94, 0.5)",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.16, 1, 0.3, 1)",
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out": "cubic-bezier(0.77, 0, 0.175, 1)",
      },
      transitionDuration: {
        DEFAULT: "220ms",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("hover-fine", "@media (hover: hover) and (pointer: fine) { &:hover }");
      addVariant(
        "group-hover-fine",
        "@media (hover: hover) and (pointer: fine) { :merge(.group):hover & }",
      );
    },
  ],
};
