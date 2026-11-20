import React from "react";

// Plain text from the feed: paragraphs split on blank lines, single newlines kept, and bare
// http(s) URLs turned into links. Everything is rendered as text, never as HTML.
const URL_PATTERN = /https?:\/\/[^\s<>"]+/g;
const TRAILING_PUNCTUATION = /[.,;:!?)\]}'"»]+$/;

const linkify = (text: string): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(URL_PATTERN)) {
    const raw = match[0];
    const url = raw.replace(TRAILING_PUNCTUATION, "");
    const start = match.index ?? 0;
    nodes.push(text.slice(last, start));
    nodes.push(
      <a
        key={start}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="break-words font-semibold text-blue-900 underline decoration-amber-500 decoration-2 underline-offset-4"
      >
        {url}
      </a>,
    );
    last = start + url.length;
  }
  nodes.push(text.slice(last));
  return nodes;
};

// `preview` shows only the first paragraph, clamped to four lines (the home page strip).
const FeedText: React.FC<{ text: string; className?: string; preview?: boolean }> = ({
  text,
  className = "",
  preview = false,
}) => {
  const paragraphs = text.split(/\n\n+/);
  return (
    <div className={`space-y-3 whitespace-pre-line ${className}`}>
      {(preview ? paragraphs.slice(0, 1) : paragraphs).map((paragraph, index) => (
        <p key={index} className={preview ? "line-clamp-4" : undefined}>
          {linkify(paragraph)}
        </p>
      ))}
    </div>
  );
};

export default FeedText;
