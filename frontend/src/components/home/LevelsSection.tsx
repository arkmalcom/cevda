import React from "react";
import SectionHeading from "../SectionHeading";
import { stickerArt, type StickerName } from "../stickerArt";

interface Level {
  title: string;
  subtext: string;
  content: string;
}

const COVERS: {
  cover: string;
  body: string;
  sticker: StickerName;
  offset: string;
}[] = [
  {
    cover: "surface-dark bg-blue-900 text-white",
    body: "text-blue-50",
    sticker: "block",
    offset: "md:top-28",
  },
  {
    cover: "bg-amber-500 text-blue-950",
    body: "text-blue-950",
    sticker: "pencil",
    offset: "md:top-36",
  },
];

const LevelsSection: React.FC<{ title: string; levels: Level[] }> = ({ title, levels }) => (
  <section className="px-5 py-20 md:px-8 md:py-28">
    <div className="mx-auto max-w-5xl">
      <SectionHeading title={title} />
      <ol className="flex flex-col gap-8 md:gap-[18vh]">
        {levels.map((level, index) => {
          const cover = COVERS[index % COVERS.length];
          return (
            <li key={level.title} className={`md:sticky ${cover.offset}`}>
              <article
                className={`relative overflow-hidden rounded-card p-6 shadow-lift md:p-12 ${cover.cover}`}
              >
                <img
                  src={stickerArt[cover.sticker]}
                  alt=""
                  aria-hidden
                  className="sticker absolute right-5 top-5 h-16 w-16 rotate-12 object-contain md:right-10 md:top-10 md:h-24 md:w-24"
                />
                <div className="inline-block rotate-[-1.5deg] rounded-xl bg-white px-5 py-3 text-blue-900 shadow-sheet">
                  <h3 className="font-display text-2xl font-extrabold md:text-3xl">{level.title}</h3>
                </div>
                <p className="mt-8 font-display text-[2.6rem] font-extrabold leading-[0.95] tracking-[-0.035em] md:text-[5.5rem]">
                  {level.subtext}
                </p>
                <p className={`mt-8 max-w-[62ch] text-[17px] leading-relaxed md:text-lg ${cover.body}`}>
                  {level.content}
                </p>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);

export default LevelsSection;
