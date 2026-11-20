import { useCallback, useEffect, useState } from "react";
import { fetchFeed } from "../utils/calendarFeed";

type FeedState<T> = { status: "loading" } | { status: "error" } | { status: "ready"; data: T };

// Loads one feed route in the browser. The prerendered HTML shows the loading state, so the
// page shell is indexable and the items arrive after hydration. Nothing is fetched while
// `enabled` is false.
export function useCalendarFeed<T>(
  path: string,
  params: Record<string, string | undefined>,
  enabled = true,
) {
  const [state, setState] = useState<FeedState<T>>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  const key = JSON.stringify(params);

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    setState({ status: "loading" });
    fetchFeed<T>(path, JSON.parse(key), controller.signal)
      .then((data) => setState({ status: "ready", data }))
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          console.error(error);
          setState({ status: "error" });
        }
      });
    return () => controller.abort();
  }, [path, key, attempt, enabled]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { state, retry };
}
