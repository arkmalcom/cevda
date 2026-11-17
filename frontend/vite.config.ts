import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  // The prerender bundle (vite build --ssr) inlines dependencies so CommonJS
  // packages like react-datepicker resolve the same way they do in the browser.
  ssr: { noExternal: true },
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          config: "./tailwind.config.js",
        }),
      ],
    },
  },
});
