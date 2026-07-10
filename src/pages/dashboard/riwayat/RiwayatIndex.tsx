import { Inbox } from "lucide-react";
import { useAdminStore } from "../../../store/useAdminStore";

export default function RiwayatIndex() {
  const { history, criteria } = useAdminStore();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-800 mb-1">Riwayat Konsultasi</h1>
      <p className="text-sm text-stone-500 mb-6">Daftar perhitungan SAW yang dijalankan customer.</p>

      {history.length === 0 ? (
        <div className="bg-white border border-rose-50 rounded-3xl p-10 text-center text-stone-400 flex flex-col items-center gap-2">
          <Inbox size={28} />
          Belum ada riwayat konsultasi customer.
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-rose-50 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-stone-400 border-b border-stone-100">
                <th className="px-5 py-3">Tanggal</th>
                {criteria.map((c) => (
                  <th key={c.key} className="px-5 py-3">{c.code}</th>
                ))}
                <th className="px-5 py-3">Top Rekomendasi</th>
                <th className="px-5 py-3">Skor</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id} className="border-b border-stone-50">
                  <td className="px-5 py-3 text-stone-500">{new Date(h.date).toLocaleString("id-ID")}</td>
                  {criteria.map((c) => (
                    <td key={c.key} className="px-5 py-3">{h.weights[c.key]}%</td>
                  ))}
                  <td className="px-5 py-3 font-semibold text-stone-700">{h.topResult}</td>
                  <td className="px-5 py-3 text-brand-600 font-display font-bold">{h.topScore.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
