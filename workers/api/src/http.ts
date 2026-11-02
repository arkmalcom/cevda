export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function corsHeaders(origin: string | null, allowed: string): Record<string, string> {
  const origins = allowed.split(",").map((o) => o.trim()).filter(Boolean);
  if (!origin || !origins.includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization",
    "Access-Control-Max-Age": "3600",
    Vary: "Origin",
  };
}
