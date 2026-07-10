import { Link } from "react-router-dom";
import { Package, SlidersHorizontal, History, Workflow } from "lucide-react";
import { useAdminStore } from "../../store/useAdminStore";

export default function DashboardIndex() {
  const { products, criteria, history } = useAdminStore();

  const stats = [
    { label: "Produk Terdaftar", value: products.length, to: "/dashboard/produk", Icon: Package },
    { label: "Kriteria SAW Aktif", value: criteria.length, to: "/dashboard/kriteria", Icon: SlidersHorizontal },
    { label: "Riwayat Konsultasi", value: history.length, to: "/dashboard/riwayat", Icon: History },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-800 mb-1">Ringkasan</h1>
      <p className="text-stone-500 text-sm mb-8">Pantau data master perhitungan SAW di sini.</p>

      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        {stats.map(({ label, value, to, Icon }) => (
          <Link key={label} to={to} className="bg-white border border-rose-50 rounded-3xl p-6 hover:shadow-[0_10px_30px_-10px_rgba(240,77,110,0.25)] transition">
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-3">
              <Icon className="text-brand-500" size={20} />
            </div>
            <p className="font-display font-bold text-3xl text-stone-800">{value}</p>
            <p className="text-sm text-stone-500">{label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-brand-50 rounded-3xl p-6">
        <h2 className="font-semibold text-stone-700 mb-2 flex items-center gap-2">
          <Workflow size={18} className="text-brand-500" /> Alur Sistem SPK (SAW)
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed">
          data produk &rarr; nilai kriteria (C1 harga, C2 jenis kulit, C3 masalah kulit, C4 kandungan aktif,
          C5 BPOM) &rarr; normalisasi benefit/cost &rarr; dikalikan bobot dari customer &rarr; diranking dari
          skor tertinggi &rarr; ditampilkan sebagai rekomendasi.
        </p>
      </div>
    </div>
  );
}
