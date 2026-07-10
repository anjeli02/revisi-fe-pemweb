import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ChoiceCardProps {
  icon: LucideIcon;
  label: string;
  desc?: string;
  selected: boolean;
  onClick: () => void;
}

export default function ChoiceCard({ icon: Icon, label, desc, selected, onClick }: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full text-left rounded-2xl border-2 p-4 flex items-center gap-4 transition ${
        selected ? "border-brand-400 bg-brand-50" : "border-stone-100 bg-white hover:border-brand-200"
      }`}
    >
      <span
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          selected ? "bg-brand-500 text-white" : "bg-stone-50 text-stone-400"
        }`}
      >
        <Icon size={18} />
      </span>
      <span className="flex-1">
        <span className={`block font-semibold ${selected ? "text-brand-700" : "text-stone-700"}`}>{label}</span>
        {desc && <span className="block text-xs text-stone-400 mt-0.5">{desc}</span>}
      </span>
      {selected && (
        <span className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center shrink-0">
          <Check size={14} />
        </span>
      )}
    </button>
  );
}
