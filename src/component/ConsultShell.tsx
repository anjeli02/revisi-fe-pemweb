import type { ReactNode } from "react";
import { Droplet, Target, Sparkles as Sliders, Trophy } from "lucide-react";
import Stepper from "./ui/Stepper";

interface ConsultShellProps {
  step: number;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function ConsultShell({ step, title, subtitle, children }: ConsultShellProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-[280px_1fr] gap-12">
      <aside className="hidden lg:block">
        <div className="bg-linear-to-b from-brand-50 to-peach-50 rounded-3xl p-6 sticky top-24">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-4">
            <Droplet className="text-brand-500" size={22} />
          </div>
          <h3 className="font-display font-bold text-lg text-stone-800 mb-2">Konsultasi Skincare</h3>
          <p className="text-sm text-stone-500 mb-6">
            Jawab beberapa pertanyaan simpel, dan kami carikan skincare yang paling pas buat kulitmu.
          </p>
          <div className="space-y-4 text-sm">
            <div className="flex gap-3">
              <Droplet className="text-brand-500 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-semibold text-stone-700">Jenis kulitmu</p>
                <p className="text-stone-400">Berminyak, kering, dll</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Target className="text-brand-500 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-semibold text-stone-700">Masalah utamamu</p>
                <p className="text-stone-400">Yang paling ingin diatasi</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Sliders className="text-brand-500 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-semibold text-stone-700">Prioritas lain</p>
                <p className="text-stone-400">Harga, kandungan, BPOM</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Trophy className="text-brand-500 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-semibold text-stone-700">Rekomendasi</p>
                <p className="text-stone-400">Skincare paling cocok untukmu</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <section>
        <Stepper active={step} />
        <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-800 mb-1">{title}</h1>
        <p className="text-stone-500 mb-8">{subtitle}</p>
        {children}
      </section>
    </div>
  );
}
