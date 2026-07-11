import { Inbox } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllHistory } from "../../../services/skincareApi";

export default function RiwayatIndex() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    getAllHistory().then(setHistory).catch(() => setHistory([]));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-800 mb-1">Riwayat Konsultasi</h1>
      <p className="text-sm text-stone-500 mb-6">Daftar perhitungan SAW yang dijalankan customer.</p>

      {history.length === 0 ? (
        <div className="bg-white border border-rose-50 rounded-3xl p-10 text-center text-stone-400 flex flex-col items-center gap-2">
          <Inbox size={28} />
          Belum ada riwayat konsultasi.
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-rose-50 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-stone-400 border-b border-stone-100">
                <th className="px-5 py-3">Tanggal</th>
                <th className="px-5 py-3">Harga</th>
                <th className="px-5 py-3">Jenis Kulit</th>
                <th className="px-5 py-3">Masalah Kulit</th>
                <th className="px-5 py-3">Kandungan</th>
                <th className="px-5 py-3">BPOM</th>
                <th className="px-5 py-3">Top Rekomendasi</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => {
                const top = Array.isArray(h.hasilJson) ? h.hasilJson[0] : null;
                return (
                  <tr key={h.id} className="border-b border-stone-50">
                    <td className="px-5 py-3 text-stone-500">{new Date(h.createAt).toLocaleString("id-ID")}</td>
                    <td className="px-5 py-3">{h.inputHarga}</td>
                    <td className="px-5 py-3">{h.inputJenisKulit}</td>
                    <td className="px-5 py-3">{h.inputMasalahKulit}</td>
                    <td className="px-5 py-3">{h.inputKandungan}</td>
                    <td className="px-5 py-3">{h.inputBpom}</td>
                    <td className="px-5 py-3 font-semibold text-stone-700">
                      {top ? `${top.kode} - ${top.nama} (${top.score})` : "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}