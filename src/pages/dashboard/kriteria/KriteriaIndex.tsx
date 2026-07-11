import { useEffect, useState } from "react";
import { getKriteria } from "../../../services/skincareApi";

export default function KriteriaIndex() {
  const [criteria, setCriteria] = useState<any[]>([]);

  useEffect(() => {
    getKriteria().then(setCriteria).catch(() => setCriteria([]));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-800 mb-1">Kriteria SAW</h1>
      <p className="text-sm text-stone-500 mb-6">Data kriteria dan bobot yang digunakan dalam perhitungan SAW.</p>

      <div className="space-y-4 max-w-2xl">
        {criteria.map((c) => (
          <div key={c.id} className="bg-white border border-rose-50 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="font-semibold text-stone-800">
                {c.kode} · {c.nama}{" "}
                <span className={`text-xs font-normal px-2 py-0.5 rounded-full ${c.type === "Benefit" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                  {c.type}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-20 border-2 border-stone-200 rounded-xl px-3 py-2 text-center font-semibold text-stone-700">
                {(c.bobot * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}