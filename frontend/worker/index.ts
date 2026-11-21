// Redirects www.cevda.com.do to the apex, proxies the school calendar feed from Tiza,
// and serves everything else from static assets.
import { CALENDAR_ENABLED } from "../src/features";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

interface Ctx {
  waitUntil(promise: Promise<unknown>): void;
}

// Workers' Cache API; not in the DOM lib types this file is checked against.
declare const caches: { default: Cache };

// Same-origin paths -> Tiza's public feed (docs/public-calendar.md in the Tiza repo).
// The query string is passed through untouched; Tiza validates it.
const TIZA = "https://admin.cevda.com.do/api/public";
const FEED_ROUTES: Record<string, { upstream: string; browserMaxAge: number }> = {
  "/api/calendario/eventos": { upstream: `${TIZA}/v1/events`, browserMaxAge: 60 },
  "/api/calendario/avisos": { upstream: `${TIZA}/v1/notices`, browserMaxAge: 60 },
  // Parents subscribe to this URL; the body must reach them byte for byte.
  "/calendario.ics": { upstream: `${TIZA}/calendar.ics`, browserMaxAge: 300 },
};

// A cached copy is served as is while younger than FRESH_SECONDS, served and refreshed in
// the background until STALE_SECONDS, and kept that long so a Tiza outage shows the last
// good answer instead of an error.
const FRESH_SECONDS = 180;
const STALE_SECONDS = 24 * 60 * 60;
const FETCHED_AT = "x-cevda-fetched-at";
const USER_AGENT = "cevda-web/1 (+https://cevda.com.do)";

// ETags compare weakly: Cloudflare turns a strong ETag weak when it compresses a response.
const sameEtag = (a: string | null, b: string | null) =>
  !!a && !!b && a.replace(/^W\//, "") === b.replace(/^W\//, "");

const errorResponse = (status: number, code: string) =>
  Response.json(
    { error: { code } },
    { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } },
  );

// A failed cache write must not turn Tiza's good answer into an error.
const store = async (cacheKey: Request, response: Response) => {
  try {
    await caches.default.put(cacheKey, response);
  } catch (err) {
    console.error("calendar proxy: cache put failed", err);
  }
};

// One background refresh per cached URL at a time (per isolate), so a slow or failing Tiza
// is not hit again by every visitor while a refresh is already running.
const refreshing = new Map<string, Promise<unknown>>();

// What goes into the edge cache: the body, its type and ETag, and when it was fetched.
const toCached = (body: ArrayBuffer, contentType: string, etag: string | null) => {
  const headers = new Headers({
    "Content-Type": contentType,
    "Cache-Control": `public, max-age=${STALE_SECONDS}`,
    [FETCHED_AT]: String(Date.now()),
  });
  if (etag) headers.set("ETag", etag);
  return new Response(body, { headers });
};

// Fetches from Tiza and stores a 200 in the edge cache. A 304 (our copy is still current)
// re-stamps the cached copy. Anything else is returned to the caller and never cached.
async function refresh(
  cacheKey: Request,
  upstreamUrl: string,
  cached: Response | undefined,
): Promise<Response | undefined> {
  const headers: Record<string, string> = { "User-Agent": USER_AGENT };
  const cachedEtag = cached?.headers.get("ETag");
  if (cachedEtag) headers["If-None-Match"] = cachedEtag;

  const upstream = await fetch(upstreamUrl, { headers });
  if (upstream.status === 304 && cached) {
    const restamped = toCached(
      await cached.clone().arrayBuffer(),
      cached.headers.get("Content-Type") ?? "application/octet-stream",
      cachedEtag ?? null,
    );
    await store(cacheKey, restamped.clone());
    return restamped;
  }
  if (upstream.status !== 200) return upstream;

  const fresh = toCached(
    await upstream.arrayBuffer(),
    upstream.headers.get("Content-Type") ?? "application/octet-stream",
    upstream.headers.get("ETag"),
  );
  await store(cacheKey, fresh.clone());
  return fresh;
}

// Turns a cached copy into the answer for the browser: a 304 when its ETag matches.
function answer(request: Request, stored: Response, browserMaxAge: number, state: string) {
  const headers = new Headers({
    "Content-Type": stored.headers.get("Content-Type") ?? "application/octet-stream",
    "Cache-Control": `public, max-age=${browserMaxAge}`,
    "X-Cevda-Cache": state,
    "X-Content-Type-Options": "nosniff",
  });
  const etag = stored.headers.get("ETag");
  if (etag) headers.set("ETag", etag);
  if (sameEtag(request.headers.get("If-None-Match"), etag)) {
    return new Response(null, { status: 304, headers });
  }
  return new Response(request.method === "HEAD" ? null : stored.body, { headers });
}

async function proxyFeed(
  request: Request,
  url: URL,
  route: (typeof FEED_ROUTES)[string],
  ctx: Ctx,
): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response(null, { status: 405, headers: { Allow: "GET, HEAD" } });
  }

  const upstreamUrl = route.upstream + url.search;
  const cacheKey = new Request(url.toString(), { method: "GET" });
  const cached = await caches.default.match(cacheKey);
  const age = cached ? (Date.now() - Number(cached.headers.get(FETCHED_AT) ?? 0)) / 1000 : Infinity;

  if (cached && age < FRESH_SECONDS) return answer(request, cached, route.browserMaxAge, "hit");
  if (cached && age < STALE_SECONDS) {
    if (!refreshing.has(cacheKey.url)) {
      // Its own copy: answer() below streams `cached`'s body to the browser.
      const pending = refresh(cacheKey, upstreamUrl, cached.clone())
        .catch((err) => console.error("calendar proxy: background refresh failed", err))
        .finally(() => refreshing.delete(cacheKey.url));
      refreshing.set(cacheKey.url, pending);
      ctx.waitUntil(pending);
    }
    return answer(request, cached, route.browserMaxAge, "stale");
  }

  let result: Response | undefined;
  try {
    result = await refresh(cacheKey, upstreamUrl, cached);
  } catch {
    return errorResponse(502, "upstream_unreachable");
  }
  if (result?.headers.has(FETCHED_AT)) return answer(request, result, route.browserMaxAge, "miss");

  // Tiza answered an error. Pass a 4xx through (a bad parameter is the caller's to fix);
  // anything else becomes a 502. Neither is cached.
  if (result && result.status >= 400 && result.status < 500) {
    return new Response(await result.text(), {
      status: result.status,
      headers: {
        "Content-Type": result.headers.get("Content-Type") ?? "application/json",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }
  return errorResponse(502, "upstream_error");
}

export default {
  async fetch(request: Request, env: Env, ctx: Ctx): Promise<Response> {
    const url = new URL(request.url);
    if (url.hostname.startsWith("www.")) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.toString(), 301);
    }
    const route = FEED_ROUTES[url.pathname];
    if (route && CALENDAR_ENABLED) return proxyFeed(request, url, route, ctx);
    return env.ASSETS.fetch(request);
  },
};
