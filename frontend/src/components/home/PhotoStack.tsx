import React, { useRef, useState } from "react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type PanInfo,
} from "motion/react";
import { useTranslation } from "react-i18next";

interface PhotoStackProps {
  photos: string[];
}

const RESTING_TILT = [-4, 3, -2, 5, -6];
const FLICK_DISTANCE = 90;
const TAP_SLOP = 10;
const FLICK_VELOCITY = 450;
const TILT_SPRING = { stiffness: 160, damping: 18, mass: 0.5 };
const SETTLE_SPRING = { type: "spring", duration: 0.55, bounce: 0.2 } as const;

const PhotoStack: React.FC<PhotoStackProps> = ({ photos }) => {
  const { t } = useTranslation("home");
  const reduceMotion = useReducedMotion();
  const [order, setOrder] = useState(() => photos.map((_, index) => index));
  const [draggingSideways, setDraggingSideways] = useState(false);
  const lockedSideways = useRef(false);
  const pressOrigin = useRef<{ x: number; y: number } | null>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(useTransform(pointerY, [-0.5, 0.5], [7, -7]), TILT_SPRING);
  const tiltY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-9, 9]), TILT_SPRING);

  const sendTopToBack = () => setOrder((current) => [...current.slice(1), current[0]]);
  const bringBackToTop = () =>
    setOrder((current) => [current[current.length - 1], ...current.slice(0, -1)]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const flung =
      Math.abs(info.offset.x) > FLICK_DISTANCE || Math.abs(info.velocity.x) > FLICK_VELOCITY;
    if (flung) sendTopToBack();
  };

  const photoAlt = t("hero.photoAlt");

  if (reduceMotion) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {photos.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={index === 0 ? photoAlt : ""}
            className={`w-full rounded-card object-cover shadow-sheet ${
              index === 0 ? "col-span-2 aspect-[4/3]" : "aspect-square"
            }`}
          />
        ))}
      </div>
    );
  }

  const topPosition = order[0];

  return (
    <div className="relative">
      <div
        className="relative mx-auto aspect-[4/5] w-[min(100%,21rem)] touch-pan-y [perspective:1100px] lg:w-[min(100%,25rem)]"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <m.div className="absolute inset-0" style={{ rotateX: tiltX, rotateY: tiltY }}>
          {photos.map((src, photoIndex) => {
            const depth = order.indexOf(photoIndex);
            const isTop = depth === 0;
            return (
              <m.div
                key={src}
                className={`absolute inset-0 rounded-[14px] bg-white p-3 pb-12 shadow-polaroid ${
                  isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
                }`}
                style={{ zIndex: photos.length - depth }}
                initial={false}
                animate={{
                  rotate:
                    isTop && draggingSideways
                      ? 0
                      : RESTING_TILT[photoIndex % RESTING_TILT.length],
                  x: depth * (photoIndex % 2 ? 7 : -7),
                  y: depth * 9,
                  scale: isTop && draggingSideways ? 1.04 : 1 - depth * 0.035,
                }}
                transition={SETTLE_SPRING}
                drag={isTop ? "x" : false}
                dragDirectionLock
                dragSnapToOrigin
                dragElastic={0.65}
                onDirectionLock={(direction) => {
                  const sideways = direction === "x";
                  lockedSideways.current = sideways;
                  if (sideways) setDraggingSideways(true);
                }}
                onDragEnd={
                  isTop
                    ? (_, info) => {
                        const sideways = lockedSideways.current;
                        lockedSideways.current = false;
                        setDraggingSideways(false);
                        if (sideways) handleDragEnd(_, info);
                      }
                    : undefined
                }
                onPointerDown={
                  isTop
                    ? (event) => {
                        pressOrigin.current = { x: event.clientX, y: event.clientY };
                      }
                    : undefined
                }
                onTap={
                  isTop
                    ? (event) => {
                        const origin = pressOrigin.current;
                        pressOrigin.current = null;
                        if (!origin || !("clientX" in event)) return;
                        const dx = event.clientX - origin.x;
                        const dy = event.clientY - origin.y;
                        if (Math.hypot(dx, dy) > TAP_SLOP) return;
                        sendTopToBack();
                      }
                    : undefined
                }
                aria-hidden={!isTop}
              >
                <img
                  src={src}
                  alt={isTop ? photoAlt : ""}
                  draggable={false}
                  fetchPriority={photoIndex === 0 ? "high" : "auto"}
                  decoding="async"
                  className="h-full w-full select-none rounded-[8px] object-cover"
                />
              </m.div>
            );
          })}
        </m.div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={bringBackToTop}
          aria-label={t("hero.previousPhoto")}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-sheet text-blue-900 shadow-sheet ring-1 ring-blue-900/10 transition-transform duration-150 active:scale-[0.97]"
        >
          <i className="fas fa-arrow-left" aria-hidden />
        </button>
        <p className="min-w-[4.5rem] text-center font-hand text-lg text-blue-900" aria-live="polite">
          <span className="sr-only">
            {t("hero.photoStatus", { current: topPosition + 1, total: photos.length })}
          </span>
          <span aria-hidden className="tabular">
            {topPosition + 1} / {photos.length}
          </span>
        </p>
        <button
          type="button"
          onClick={sendTopToBack}
          aria-label={t("hero.nextPhoto")}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-900 text-white shadow-sheet transition-transform duration-150 active:scale-[0.97]"
        >
          <i className="fas fa-arrow-right" aria-hidden />
        </button>
      </div>
    </div>
  );
};

export default PhotoStack;
