import type { Env } from "./env";
import { corsHeaders, json } from "./http";
import { handleEmail } from "./email";
import { getQuestions, startAttempt, submitAttempt } from "./attempts";

async function route(req: Request, env: Env): Promise<Response> {
  const { pathname } = new URL(req.url);
  const method = req.method;

  if (method === "GET" && pathname === "/health") return new Response("OK");
  if (method === "POST" && pathname === "/email") return handleEmail(req, env);
  if (method === "POST" && pathname === "/attempts/start") return startAttempt(req, env);
  if (method === "POST" && pathname === "/attempts/submit") return submitAttempt(req, env);

  const questions = pathname.match(/^\/questions\/([^/]+)$/);
  if (method === "GET" && questions) return getQuestions(questions[1], env);

  return json({ message: "Not found" }, 404);
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const cors = corsHeaders(req.headers.get("Origin"), env.ALLOWED_ORIGINS);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

    let res: Response;
    try {
      res = await route(req, env);
    } catch (err) {
      console.error("Unhandled error", err);
      res = json({ message: "Internal Server Error" }, 500);
    }
    for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
    return res;
  },
} satisfies ExportedHandler<Env>;
