import { useEffect, useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Search, Trophy, Loader2, AlertCircle } from "lucide-react";
import { getProducts } from "../../../services/skincareApi";

type ApiProduct = {
  id: number; kode: string; nama: string;
  brand?: { nama: string };
  nilaiHarga: number; nilaiJenisKulit: number;
  nilaiMasalahKulit: number; nilaiKandungan: number; nilaiBpom: number;
};

type SawRow = ApiProduct & {
  normC1: number; normC2: number; normC3: number; normC4: number; normC5: number;
  skorAkhir: number; rank: number;
};

// Bobot sesuai Excel
const BOBOTS = { C1: 0.20, C2: 0.25, C3: 0.25, C4: 0.20, C5: 0.10 };

const KRITERIA = [
  { kode: "C1", nama: "Harga Produk",             bobot: "20%", type: "Cost",    color: "bg-rose-50 text-rose-600" },
  { kode: "C2", nama: "Jenis Kulit",              bobot: "25%", type: "Benefit", color: "bg-emerald-50 text-emerald-600" },
  { kode: "C3", nama: "Masalah Kulit",            bobot: "25%", type: "Benefit", color: "bg-emerald-50 text-emerald-600" },
  { kode: "C4", nama: "Kandungan Aktif",          bobot: "20%", type: "Benefit", color: "bg-emerald-50 text-emerald-600" },
  { kode: "C5", nama: "Status BPOM",              bobot: "10%", type: "Benefit", color: "bg-emerald-50 text-emerald-600" },
];

function hitungSAW(products: ApiProduct[]): SawRow[] {
  if (!products.length) return [];

  const minC1 = Math.min(...products.map(p => p.nilaiHarga));
  const maxC2 = Math.max(...products.map(p => p.nilaiJenisKulit));
  const maxC3 = Math.max(...products.map(p => p.nilaiMasalahKulit));
  const maxC4 = Math.max(...products.map(p => p.nilaiKandungan));
  const maxC5 = Math.max(...products.map(p => p.nilaiBpom));

  const rows: SawRow[] = products.map(p => {
    const normC1 = p.nilaiHarga       === 0 ? 0 : minC1 / p.nilaiHarga;
    const normC2 = maxC2 === 0 ? 0 : p.nilaiJenisKulit   / maxC2;
    const normC3 = maxC3 === 0 ? 0 : p.nilaiMasalahKulit / maxC3;
    const normC4 = maxC4 === 0 ? 0 : p.nilaiKandungan    / maxC4;
    const normC5 = maxC5 === 0 ? 0 : p.nilaiBpom         / maxC5;

    const skorAkhir =
      normC1 * BOBOTS.C1 +
      normC2 * BOBOTS.C2 +
      normC3 * BOBOTS.C3 +
      normC4 * BOBOTS.C4 +
      normC5 * BOBOTS.C5;

    return { ...p, normC1, normC2, normC3, normC4, normC5, skorAkhir, rank: 0 };
  });

  rows.sort((a, b) => b.skorAkhir - a.skorAkhir);
  rows.forEach((r, i) => (r.rank = i + 1));
  return rows;
}

function fmt(n: number) { return n.toFixed(4); }

function ValBadge({ val }: { val: number }) {
  const colors =
    val === 5 ? "bg-emerald-50 text-emerald-700" :
    val === 4 ? "bg-sky-50 text-sky-700" :
    val === 3 ? "bg-amber-50 text-amber-700" :
    val === 2 ? "bg-orange-50 text-orange-700" :
    "bg-rose-50 text-rose-700";
  return (
    <span className={`inline-flex w-7 h-7 rounded-lg text-xs font-bold items-center justify-center ${colors}`}>
      {val}
    </span>
  );
}

export default function SpkIndex() {
  const [products, setProducts]   = useState<ApiProduct[]>([]);
  const [results, setResults]     = useState<SawRow[]>([]);
  const [loading, setLoading]     = useState(true);
  const [errMsg, setErrMsg]       = useState("");
  const [searchMatriks, setSearchMatriks] = useState("");
  const [searchHasil, setSearchHasil]     = useState("");
  const [showAllMatriks, setShowAllMatriks] = useState(false);
  const [showAllHasil, setShowAllHasil]     = useState(false);

  useEffect(() => {
    getProducts()
      .then((p) => {
        setProducts(p);
        setResults(hitungSAW(p));
        setLoading(false);
      })
      .catch(() => {
        setErrMsg("Gagal memuat data dari server.");
        setLoading(false);
      });
  }, []);

  const filteredMatriks = useMemo(() =>
    products.filter(p =>
      p.nama?.toLowerCase().includes(searchMatriks.toLowerCase()) ||
      p.kode?.toLowerCase().includes(searchMatriks.toLowerCase()) ||
      p.brand?.nama?.toLowerCase().includes(searchMatriks.toLowerCase())
    ), [products, searchMatriks]);

  const displayedMatriks = showAllMatriks ? filteredMatriks : filteredMatriks.slice(0, 10);

  const filteredHasil = useMemo(() =>
    results.filter(p =>
      p.nama?.toLowerCase().includes(searchHasil.toLowerCase()) ||
      p.kode?.toLowerCase().includes(searchHasil.toLowerCase())
    ), [results, searchHasil]);

  const displayedHasil = showAllHasil ? filteredHasil : filteredHasil.slice(0, 10);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-stone-800">Perhitungan SPK (SAW)</h1>
        <p className="text-stone-500 text-sm mt-0.5">
          Metode Simple Additive Weighting dengan bobot sesuai ketentuan.
        </p>
      </div>

      {errMsg && (
        <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 rounded-2xl px-5 py-4 text-sm text-rose-700">
          <AlertCircle size={18} className="shrink-0" /> {errMsg}
        </div>
      )}

      {/* Info Bobot */}
      <div className="bg-white border border-rose-50 rounded-3xl p-6">
        <h2 className="font-display font-bold text-stone-800 mb-4">Bobot Kriteria</h2>
        <div className="grid grid-cols-5 gap-3">
          {KRITERIA.map((k) => (
            <div key={k.kode} className="text-center">
              <div className="bg-stone-50 rounded-2xl p-4 mb-2">
                <p className="font-display font-bold text-stone-700 text-sm">{k.kode}</p>
                <p className="font-display font-bold text-2xl text-brand-600 mt-1">{k.bobot}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full mt-2 inline-block ${k.color}`}>
                  {k.type}
                </span>
              </div>
              <p className="text-xs text-stone-500 leading-tight">{k.nama}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-stone-400">
          <strong className="text-stone-500">Rumus normalisasi:</strong>&nbsp;
          C1 (Cost) = nilai terkecil ÷ nilai produk &nbsp;·&nbsp;
          C2–C5 (Benefit) = nilai produk ÷ nilai terbesar &nbsp;·&nbsp;
          Skor Akhir = Σ (normalisasi × bobot)
        </div>
      </div>

      {/* Matriks Keputusan */}
      <div className="bg-white border border-rose-50 rounded-3xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 flex-wrap gap-3">
          <div>
            <h2 className="font-display font-bold text-stone-800">Matriks Keputusan</h2>
            <p className="text-xs text-stone-400">Nilai C1–C5 tiap produk (skala 1–5)</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
            <input
              value={searchMatriks}
              onChange={e => setSearchMatriks(e.target.value)}
              placeholder="Cari produk..."
              className="border-2 border-stone-200 rounded-full pl-8 pr-4 py-2 text-sm focus:border-brand-400 focus:outline-none w-48"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 gap-2 text-stone-400">
            <Loader2 size={20} className="animate-spin" /> Memuat data...
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-stone-400 border-b border-stone-100 text-xs uppercase tracking-wide">
                    <th className="px-5 py-3">No</th>
                    <th className="px-5 py-3">Kode</th>
                    <th className="px-5 py-3">Nama Produk</th>
                    <th className="px-5 py-3">Brand</th>
                    <th className="px-5 py-3 text-center">C1 (20%)</th>
                    <th className="px-5 py-3 text-center">C2 (25%)</th>
                    <th className="px-5 py-3 text-center">C3 (25%)</th>
                    <th className="px-5 py-3 text-center">C4 (20%)</th>
                    <th className="px-5 py-3 text-center">C5 (10%)</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedMatriks.length === 0 ? (
                    <tr><td colSpan={9} className="px-5 py-10 text-center text-stone-400">Produk tidak ditemukan</td></tr>
                  ) : (
                    displayedMatriks.map((p, idx) => (
                      <tr key={p.id} className="border-b border-stone-50 hover:bg-rose-50/30 transition">
                        <td className="px-5 py-3 text-stone-400">{idx + 1}</td>
                        <td className="px-5 py-3 font-mono text-xs text-stone-500">{p.kode}</td>
                        <td className="px-5 py-3 font-semibold text-stone-700">{p.nama}</td>
                        <td className="px-5 py-3 text-stone-500">{p.brand?.nama ?? "-"}</td>
                        <td className="px-5 py-3 text-center"><ValBadge val={p.nilaiHarga} /></td>
                        <td className="px-5 py-3 text-center"><ValBadge val={p.nilaiJenisKulit} /></td>
                        <td className="px-5 py-3 text-center"><ValBadge val={p.nilaiMasalahKulit} /></td>
                        <td className="px-5 py-3 text-center"><ValBadge val={p.nilaiKandungan} /></td>
                        <td className="px-5 py-3 text-center"><ValBadge val={p.nilaiBpom} /></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {filteredMatriks.length > 10 && (
              <div className="px-5 py-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                <span>Menampilkan {displayedMatriks.length} dari {filteredMatriks.length} produk</span>
                <button onClick={() => setShowAllMatriks(!showAllMatriks)}
                  className="text-brand-500 font-semibold hover:underline flex items-center gap-1">
                  {showAllMatriks ? <><ChevronUp size={13}/> Sembunyikan</> : <><ChevronDown size={13}/> Lihat semua</>}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Hasil Ranking SAW */}
      <div className="bg-white border border-rose-50 rounded-3xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
              <Trophy className="text-amber-500" size={18} />
            </div>
            <div>
              <h2 className="font-display font-bold text-stone-800">Hasil Ranking SAW</h2>
              <p className="text-xs text-stone-400">{results.length} produk diranking berdasarkan skor akhir</p>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
            <input
              value={searchHasil}
              onChange={e => setSearchHasil(e.target.value)}
              placeholder="Cari produk..."
              className="border-2 border-stone-200 rounded-full pl-8 pr-4 py-2 text-sm focus:border-brand-400 focus:outline-none w-48"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-stone-400 border-b border-stone-100 text-xs uppercase tracking-wide">
                <th className="px-5 py-3">Rank</th>
                <th className="px-5 py-3">Kode</th>
                <th className="px-5 py-3">Nama Produk</th>
                <th className="px-5 py-3">Brand</th>
                <th className="px-5 py-3 text-center">Norm C1</th>
                <th className="px-5 py-3 text-center">Norm C2</th>
                <th className="px-5 py-3 text-center">Norm C3</th>
                <th className="px-5 py-3 text-center">Norm C4</th>
                <th className="px-5 py-3 text-center">Norm C5</th>
                <th className="px-5 py-3 text-center">Skor Akhir</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={10} className="px-5 py-16 text-center">
                  <div className="flex items-center justify-center gap-2 text-stone-400">
                    <Loader2 size={20} className="animate-spin" /> Menghitung...
                  </div>
                </td></tr>
              ) : displayedHasil.map((r) => {
                const isTop3 = r.rank <= 3;
                const medal = r.rank === 1 ? "🥇" : r.rank === 2 ? "🥈" : "🥉";
                return (
                  <tr key={r.id} className={`border-b transition ${isTop3 ? "bg-amber-50/40 hover:bg-amber-50/70" : "hover:bg-rose-50/30"}`}>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 font-bold text-sm ${
                        r.rank === 1 ? "text-amber-500" : r.rank === 2 ? "text-stone-500" : r.rank === 3 ? "text-orange-400" : "text-stone-400"
                      }`}>
                        {isTop3 ? medal : ""} #{r.rank}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-stone-500">{r.kode}</td>
                    <td className="px-5 py-3 font-semibold text-stone-700">{r.nama}</td>
                    <td className="px-5 py-3 text-stone-500">{r.brand?.nama ?? "-"}</td>
                    <td className="px-5 py-3 text-center font-mono text-xs text-stone-600">{fmt(r.normC1)}</td>
                    <td className="px-5 py-3 text-center font-mono text-xs text-stone-600">{fmt(r.normC2)}</td>
                    <td className="px-5 py-3 text-center font-mono text-xs text-stone-600">{fmt(r.normC3)}</td>
                    <td className="px-5 py-3 text-center font-mono text-xs text-stone-600">{fmt(r.normC4)}</td>
                    <td className="px-5 py-3 text-center font-mono text-xs text-stone-600">{fmt(r.normC5)}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`font-display font-bold ${
                        r.rank === 1 ? "text-amber-500 text-base" : r.rank <= 3 ? "text-brand-600" : "text-stone-700"
                      }`}>
                        {fmt(r.skorAkhir)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredHasil.length > 10 && (
          <div className="px-5 py-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
            <span>Menampilkan {displayedHasil.length} dari {filteredHasil.length} produk</span>
            <button onClick={() => setShowAllHasil(!showAllHasil)}
              className="text-brand-500 font-semibold hover:underline flex items-center gap-1">
              {showAllHasil ? <><ChevronUp size={13}/> Sembunyikan</> : <><ChevronDown size={13}/> Lihat semua {filteredHasil.length} produk</>}
            </button>
          </div>
        )}
      </div>

    </div>
  );
}