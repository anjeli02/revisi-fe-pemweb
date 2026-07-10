import { Check } from "lucide-react";

interface StepperProps {
  active: number;
}

const steps = ["Jenis Kulit", "Masalah Utama", "Prioritas Lain", "Hasil"];

export default function Stepper({ active }: StepperProps) {
  return (
    <div className="flex items-center justify-between mb-10 max-w-lg">
      {steps.map((s, i) => {
        const n = i + 1;
        const state = n < active ? "done" : n === active ? "active" : "todo";
        const circle =
          state === "done"
            ? "bg-brand-500 text-white"
            : state === "active"
            ? "bg-brand-500 text-white ring-4 ring-brand-100"
            : "bg-white text-stone-400 border border-stone-200";
        const label =
          state === "active" ? "text-brand-600 font-semibold" : state === "done" ? "text-stone-600" : "text-stone-400";
        return (
          <div key={s} className={`flex items-center ${i < steps.length - 1 ? "flex-1" : ""}`}>
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${circle}`}>
                {state === "done" ? <Check size={16} /> : n}
              </div>
              <span className={`text-xs ${label} whitespace-nowrap`}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-px flex-1 mx-2 ${n < active ? "bg-brand-400" : "bg-stone-200"}`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
