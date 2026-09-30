import React, { useRef } from "react";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

interface ScrollWordsProps {
  text: string;
  className?: string;
}

const Word: React.FC<{
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <>
      <m.span style={{ opacity }}>{word}</m.span>{" "}
    </>
  );
};

const ScrollWords: React.FC<ScrollWordsProps> = ({ text, className = "" }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = text.split(/\s+/).filter(Boolean);

  if (reduceMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, index) => {
          const start = index / words.length;
          const end = Math.min(1, start + 2.5 / words.length);
          return (
            <Word key={index} word={word} progress={scrollYProgress} range={[start, end]} />
          );
        })}
      </span>
    </p>
  );
};

export default ScrollWords;
