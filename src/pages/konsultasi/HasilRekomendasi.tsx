import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, FlaskConical, Trophy, RotateCcw, SlidersHorizontal, Fingerprint, Target, Tag, TestTube, BadgeCheck } from "lucide-react";
import ConsultShell from "../../component/ConsultShell";
import { useConsultStore } from "../../store/useConsultStore";
import type { SawResult, CriteriaKey } from "../../types/skincare";

const BAR_COLORS = ["bg-brand-500", "bg-rose-400", "bg-orange-400", "bg-emerald-400", "bg-sky-400"];

// Bahasa ramah-user, terpisah dari nama teknis (C1-C5, Cost/Benefit) yang
// dipakai di halaman admin "Kelola Kriteria". Icon-nya sama dengan yang dipakai
// di step Prioritas Lain (Tag/TestTube/BadgeCheck) supaya konsisten.
const FRIENDLY: Record<CriteriaKey, { icon: typeof Tag; label: string }> = {
  harga: { icon: Tag, label: "Harga" },
  jenisKulit: { icon: Fingerprint, label: "Cocok jenis kulit" },
  masalahKulit: { icon: Target, label: "Atasi masalah kulit" },
  kandunganAktif: { icon: TestTube, label: "Kandungan aktif" },
  bpom: { icon: BadgeCheck, label: "BPOM" },
};

function RankBadge({ rank }: { rank: number }) {
  if (rank <= 3) {
    return (
      <span className="inline-flex items-center gap-1 text-amber-500 font-semibold">
        <Trophy size={14} /> #{rank}
      </span>
    );
  }
  return <span className="text-stone-400 font-semibold">#{rank}</span>;
}

function ResultCard({ item, idx }: { item: SawResult; idx: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`bg-white rounded-3xl border p-6 ${
        idx === 0 ? "border-brand-300 shadow-[0_10px_30px_-10px_rgba(240,77,110,0.25)]" : "border-rose-50 shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center shrink-0">
            <FlaskConical className="text-brand-500" size={24} />
          </div>
          <div>
            <p className="text-xs text-stone-400 font-semibold flex items-center gap-2">
              <RankBadge rank={item.rank} /> &middot; {item.code} &middot; {item.category}
            </p>
            <h3 className="font-display font-bold text-lg text-stone-800">{item.name}</h3>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-stone-400">Skor Kecocokan</p>
          <p className="font-display font-bold text-2xl text-brand-600">{item.finalScore.toFixed(3)}</p>
        </div>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-brand-600 font-semibold mt-4 hover:underline inline-flex items-center gap-1"
      >
        Kenapa direkomendasikan? <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="mt-4 space-y-2.5 bg-stone-50 rounded-2xl p-4">
          {item.breakdown.map((b, i) => {
            const f = FRIENDLY[b.key];
            const Icon = f.icon;
            return (
              <div key={b.key}>
                <div className="flex justify-between text-xs text-stone-500 mb-1">
                  <span className="inline-flex items-center gap-1.5">
                    <Icon size={12} className="text-stone-400" /> {f.label} — kecocokan {(b.norm * 100).toFixed(0)}%,
                    prioritas kamu {(b.weight * 100).toFixed(0)}%
                  </span>
                  <span className="font-semibold text-stone-600">{(b.contrib * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${BAR_COLORS[i % BAR_COLORS.length]}`}
                    style={{ width: `${Math.min(b.contrib * 100, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function HasilRekomendasi() {
  const navigate = useNavigate();
  const { results, reset, skinType, concern } = useConsultStore();

  useEffect(() => {
    if (!results) navigate("/konsultasi");
  }, [results, navigate]);

  if (!results) return null;

  return (
    <ConsultShell
      step={4}
      title="Hasil Rekomendasi"
      subtitle={`Skincare paling cocok buat kulit ${skinType?.toLowerCase() ?? "kamu"}, fokus atasi ${
        concern?.toLowerCase() ?? "masalah kulitmu"
      }.`}
    >
      <div className="space-y-4">
        {results.map((item, i) => (
          <ResultCard key={item.id} item={item} idx={i} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-10 bg-brand-50 rounded-3xl p-6">
        <p className="text-sm text-stone-600">Ingin coba kombinasi prioritas lain? Sesuaikan kembali.</p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/konsultasi/prioritas")}
            className="bg-white border-2 border-brand-300 text-brand-600 font-semibold px-5 py-2.5 rounded-full hover:bg-brand-50 inline-flex items-center gap-2"
          >
            <SlidersHorizontal size={16} /> Ubah Prioritas
          </button>
          <button
            onClick={() => {
              reset();
              navigate("/konsultasi");
            }}
            className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-2.5 rounded-full shadow-[0_10px_30px_-10px_rgba(240,77,110,0.35)] inline-flex items-center gap-2"
          >
            <RotateCcw size={16} /> Mulai Ulang
          </button>
        </div>
      </div>
    </ConsultShell>
  );
}
