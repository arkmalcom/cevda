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
  // In production the Worker (worker/index.ts) proxies the calendar feed; in `vite dev`
  // these go straight to Tiza.
  server: {
    proxy: {
      "/api/calendario/eventos": {
        target: "https://admin.cevda.com.do",
        changeOrigin: true,
        rewrite: (path) => path.replace("/api/calendario/eventos", "/api/public/v1/events"),
      },
      "/api/calendario/avisos": {
        target: "https://admin.cevda.com.do",
        changeOrigin: true,
        rewrite: (path) => path.replace("/api/calendario/avisos", "/api/public/v1/notices"),
      },
    },
  },
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
