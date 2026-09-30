import React from "react";
import Reveal from "../Reveal";
import Sticker from "../Sticker";
import SectionHeading from "../SectionHeading";
import ScrollWords from "./ScrollWords";

interface Statement {
  title: string;
  content: string;
}

const MissionVision: React.FC<{ mission?: Statement; vision?: Statement }> = ({
  mission,
  vision,
}) => (
  <>
    {mission && (
      <section className="px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-12 md:gap-8">
          <div className="relative md:col-span-3">
            <div className="md:sticky md:top-28">
              <SectionHeading title={mission.title} className="!mb-6" />
              <Sticker
                name="wing"
                rotate={-8}
                parallax={20}
                className="relative hidden h-28 w-36 md:block"
              />
            </div>
          </div>
          <ScrollWords
            text={mission.content}
            className="font-display text-[1.6rem] font-semibold leading-[1.28] tracking-[-0.015em] text-blue-900 md:col-span-9 md:text-[2.35rem]"
          />
        </div>
      </section>
    )}

    {vision && (
      <section className="px-3 md:px-5">
        <Reveal className="surface-dark relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-blue-900 px-6 py-16 text-white md:rounded-[3rem] md:px-16 md:py-24">
          <Sticker
            name="laurel"
            rotate={18}
            parallax={26}
            className="-right-6 -top-4 h-28 w-28 md:right-10 md:top-10 md:h-36 md:w-36"
          />
          <div className="relative max-w-3xl">
            <h2 className="font-display text-4xl font-extrabold text-amber-400 md:text-6xl">
              {vision.title}
            </h2>
            <p className="mt-6 max-w-[52ch] text-xl leading-relaxed text-blue-50 md:mt-8 md:text-2xl md:leading-relaxed">
              {vision.content}
            </p>
          </div>
        </Reveal>
      </section>
    )}
  </>
);

export default MissionVision;
