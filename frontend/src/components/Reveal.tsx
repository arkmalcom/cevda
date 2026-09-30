import React from "react";
import { m } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

const Reveal: React.FC<RevealProps> = ({ children, className = "", delayMs = 0 }) => (
  <m.div
    className={className}
    initial={{ y: 14 }}
    whileInView={{ y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.55, delay: delayMs / 1000, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </m.div>
);

export default Reveal;
