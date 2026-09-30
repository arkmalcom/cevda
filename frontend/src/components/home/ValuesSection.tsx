import React, { useRef } from "react";
import {
  m,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import SectionHeading from "../SectionHeading";
import { stickerArt, type StickerName } from "../stickerArt";

interface Value {
  title: string;
  content: string;
}

const BASE_SPEED = 2.2;
const CARD_STICKERS: StickerName[] = ["crown", "wing", "star", "laurel", "plane", "pencil", "block"];
const CARD_TONES = [
  "bg-amber-400 text-blue-950",
  "bg-sheet text-blue-900",
  "bg-blue-900 text-white",
  "bg-blue-100 text-blue-950",
  "bg-sheet text-blue-900",
  "bg-amber-200 text-blue-950",
  "bg-blue-900 text-white",
];
const CARD_TILT = [-2.5, 1.5, -1, 2.5, -2, 1, -1.5];
// Seven notes: 1 + three pairs on phones and tablets, 3 + 4 on desktop; each row sums to 100% minus its gaps.
const NOTE_WIDTHS = [
  "w-full lg:w-[calc(38%-0.67rem)]",
  "w-[calc(50%-0.5rem)] md:w-[calc(45%-0.5rem)] lg:w-[calc(32%-0.67rem)]",
  "w-[calc(50%-0.5rem)] md:w-[calc(55%-0.5rem)] lg:w-[calc(30%-0.67rem)]",
  "w-[calc(50%-0.5rem)] md:w-[calc(55%-0.5rem)] lg:w-[calc(24%-0.75rem)]",
  "w-[calc(50%-0.5rem)] md:w-[calc(45%-0.5rem)] lg:w-[calc(21%-0.75rem)]",
  "w-[calc(50%-0.5rem)] md:w-[calc(48%-0.5rem)] lg:w-[calc(26%-0.75rem)]",
  "w-[calc(50%-0.5rem)] md:w-[calc(52%-0.5rem)] lg:w-[calc(29%-0.75rem)]",
];

const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

const ValuesMarquee: React.FC<{ values: Value[] }> = ({ values }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref);
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(-1);
  const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || !inView) return;
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = 1;
    else if (factor > 0) direction.current = -1;
    const moveBy = direction.current * BASE_SPEED * (delta / 1000) * (1 + Math.abs(factor));
    baseX.set(baseX.get() + moveBy);
  });

  const run = (
    <div className="flex shrink-0 items-center">
      {values.map((value) => (
        <React.Fragment key={value.title}>
          <span className="px-6 font-display text-[3.2rem] font-extrabold leading-none tracking-[-0.03em] text-blue-900 md:px-10 md:text-[6rem]">
            {value.title}
          </span>
          <img src={stickerArt.star} alt="" className="h-10 w-10 shrink-0 md:h-16 md:w-16" />
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative -mx-4 -rotate-2 overflow-hidden bg-amber-500 py-5 shadow-sheet md:py-7"
    >
      <m.div className="flex w-max" style={{ x: reduceMotion ? "0%" : x }}>
        {run}
        {run}
      </m.div>
    </div>
  );
};

const ValueNote: React.FC<{ value: Value; index: number }> = ({ value, index }) => {
  const tone = CARD_TONES[index % CARD_TONES.length];
  const sticker = CARD_STICKERS[index % CARD_STICKERS.length];
  const width = NOTE_WIDTHS[index % NOTE_WIDTHS.length];

  return (
    <li
      className={`relative rounded-card p-5 pt-8 shadow-sheet transition-[rotate,translate] duration-300 ease-out [rotate:var(--tilt)] hover-fine:[rotate:0deg] hover-fine:[translate:0_-6px] motion-reduce:transition-none md:p-6 md:pt-9 ${tone} ${width}`}
      style={{ "--tilt": `${CARD_TILT[index % CARD_TILT.length]}deg` } as React.CSSProperties}
    >
      <img
        src={stickerArt[sticker]}
        alt=""
        aria-hidden
        className="sticker absolute -top-5 right-4 h-12 w-12 rotate-12 object-contain md:h-14 md:w-14"
      />
      <h3 className="font-display text-[1.3rem] font-extrabold leading-none tracking-[-0.02em] sm:text-[1.65rem] lg:text-3xl">
        {value.title}
      </h3>
      <p className="mt-3 text-[15px] leading-snug md:text-base">{value.content}</p>
    </li>
  );
};

const ValuesSection: React.FC<{ title: string; values: Value[] }> = ({ title, values }) => (
  <section className="overflow-x-clip py-20 md:py-32">
    <div className="px-5 md:px-8">
      <SectionHeading title={title} align="center" />
    </div>
    <ValuesMarquee values={values} />
    <ul className="mx-auto mt-16 flex max-w-6xl flex-wrap items-start justify-center gap-x-4 gap-y-8 px-5 md:mt-20 md:px-8">
      {values.map((value, index) => (
        <ValueNote key={value.title} value={value} index={index} />
      ))}
    </ul>
  </section>
);

export default ValuesSection;
