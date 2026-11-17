import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/source-sans-3";
import "@fontsource-variable/source-sans-3/wght-italic.css";
import "@fontsource-variable/shantell-sans";
import "@fontsource/pirata-one";
import "./styles/index.css";
import App from "./App.tsx";
import { i18nReady } from "./scripts/i18n";

// The page arrives with prerendered HTML in #root. Render only once translations
// are loaded so React replaces it with identical content instead of a blank screen.
i18nReady.finally(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
});
