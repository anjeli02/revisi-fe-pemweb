import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown, FlaskConical, Trophy, RotateCcw, SlidersHorizontal,
  Fingerprint, Target, Tag, TestTube, BadgeCheck, ShoppingBag, MapPin,
} from "lucide-react";
import ConsultShell from "../../component/ConsultShell";
import { useConsultStore } from "../../store/useConsultStore";
import type { SawResult, CriteriaKey } from "../../types/skincare";

const BAR_COLORS = ["bg-brand-500", "bg-rose-400", "bg-orange-400", "bg-emerald-400", "bg-sky-400"];

const FRIENDLY: Record<CriteriaKey, { icon: typeof Tag; label: string }> = {
  harga:          { icon: Tag,         label: "Harga" },
  jenisKulit:     { icon: Fingerprint, label: "Cocok jenis kulit" },
  masalahKulit:   { icon: Target,      label: "Atasi masalah kulit" },
  kandunganAktif: { icon: TestTube,    label: "Kandungan aktif" },
  bpom:           { icon: BadgeCheck,  label: "BPOM" },
};

// Toko offline per brand
const OFFLINE_STORES: Record<string, string[]> = {
  "Wardah":          ["Indomaret", "Alfamart", "Guardian", "Watson", "Sociolla"],
  "Emina":           ["Indomaret", "Alfamart", "Guardian", "Sociolla"],
  "Pond's":          ["Indomaret", "Alfamart", "Guardian", "Watson"],
  "Nivea":           ["Indomaret", "Alfamart", "Guardian", "Watson"],
  "Viva":            ["Indomaret", "Alfamart"],
  "Acnes":           ["Indomaret", "Alfamart", "Guardian", "Watson"],
  "Cetaphil":        ["Guardian", "Watson", "Sociolla", "Apotek"],
  "La Tulipe":       ["Indomaret", "Alfamart", "Guardian"],
  "Safi":            ["Indomaret", "Alfamart", "Guardian"],
  "Somethinc":       ["Sociolla", "Guardian", "Watson"],
  "Skintific":       ["Sociolla", "Guardian"],
  "Azarine":         ["Sociolla", "Guardian", "Watson"],
  "Glad2Glow":       ["Sociolla"],
  "The Originote":   ["Sociolla"],
  "Avoskin":         ["Sociolla", "Guardian"],
  "Whitelab":        ["Sociolla", "Guardian"],
  "Hanasui":         ["Indomaret", "Alfamart", "Sociolla"],
  "Implora":         ["Indomaret", "Alfamart"],
  "Erha":            ["Erha Clinic", "Sociolla"],
  "N'Pure":          ["Sociolla", "Guardian"],
  "COSRX":           ["Sociolla", "Guardian", "Watson"],
  "Some By Mi":      ["Sociolla", "Guardian", "Watson"],
  "Nature Republic": ["Guardian", "Watson", "Sociolla"],
};

function BuyLinks({ productName, brand }: { productName: string; brand: string }) {
  const query = encodeURIComponent(productName);
  const offlineStores = OFFLINE_STORES[brand] ?? ["Guardian", "Watson", "Sociolla"];

  const marketplaces = [
    {
      name: "Shopee",
      url: `https://shopee.co.id/search?keyword=${query}`,
      bg: "bg-pink-50 border border-pink-200 text-pink-600 hover:bg-pink-100",
    },
    {
      name: "Tokopedia",
      url: `https://www.tokopedia.com/search?st=product&q=${query}`,
      bg: "bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100",
    },
    {
      name: "TikTok Shop",
      url: `https://www.tiktok.com/search?q=${query}`,
      bg: "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100",
    },
  ];

  return (
    <div className="mt-4 pt-4 border-t border-stone-100 space-y-3">
      {/* Online */}
      <div>
        <p className="text-xs font-semibold text-stone-500 mb-2 flex items-center gap-1.5">
          <ShoppingBag size={12} /> Beli Online
        </p>
        <div className="flex flex-wrap gap-2">
          {marketplaces.map((m) => (
            <a
              key={m.name}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 ${m.bg} text-xs font-semibold px-3 py-1.5 rounded-full transition`}
            >
              {m.name}
            </a>
          ))}
        </div>
      </div>

      {/* Offline */}
      <div>
        <p className="text-xs font-semibold text-stone-500 mb-2 flex items-center gap-1.5">
          <MapPin size={12} /> Tersedia di Toko Offline
        </p>
        <div className="flex flex-wrap gap-1.5">
          {offlineStores.map((store) => (
            <span
              key={store}
              className="text-xs font-medium px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-200"
            >
              {store}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

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
    <div className={`bg-white rounded-3xl border p-6 ${
      idx === 0
        ? "border-brand-300 shadow-[0_10px_30px_-10px_rgba(240,77,110,0.25)]"
        : "border-rose-50 shadow-sm"
    }`}>
      {/* Header produk */}
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
          <p className="font-display font-bold text-2xl text-brand-600">
            {item.finalScore.toFixed(3)}
          </p>
        </div>
      </div>

      {/* Breakdown */}
      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-brand-600 font-semibold mt-4 hover:underline inline-flex items-center gap-1"
      >
        Kenapa direkomendasikan?{" "}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
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
                    <Icon size={12} className="text-stone-400" />
                    {f.label} — kecocokan {(b.norm * 100).toFixed(0)}%, prioritas kamu {(b.weight * 100).toFixed(0)}%
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

      {/* Link pembelian */}
      <BuyLinks productName={item.name} brand={item.category} />
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
            onClick={() => { reset(); navigate("/konsultasi"); }}
            className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-2.5 rounded-full shadow-[0_10px_30px_-10px_rgba(240,77,110,0.35)] inline-flex items-center gap-2"
          >
            <RotateCcw size={16} /> Mulai Ulang
          </button>
        </div>
      </div>
    </ConsultShell>
  );
}