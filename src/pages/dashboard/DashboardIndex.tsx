import { Link } from "react-router-dom";
import { Package, SlidersHorizontal, History, Calculator, Search, Trophy, ChevronDown, ChevronUp, AlertCircle, Loader2, Plus } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { getProducts, getKriteria, getAllHistory } from "../../services/skincareApi";

// ─── Tipe dari API ────────────────────────────────────────────────────────────
type ApiProduct = {
  id: number;
  kode: string;
  nama: string;
  brand?: { nama: string };
  nilaiHarga: number;
  nilaiJenisKulit: number;
  nilaiMasalahKulit: number;
  nilaiKandungan: number;
  nilaiBpom: number;
};

type ApiKriteria = {
  id: number;
  kode: string;     // "C1","C2",...
  nama: string;
  type: string;     // "Cost" | "Benefit"
  bobot: number;    // 0.20, 0.25, ...
};

type SawRow = ApiProduct & {
  normC1: number; normC2: number; normC3: number; normC4: number; normC5: number;
  skorAkhir: number; rank: number;
};

// ─── Hitung SAW ──────────────────────────────────────────────────────────────
function hitungSAW(products: ApiProduct[], bobots: number[]): SawRow[] {
  if (!products.length) return [];

  const vals = (key: keyof ApiProduct) => products.map(p => Number(p[key]));
  
  const minC1 = Math.min(...vals("nilaiHarga"));
  const maxC2 = Math.max(...vals("nilaiJenisKulit"));
  const maxC3 = Math.max(...vals("nilaiMasalahKulit"));
  const maxC4 = Math.max(...vals("nilaiKandungan"));
  const maxC5 = Math.max(...vals("nilaiBpom"));

  const total = bobots.reduce((a, b) => a + b, 0) || 1;
  const [w1, w2, w3, w4, w5] = bobots.map(b => b / total);

  const rows: SawRow[] = products.map(p => {
    // C1 = Cost → normalisasi: min/nilai
    const normC1 = p.nilaiHarga === 0 ? 0 : minC1 / p.nilaiHarga;
    const normC2 = maxC2 === 0 ? 0 : p.nilaiJenisKulit / maxC2;
    const normC3 = maxC3 === 0 ? 0 : p.nilaiMasalahKulit / maxC3;
    const normC4 = maxC4 === 0 ? 0 : p.nilaiKandungan / maxC4;
    const normC5 = maxC5 === 0 ? 0 : p.nilaiBpom / maxC5;
    const skorAkhir = normC1*w1 + normC2*w2 + normC3*w3 + normC4*w4 + normC5*w5;
    return { ...p, normC1, normC2, normC3, normC4, normC5, skorAkhir, rank: 0 };
  });

  rows.sort((a, b) => b.skorAkhir - a.skorAkhir);
  rows.forEach((r, i) => (r.rank = i + 1));
  return rows;
}

function fmt(n: number) { return n.toFixed(4); }

// ─── Komponen badge nilai ─────────────────────────────────────────────────────
function ScoreBadge({ val }: { val: number }) {
  const colors = val === 5 ? "bg-emerald-50 text-emerald-700" : val === 4 ? "bg-sky-50 text-sky-700" : val === 3 ? "bg-amber-50 text-amber-700" : "bg-stone-100 text-stone-500";
  return <span className={`inline-block w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${colors}`}>{val}</span>;
}

// ─── Halaman Utama ────────────────────────────────────────────────────────────
export default function DashboardIndex() {
  // ── State stats ──
  const [productCount, setProductCount]   = useState(0);
  const [kriteriaCount, setKriteriaCount] = useState(0);
  const [historyCount, setHistoryCount]   = useState(0);

  // ── State SPK ──
  const [products, setProducts]     = useState<ApiProduct[]>([]);
  const [, setKriteria]     = useState<ApiKriteria[]>([]);
  const [loading, setLoading]       = useState(true);
  const [errMsg, setErrMsg]         = useState("");
  const [bobots, setBobots]         = useState<number[]>([20, 25, 25, 20, 10]);
  const [results, setResults]       = useState<SawRow[] | null>(null);
  const [calculated, setCalculated] = useState(false);
  const [searchMatriks, setSearchMatriks] = useState("");
  const [searchHasil, setSearchHasil]     = useState("");
  const [showAllMatriks, setShowAllMatriks] = useState(false);
  const [showAllHasil, setShowAllHasil]     = useState(false);

  // ── Fetch ──
  useEffect(() => {
    
    getProducts().then((d) => setProductCount(d.length)).catch(() => {});
    getKriteria().then((d) => setKriteriaCount(d.length)).catch(() => {});
    getAllHistory().then((d) => setHistoryCount(d.length)).catch(() => {});

  }, []);

  // ── Filter matriks ──
  const filteredMatriks = useMemo(() =>
    products.filter(p =>
      p.nama?.toLowerCase().includes(searchMatriks.toLowerCase()) ||
      p.kode?.toLowerCase().includes(searchMatriks.toLowerCase()) ||
      p.brand?.nama?.toLowerCase().includes(searchMatriks.toLowerCase())
    ), [products, searchMatriks]);

  const displayedMatriks = showAllMatriks ? filteredMatriks : filteredMatriks.slice(0, 10);

  // ── Filter hasil ──
  const filteredHasil = useMemo(() =>
    (results ?? []).filter(p =>
      p.nama?.toLowerCase().includes(searchHasil.toLowerCase()) ||
      p.kode?.toLowerCase().includes(searchHasil.toLowerCase())
    ), [results, searchHasil]);

  const displayedHasil = showAllHasil ? filteredHasil : filteredHasil.slice(0, 10);

  // ── Hitung ──
  const handleHitung = () => {
    const rows = hitungSAW(products, bobots);
    setResults(rows);
    setCalculated(true);
    setShowAllHasil(false);
    setTimeout(() => {
      document.getElementById("hasil-spk")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const totalBobot = bobots.reduce((a, b) => a + b, 0);
  const kriteriaMeta = [
    { kode: "C1", nama: "Harga Produk",              type: "Cost",    color: "bg-rose-50 text-rose-600" },
    { kode: "C2", nama: "Kesesuaian Jenis Kulit",    type: "Benefit", color: "bg-emerald-50 text-emerald-600" },
    { kode: "C3", nama: "Kesesuaian Masalah Kulit",  type: "Benefit", color: "bg-emerald-50 text-emerald-600" },
    { kode: "C4", nama: "Kandungan Aktif",            type: "Benefit", color: "bg-emerald-50 text-emerald-600" },
    { kode: "C5", nama: "Status BPOM",                type: "Benefit", color: "bg-emerald-50 text-emerald-600" },
  ];

  const stats = [
    { label: "Produk Terdaftar",   value: productCount,  to: "/dashboard/produk",   Icon: Package },
    { label: "Kriteria SAW Aktif", value: kriteriaCount, to: "/dashboard/kriteria", Icon: SlidersHorizontal },
    { label: "Riwayat Konsultasi", value: historyCount,  to: "/dashboard/riwayat",  Icon: History },
  ];

  return (
    <div className="space-y-8">

      {/* ── HEADER ── */}
      <div>
        <h1 className="font-display text-2xl font-bold text-stone-800">Ringkasan & Perhitungan SPK</h1>
        <p className="text-stone-500 text-sm mt-0.5">Pantau statistik dan jalankan kalkulasi SAW secara langsung.</p>
      </div>

      {/* ── ERROR BANNER ── */}
      {errMsg && (
        <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 rounded-2xl px-5 py-4 text-sm text-rose-700">
          <AlertCircle size={18} className="shrink-0" />
          {errMsg}
        </div>
      )}

      {/* ── STAT CARDS ── */}
      <div className="grid sm:grid-cols-3 gap-5">
        {stats.map(({ label, value, to, Icon }) => (
          <Link key={label} to={to}
            className="bg-white border border-rose-50 rounded-3xl p-6 hover:shadow-[0_10px_30px_-10px_rgba(240,77,110,0.25)] transition"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-3">
              <Icon className="text-brand-500" size={20} />
            </div>
            <p className="font-display font-bold text-3xl text-stone-800">
              {loading ? <span className="inline-block w-8 h-7 bg-stone-100 rounded animate-pulse" /> : value}
            </p>
            <p className="text-sm text-stone-500">{label}</p>
          </Link>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          SEKSI PERHITUNGAN SPK
      ══════════════════════════════════════════ */}

      {/* ── KONFIGURASI BOBOT ── */}
      <div className="bg-white border border-rose-50 rounded-3xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center">
              <Calculator className="text-brand-500" size={18} />
            </div>
            <div>
              <h2 className="font-display font-bold text-stone-800">Konfigurasi Bobot Kriteria</h2>
              <p className="text-xs text-stone-400">Atur bobot tiap kriteria (%) sebelum menjalankan kalkulasi SAW</p>
            </div>
          </div>
          <div className={`text-sm font-semibold px-3 py-1 rounded-full ${totalBobot === 100 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
            Total: {totalBobot}%
          </div>
        </div>

        <div className="p-6">
          {/* Grid C1-C5 */}
          <div className="grid grid-cols-5 gap-3 mb-5">
            {kriteriaMeta.map((k, i) => (
              <div key={k.kode} className="flex flex-col items-center gap-2">
                <span className="font-display font-bold text-stone-600 text-sm">{k.kode}</span>
                <input
                  type="number"
                  min={0} max={100} step={5}
                  value={bobots[i]}
                  onChange={(e) => {
                    const v = Math.max(0, Math.min(100, Number(e.target.value)));
                    setBobots(prev => prev.map((b, idx) => idx === i ? v : b));
                    setCalculated(false);
                  }}
                  className="w-full text-center border-2 border-stone-200 focus:border-brand-400 rounded-2xl py-3 font-display font-bold text-xl text-stone-800 outline-none transition"
                />
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${k.color}`}>{k.type}</span>
              </div>
            ))}
          </div>

          {/* Nama kriteria */}
          <div className="grid grid-cols-5 gap-3 mb-6 text-center">
            {kriteriaMeta.map(k => (
              <p key={k.kode} className="text-xs text-stone-400 leading-tight">{k.nama}</p>
            ))}
          </div>

          {/* Info + Tombol */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-xs text-stone-400">
              Skala nilai produk: 1–5 &nbsp;·&nbsp; C1 dihitung sebagai <strong>Cost</strong> (makin kecil makin baik) &nbsp;·&nbsp; C2–C5 dihitung sebagai <strong>Benefit</strong>
            </p>
            <button
              onClick={handleHitung}
              disabled={loading || products.length === 0}
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-7 py-3 rounded-full shadow-[0_10px_30px_-10px_rgba(240,77,110,0.4)] transition"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Calculator size={16} />}
              Hitung Ranking SAW
            </button>
          </div>
        </div>
      </div>

      {/* ── MATRIKS KEPUTUSAN ── */}
      <div className="bg-white border border-rose-50 rounded-3xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 flex-wrap gap-3">
          <div>
            <h2 className="font-display font-bold text-stone-800">Matriks Keputusan</h2>
            <p className="text-xs text-stone-400">Nilai awal C1–C5 setiap produk sebelum dinormalisasi</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
              <input
                value={searchMatriks}
                onChange={e => setSearchMatriks(e.target.value)}
                placeholder="Cari produk..."
                className="border-2 border-stone-200 rounded-full pl-8 pr-4 py-2 text-sm focus:border-brand-400 focus:outline-none w-48"
              />
            </div>
            <Link
              to="/dashboard/produk/create"
              className="inline-flex items-center gap-1.5 border-2 border-brand-300 text-brand-600 font-semibold text-sm px-4 py-2 rounded-full hover:bg-brand-50 transition"
            >
              <Plus size={14} /> Tambah Produk
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 gap-2 text-stone-400">
            <Loader2 size={20} className="animate-spin" /> Memuat data produk...
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
                    <th className="px-5 py-3 text-center">C1</th>
                    <th className="px-5 py-3 text-center">C2</th>
                    <th className="px-5 py-3 text-center">C3</th>
                    <th className="px-5 py-3 text-center">C4</th>
                    <th className="px-5 py-3 text-center">C5</th>
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
                        <td className="px-5 py-3 text-center"><ScoreBadge val={p.nilaiHarga} /></td>
                        <td className="px-5 py-3 text-center"><ScoreBadge val={p.nilaiJenisKulit} /></td>
                        <td className="px-5 py-3 text-center"><ScoreBadge val={p.nilaiMasalahKulit} /></td>
                        <td className="px-5 py-3 text-center"><ScoreBadge val={p.nilaiKandungan} /></td>
                        <td className="px-5 py-3 text-center"><ScoreBadge val={p.nilaiBpom} /></td>
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

      {/* ── HASIL RANKING SAW ── */}
      {calculated && results && (
        <div id="hasil-spk" className="bg-white border border-rose-50 rounded-3xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                <Trophy className="text-amber-500" size={18} />
              </div>
              <div>
                <h2 className="font-display font-bold text-stone-800">Hasil Ranking SAW</h2>
                <p className="text-xs text-stone-400">
                  Bobot yang dipakai: C1={bobots[0]}% · C2={bobots[1]}% · C3={bobots[2]}% · C4={bobots[3]}% · C5={bobots[4]}%
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
                <input
                  value={searchHasil}
                  onChange={e => setSearchHasil(e.target.value)}
                  placeholder="Cari produk..."
                  className="border-2 border-stone-200 rounded-full pl-8 pr-4 py-2 text-sm focus:border-brand-400 focus:outline-none w-48"
                />
              </div>
              <span className="text-xs text-stone-400 bg-brand-50 px-3 py-1.5 rounded-full font-semibold text-brand-600">
                {results.length} produk diranking
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-stone-400 border-b border-stone-100 text-xs uppercase tracking-wide">
                  <th className="px-5 py-3">Rank</th>
                  <th className="px-5 py-3">Kode</th>
                  <th className="px-5 py-3">Nama Produk</th>
                  <th className="px-5 py-3 text-center">Norm C1</th>
                  <th className="px-5 py-3 text-center">Norm C2</th>
                  <th className="px-5 py-3 text-center">Norm C3</th>
                  <th className="px-5 py-3 text-center">Norm C4</th>
                  <th className="px-5 py-3 text-center">Norm C5</th>
                  <th className="px-5 py-3 text-center font-bold text-stone-600">Skor Akhir</th>
                </tr>
              </thead>
              <tbody>
                {displayedHasil.map((r) => {
                  const isTop3 = r.rank <= 3;
                  const medal = r.rank === 1 ? "🥇" : r.rank === 2 ? "🥈" : "🥉";
                  return (
                    <tr key={r.id}
                      className={`border-b transition ${isTop3 ? "bg-amber-50/40 hover:bg-amber-50/70" : "hover:bg-rose-50/30"}`}
                    >
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center gap-1.5 font-bold text-sm ${
                          r.rank === 1 ? "text-amber-500" : r.rank === 2 ? "text-stone-500" : r.rank === 3 ? "text-orange-400" : "text-stone-400"
                        }`}>
                          {isTop3 ? medal : ""} #{r.rank}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-stone-500">{r.kode}</td>
                      <td className="px-5 py-3 font-semibold text-stone-700">{r.nama}</td>
                      <td className="px-5 py-3 text-center text-stone-600 font-mono text-xs">{fmt(r.normC1)}</td>
                      <td className="px-5 py-3 text-center text-stone-600 font-mono text-xs">{fmt(r.normC2)}</td>
                      <td className="px-5 py-3 text-center text-stone-600 font-mono text-xs">{fmt(r.normC3)}</td>
                      <td className="px-5 py-3 text-center text-stone-600 font-mono text-xs">{fmt(r.normC4)}</td>
                      <td className="px-5 py-3 text-center text-stone-600 font-mono text-xs">{fmt(r.normC5)}</td>
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

          {/* Info normalisasi */}
          <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 text-xs text-stone-400">
            <strong className="text-stone-500">Rumus SAW:</strong>&nbsp;
            C1 (Cost) = nilai terkecil ÷ nilai produk &nbsp;·&nbsp;
            C2–C5 (Benefit) = nilai produk ÷ nilai terbesar &nbsp;·&nbsp;
            Skor Akhir = Σ (normalisasi × bobot)
          </div>
        </div>
      )}
    </div>
  );
}
