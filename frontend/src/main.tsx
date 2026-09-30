import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/source-sans-3";
import "@fontsource-variable/source-sans-3/wght-italic.css";
import "@fontsource-variable/shantell-sans";
import "@fontsource/pirata-one";
import "./styles/index.css";
import App from "./App.tsx";
import favicon from "./assets/cevda_logo_tr.png";
import "./scripts/i18n";

const faviconLink = document.createElement("link");
faviconLink.rel = "icon";
faviconLink.href = favicon;
document.head.appendChild(faviconLink);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
