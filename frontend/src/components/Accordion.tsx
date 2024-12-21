import React, { useState } from 'react';

type AccordionItem = {
  title: string;
  content: string;
};

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col w-full p-2">
      {items.map((item, index) => (
        <div key={index} className="my-1 bg-amber-500 border-2 border-amber-800 rounded-md">
          <button
            className="text-left flex items-center justify-between w-full p-2"
            onClick={() => toggle(index)}
          >
            <span>{item.title}</span>
            <i className="fas fa-caret-down p-2"></i>
          </button>
          {openIndex === index && (
            <div className="text-sm">
                <div className="w-full border-t-2 border-amber-800"></div>
                <p className="p-2">{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
