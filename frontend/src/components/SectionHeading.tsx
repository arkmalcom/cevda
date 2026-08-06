import React from "react";

interface SectionHeadingProps {
  title: string;
  icon: string;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  icon,
  className = "",
}) => {
  return (
    <div
      className={`mb-10 grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-4 ${className}`}
    >
      <div className="flex min-w-0 items-center gap-3 md:gap-4">
        <span
          className="section-heading-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-blue-900 shadow-sm md:h-12 md:w-12"
          aria-hidden
        >
          <i className={`fas ${icon} text-sm md:text-base`} />
        </span>
        <div
          className="section-heading-line h-px min-w-2 flex-1 bg-amber-500/70"
          aria-hidden
        />
      </div>
      <h2 className="max-w-[11rem] px-1 text-center font-title text-xl font-bold leading-tight text-blue-800 sm:max-w-xs md:max-w-none md:px-2 md:text-4xl">
        {title}
      </h2>
      <div
        className="section-heading-line h-px min-w-2 bg-amber-500/70"
        aria-hidden
      />
    </div>
  );
};

export default SectionHeading;
