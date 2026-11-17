// Build-time renderer used by scripts/prerender.mjs. Not shipped to the browser.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { createInstance, type Resource } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import App from "./App";

export { PAGE_META, NOT_FOUND_META, SITE_URL } from "./seo";

export function render(url: string, resources: Resource): string {
  const i18n = createInstance();
  i18n.use(initReactI18next).init({
    lng: "es",
    fallbackLng: "en",
    resources,
    ns: Object.keys(resources.es),
    defaultNS: "common",
    initAsync: false,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

  return renderToString(
    <I18nextProvider i18n={i18n}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </I18nextProvider>,
  );
}
