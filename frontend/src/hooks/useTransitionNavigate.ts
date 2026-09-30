import { useCallback } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

const isModifiedClick = (event: React.MouseEvent) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

export function useTransitionNavigate() {
  const navigate = useNavigate();

  return useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, to: string) => {
      const doc = document as ViewTransitionDocument;
      if (
        isModifiedClick(event) ||
        event.defaultPrevented ||
        !doc.startViewTransition ||
        window.location.pathname === to
      ) {
        return;
      }
      event.preventDefault();
      doc.startViewTransition(() => {
        flushSync(() => navigate(to));
      });
    },
    [navigate],
  );
}
