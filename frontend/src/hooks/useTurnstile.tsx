import { useCallback, useEffect, useRef } from "react";

interface TurnstileApi {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  execute: (widgetId: string) => void;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  scriptPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Failed to load Turnstile"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

// Renders an interaction-only Turnstile widget into `turnstileRef` and hands
// out a fresh single-use token on each getToken() call. The widget stays
// invisible unless Cloudflare decides the visitor needs to click a checkbox.
const useTurnstile = () => {
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const pending = useRef<{
    resolve: (token: string) => void;
    reject: (error: Error) => void;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const settle = (token: string | null) => {
      if (token) pending.current?.resolve(token);
      else pending.current?.reject(new Error("Turnstile verification failed"));
      pending.current = null;
    };

    loadTurnstile()
      .then(() => {
        if (cancelled || !turnstileRef.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
          execution: "execute",
          appearance: "interaction-only",
          callback: (token: string) => settle(token),
          "error-callback": () => settle(null),
          "timeout-callback": () => settle(null),
        });
      })
      .catch((error) => console.error(error));

    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, []);

  const getToken = useCallback(
    () =>
      new Promise<string>((resolve, reject) => {
        const turnstile = window.turnstile;
        const id = widgetId.current;
        if (!turnstile || !id) {
          reject(new Error("Turnstile not ready"));
          return;
        }
        pending.current = { resolve, reject };
        turnstile.reset(id);
        turnstile.execute(id);
      }),
    [],
  );

  return { turnstileRef, getToken };
};

export default useTurnstile;
