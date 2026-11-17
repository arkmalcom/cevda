// Runs after `vite build` and `vite build --ssr`. Renders every route to static HTML
// so crawlers and link previews get real content, titles and descriptions without
// running JavaScript. Also writes 404.html (served by Cloudflare for unknown paths)
// and sitemap.xml.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Use React's production server renderer (the bundle reads NODE_ENV at runtime).
process.env.NODE_ENV ??= "production";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const { render, PAGE_META, NOT_FOUND_META, SITE_URL } = await import(
  pathToFileURL(path.join(root, "dist-ssr/entry-server.js")).href
);

const loadResources = async () => {
  const resources = {};
  for (const lng of ["es", "en"]) {
    resources[lng] = {};
    const dir = path.join(dist, "locales", lng);
    for (const file of await fs.readdir(dir)) {
      if (!file.endsWith(".json")) continue;
      resources[lng][file.replace(/\.json$/, "")] = JSON.parse(
        await fs.readFile(path.join(dir, file), "utf8"),
      );
    }
  }
  return resources;
};

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const replaceOnce = (html, search, replacement) => {
  const found = search instanceof RegExp ? search.test(html) : html.includes(search);
  if (!found) {
    throw new Error(`prerender: index.html is missing ${search}`);
  }
  return html.replace(search, () => replacement);
};

const buildPage = (template, appHtml, pathname, meta) => {
  const { title, description } = meta.es;
  const url = SITE_URL + pathname;
  const head = [
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    meta.noindex
      ? `<meta name="robots" content="noindex" />`
      : `<link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />`,
  ].join("\n    ");

  let html = template;
  html = replaceOnce(html, /<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`);
  html = replaceOnce(
    html,
    '<meta name="description" content="" />',
    `<meta name="description" content="${escapeHtml(description)}" />`,
  );
  html = replaceOnce(html, "<!--app-head-->", head);
  html = replaceOnce(html, "<!--app-html-->", appHtml);
  return html;
};

const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
const resources = await loadResources();

// Cloudflare serves /admision from admision.html (html_handling: auto-trailing-slash).
const fileFor = (pathname) => (pathname === "/" ? "index.html" : `${pathname.slice(1)}.html`);

for (const [pathname, meta] of Object.entries(PAGE_META)) {
  const html = buildPage(template, render(pathname, resources), pathname, meta);
  await fs.writeFile(path.join(dist, fileFor(pathname)), html);
  console.log(`prerendered ${pathname} -> ${fileFor(pathname)}`);
}

await fs.writeFile(
  path.join(dist, "404.html"),
  buildPage(template, render("/404", resources), "/404", NOT_FOUND_META),
);
console.log("prerendered 404.html");

const sitemapUrls = Object.entries(PAGE_META)
  .filter(([, meta]) => !meta.noindex)
  .map(([pathname]) => `  <url><loc>${SITE_URL}${pathname}</loc></url>`);
await fs.writeFile(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join("\n")}
</urlset>
`,
);
console.log(`wrote sitemap.xml (${sitemapUrls.length} urls)`);
