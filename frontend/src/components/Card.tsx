import React, { useState } from "react";

interface CardProps {
  title: string;
  subtext: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, subtext, content }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <section>
      <div
        className={`group h-56 w-full lg:w-96 [perspective:1000px]`}
        onClick={handleFlip}
      >
        <div
          className={`relative bg-amber-500 h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          } group-hover:[transform:rotateY(180deg)]`}
        >
          <div className="absolute inset-0 flex flex-col justify-center items-center h-full w-full rounded-xl [backface-visibility:hidden]">
            <h2 className="text-4xl text-center font-bold">{title}</h2>
            <h3 className="text-2xl">{subtext}</h3>
          </div>
          <div className="absolute bg-amber-600 inset-0 h-full w-full rounded-xl px-8 text-center text-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div className="flex min-h-full flex-row items-center justify-center">
              <p className="text-pretty text-justify text-xs">{content}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
