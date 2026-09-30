import React from "react";
import { m } from "motion/react";
import Sticker from "./Sticker";
import type { StickerName } from "./stickerArt";
import { Underline } from "./SectionHeading";

interface PageIntroProps {
  title: string;
  lead?: string;
  stickers?: [StickerName, StickerName];
  children?: React.ReactNode;
}

const PageIntro: React.FC<PageIntroProps> = ({
  title,
  lead,
  stickers = ["star", "pencil"],
  children,
}) => (
  <header className="surface-dark relative overflow-hidden rounded-b-[2rem] bg-blue-900 px-5 pb-16 pt-28 text-white md:rounded-b-[3rem] md:px-8 md:pb-24 md:pt-36">
    <Sticker
      name={stickers[0]}
      rotate={-12}
      parallax={24}
      className="-right-4 top-20 h-24 w-24 md:right-[8%] md:top-24 md:h-36 md:w-36"
    />
    <Sticker
      name={stickers[1]}
      rotate={14}
      parallax={16}
      className="right-[24%] top-[42%] hidden h-24 w-24 lg:block"
    />
    <div className="relative mx-auto max-w-6xl">
      <m.h1
        className="relative inline-block max-w-[16ch] font-display text-[2.6rem] font-extrabold leading-[1.02] md:text-7xl"
        initial={{ y: 18 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
        <Underline className="absolute -bottom-3 left-0 h-3 w-40 md:-bottom-5 md:h-4 md:w-56" />
      </m.h1>
      {lead && (
        <m.p
          className="mt-8 max-w-[58ch] text-lg leading-relaxed text-blue-100 md:mt-10 md:text-xl"
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {lead}
        </m.p>
      )}
      {children}
    </div>
  </header>
);

export default PageIntro;
