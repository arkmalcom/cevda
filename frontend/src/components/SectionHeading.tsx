import React from "react";
import { m } from "motion/react";

interface SectionHeadingProps {
  title: string;
  className?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
}

export const Underline: React.FC<{ className?: string; color?: string }> = ({
  className = "",
  color = "var(--sun)",
}) => (
  <m.svg
    viewBox="0 0 220 18"
    preserveAspectRatio="none"
    className={className}
    aria-hidden
    initial="hidden"
    whileInView="drawn"
    viewport={{ once: true }}
  >
    <m.path
      d="M4 12 C 50 4, 110 3, 216 9"
      fill="none"
      stroke={color}
      strokeWidth="6"
      strokeLinecap="round"
      variants={{
        hidden: { pathLength: 0.001 },
        drawn: {
          pathLength: 1,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
        },
      }}
    />
  </m.svg>
);

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  className = "",
  align = "left",
  tone = "dark",
  as: Tag = "h2",
}) => {
  const centered = align === "center";
  return (
    <div className={`mb-10 md:mb-14 ${centered ? "text-center" : ""} ${className}`}>
      <Tag
        className={`relative inline-block font-display text-4xl font-extrabold leading-[1.02] md:text-6xl ${
          tone === "light" ? "text-white" : "text-blue-900"
        }`}
      >
        {title}
        <Underline
          className={`absolute -bottom-3 h-3 w-[min(100%,14rem)] md:-bottom-4 md:h-4 ${
            centered ? "left-1/2 -translate-x-1/2" : "left-0"
          }`}
        />
      </Tag>
    </div>
  );
};

export default SectionHeading;
