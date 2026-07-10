import { useState } from "react";
import { FlaskConical, Search } from "lucide-react";
import { useAdminStore } from "../store/useAdminStore";

const CATEGORIES = ["Semua", "Pembersih", "Toner", "Serum", "Pelembap", "Sunscreen", "Masker"];

export default function Katalog() {
  const { products } = useAdminStore();
  const [filter, setFilter] = useState("Semua");
  const [query, setQuery] = useState("");

  const filtered = products
    .filter((p) => filter === "Semua" || p.category === filter)
    .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-stone-800 mb-2">Katalog Skincare</h1>
        <p className="text-stone-500">Semua produk yang dianalisis oleh sistem rekomendasi GlowMatch ({products.length} produk).</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk..."
            className="w-full border-2 border-stone-200 rounded-full pl-9 pr-4 py-2 text-sm focus:border-brand-400 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition ${
                filter === c ? "border-brand-400 bg-brand-50 text-brand-600" : "border-stone-200 text-stone-500"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white rounded-3xl border border-rose-50 shadow-sm p-5 hover:shadow-[0_10px_30px_-10px_rgba(240,77,110,0.25)] transition">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mb-3">
              <FlaskConical className="text-brand-500" size={22} />
            </div>
            <p className="text-xs text-brand-500 font-semibold">{p.code}</p>
            <h3 className="font-display font-bold text-stone-800">{p.name}</h3>
            <p className="text-xs text-stone-400 mb-3">{p.category}</p>
            <div className="grid grid-cols-5 gap-1 text-center text-[11px]">
              <div><p className="font-semibold text-stone-700">{p.harga}</p><p className="text-stone-400">C1</p></div>
              <div><p className="font-semibold text-stone-700">{p.jenisKulit}</p><p className="text-stone-400">C2</p></div>
              <div><p className="font-semibold text-stone-700">{p.masalahKulit}</p><p className="text-stone-400">C3</p></div>
              <div><p className="font-semibold text-stone-700">{p.kandunganAktif}</p><p className="text-stone-400">C4</p></div>
              <div><p className="font-semibold text-stone-700">{p.bpom}</p><p className="text-stone-400">C5</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
