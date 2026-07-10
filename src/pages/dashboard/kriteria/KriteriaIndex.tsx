import { useAdminStore } from "../../../store/useAdminStore";

export default function KriteriaIndex() {
  const { criteria, updateCriteriaWeight } = useAdminStore();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-800 mb-1">Kriteria SAW</h1>
      <p className="text-sm text-stone-500 mb-6">
        Bobot default berikut akan menjadi nilai awal slider saat customer mulai konsultasi. Customer tetap
        bisa mengubahnya.
      </p>

      <div className="space-y-4 max-w-2xl">
        {criteria.map((c) => (
          <div key={c.key} className="bg-white border border-rose-50 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="font-semibold text-stone-800">
                {c.code} &middot; {c.name}{" "}
                <span className={`text-xs font-normal px-2 py-0.5 rounded-full ${c.type === "benefit" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                  {c.type === "benefit" ? "Benefit" : "Cost"}
                </span>
              </p>
              <p className="text-xs text-stone-400">{c.desc}</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={0}
                max={100}
                value={c.defaultWeight}
                onChange={(e) => updateCriteriaWeight(c.key, Number(e.target.value) || 0)}
                className="w-20 border-2 border-stone-200 rounded-xl px-3 py-2 text-center"
              />
              <span className="text-stone-400 text-sm">%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
