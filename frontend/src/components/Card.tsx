import React from "react";

interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <section>
            <div className="group h-52 w-80 [perspective:1000px]">
              <div className="relative bg-amber-500 h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 flex justify-center items-center h-full w-full rounded-xl [backface-visibility:hidden]">
                  <h2 className="md:my-6 text-2xl text-center">{title}</h2>
                </div>
                <div className="absolute bg-amber-600 inset-0 h-full w-full rounded-xl px-12 text-center text-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="flex min-h-full flex-row items-center justify-center">
                    <p className="text-pretty text-center text-xs m-4">
                      {content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
    </section>
  );
};

export default Card;
