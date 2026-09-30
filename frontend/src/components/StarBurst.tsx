import React, { useMemo } from "react";
import { m, useReducedMotion } from "motion/react";
import { stickerArt } from "./stickerArt";

const STAR_COUNT = 12;

const StarBurst: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, index) => {
        const angle = (index / STAR_COUNT) * Math.PI * 2 + (index % 2) * 0.3;
        const distance = 70 + (index % 3) * 28;
        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          size: 18 + (index % 4) * 6,
          rotate: (index % 2 ? 1 : -1) * (40 + index * 11),
        };
      }),
    [],
  );

  if (reduceMotion) {
    return (
      <img
        src={stickerArt.star}
        alt=""
        aria-hidden
        className="sticker mx-auto h-12 w-12"
      />
    );
  }

  return (
    <div className="pointer-events-none relative mx-auto h-14 w-14" aria-hidden>
      <m.img
        src={stickerArt.star}
        alt=""
        className="sticker absolute inset-0 h-full w-full"
        initial={{ scale: 0.6, rotate: -25, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
      {stars.map((star, index) => (
        <m.img
          key={index}
          src={stickerArt.star}
          alt=""
          className="absolute left-1/2 top-1/2"
          style={{ width: star.size, height: star.size, marginLeft: -star.size / 2, marginTop: -star.size / 2 }}
          initial={{ x: 0, y: 0, scale: 0.4, opacity: 1, rotate: 0 }}
          animate={{ x: star.x, y: star.y, scale: 1, opacity: 0, rotate: star.rotate }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 + (index % 4) * 0.03 }}
        />
      ))}
    </div>
  );
};

export const SuccessNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    role="status"
    className="flex flex-col items-center gap-3 rounded-card bg-blue-50 px-5 py-6 text-center"
  >
    <StarBurst />
    <p className="font-display text-lg font-bold text-blue-900">{children}</p>
  </div>
);

export const ErrorNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    role="alert"
    className="flex items-start gap-3 rounded-card bg-red-50 px-4 py-3 text-left text-[15px] text-red-800"
  >
    <i className="fas fa-circle-exclamation mt-0.5" aria-hidden />
    <p>{children}</p>
  </div>
);

export default StarBurst;
