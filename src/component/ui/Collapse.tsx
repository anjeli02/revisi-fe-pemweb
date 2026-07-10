import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapseProps {
  title: string;
  description: string;
}

export const Collapse: React.FC<CollapseProps> = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer w-full px-6 py-5 flex items-center gap-4 text-left"
      >
        <div className="p-2 bg-brand-50 rounded-full shrink-0">
          <ChevronDown
            size={18}
            className={`text-brand-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
        <span className="font-semibold text-stone-800">{title}</span>
      </button>

      {isOpen && (
        <div className="px-6 pb-5 pt-1">
          <p className="text-stone-500 text-sm leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  );
};
