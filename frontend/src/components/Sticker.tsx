import React, { useRef, useSyncExternalStore } from "react";
import {
  m,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { stickerArt, type StickerName } from "./stickerArt";

interface StickerProps {
  name: StickerName;
  className?: string;
  rotate?: number;
  /** Vertical drift in px across the element's pass through the viewport. */
  parallax?: number;
  bob?: boolean;
  draggable?: boolean;
}

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

const subscribeFinePointer = (onChange: () => void) => {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const Sticker: React.FC<StickerProps> = ({
  name,
  className = "",
  rotate = 0,
  parallax = 0,
  bob = true,
  draggable = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
  const inView = useInView(ref, { margin: "120px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  const canDrag = draggable && !reduceMotion && finePointer;

  return (
    <m.div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{ y: reduceMotion ? 0 : y, rotate }}
    >
      <m.img
        src={stickerArt[name]}
        alt=""
        draggable={false}
        className={`sticker h-full w-full object-contain ${
          canDrag ? "pointer-events-auto cursor-grab active:cursor-grabbing" : ""
        } ${bob ? "sticker-bob" : ""}`}
        style={
          {
            "--bob-state": inView ? "running" : "paused",
            animationDelay: `${(rotate % 5) * -0.9}s`,
          } as React.CSSProperties
        }
        drag={canDrag}
        dragSnapToOrigin
        dragElastic={0.5}
        dragTransition={{ bounceStiffness: 260, bounceDamping: 14 }}
        whileDrag={{ scale: 1.12, rotate: 8 }}
        whileHover={canDrag ? { scale: 1.06, rotate: -6 } : undefined}
        transition={{ type: "spring", duration: 0.45, bounce: 0.3 }}
      />
    </m.div>
  );
};

export default Sticker;
