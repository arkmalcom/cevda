import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";
import type { Env } from "./env";
import { json } from "./http";
import { attachmentContentType, careersEmail, examEmail, formEmail, type OutgoingEmail } from "./email-content";

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const RECAPTCHA_MIN_SCORE = 0.5;

async function isValidRecaptcha(token: string, secret: string): Promise<boolean> {
  try {
    const res = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as { success?: boolean; score?: number };
    return Boolean(data.success) && (data.score ?? 0) >= RECAPTCHA_MIN_SCORE;
  } catch (err) {
    console.error("reCAPTCHA verification failed", err);
    return false;
  }
}

async function send(env: Env, email: OutgoingEmail): Promise<Response> {
  const msg = createMimeMessage();
  msg.setSender({ name: "CEVDA Web", addr: env.SENDER_EMAIL });
  msg.setRecipient(env.RECIPIENT_EMAIL);
  msg.setSubject(email.subject);
  msg.addMessage({ contentType: "text/plain", data: email.text });
  if (email.attachment) {
    msg.addAttachment({
      filename: email.attachment.filename,
      contentType: attachmentContentType(email.attachment.filename),
      data: email.attachment.base64,
    });
  }

  try {
    await env.EMAIL.send(new EmailMessage(env.SENDER_EMAIL, env.RECIPIENT_EMAIL, msg.asRaw()));
  } catch (err) {
    console.error("Failed to send email", err);
    return json({ message: "Failed to send email" }, 500);
  }
  return json({ message: "Email sent successfully" });
}

export async function handleEmail(req: Request, env: Env): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ message: "Invalid JSON body" }, 400);
  }

  const { captchaToken, formSource = "contacto", ...data } = body;
  const source = String(formSource);

  // Exam results are posted by the app right after grading, with no captcha
  // (same behaviour as the previous Lambda).
  if (source === "english_exam") return send(env, examEmail(data));

  if (typeof captchaToken !== "string" || !captchaToken) {
    return json({ message: "CAPTCHA Token is missing. Bad request." }, 400);
  }
  if (!(await isValidRecaptcha(captchaToken, env.RECAPTCHA_SECRET_KEY))) {
    return json({ message: "Invalid reCAPTCHA token" }, 400);
  }

  if (source === "carreras") {
    if (typeof data.file !== "string" || typeof data.filename !== "string") {
      return json({ message: "Missing required field: file" }, 400);
    }
    return send(env, careersEmail(data.file, data.filename));
  }

  return send(env, formEmail(source, data));
}
