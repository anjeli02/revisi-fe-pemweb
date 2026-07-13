import { useEffect, useState } from "react";
import { Trash2, Star } from "lucide-react";
import { getAllRatingsApi, deleteRatingApi } from "../../../services/skincareApi";

type RatingRow = {
  id: number;
  kualitas: number;
  popularitas: number;
  desain: number;
  review: string | null;
  createdAt: string;
  user: { id: number; username: string; email: string };
  product: { id: number; nama: string; kode: string };
};

export default function RatingIndex() {
  const [ratings, setRatings] = useState<RatingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      setRatings(await getAllRatingsApi());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus rating ini?")) return;
    setDeletingId(id);
    try {
      await deleteRatingApi(id);
      setRatings((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  const average = (r: RatingRow) => ((r.kualitas + r.popularitas + r.desain) / 3).toFixed(1);

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-800 mb-1">Rating Produk</h1>
      <p className="text-stone-500 mb-6">Semua rating & komentar yang dikirim pengguna.</p>

      <div className="bg-white rounded-2xl border border-rose-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-rose-50/60 text-stone-500 text-xs uppercase">
            <tr>
              <th className="text-left px-4 py-3">Produk</th>
              <th className="text-left px-4 py-3">Pengguna</th>
              <th className="text-center px-4 py-3">Kualitas</th>
              <th className="text-center px-4 py-3">Popularitas</th>
              <th className="text-center px-4 py-3">Desain</th>
              <th className="text-center px-4 py-3">Rata-rata</th>
              <th className="text-left px-4 py-3">Komentar</th>
              <th className="text-left px-4 py-3">Tanggal</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={9} className="text-center py-8 text-stone-400">Memuat...</td></tr>
            ) : ratings.length === 0 ? (
              <tr><td colSpan={9} className="text-center py-8 text-stone-400">Belum ada rating.</td></tr>
            ) : (
              ratings.map((r) => (
                <tr key={r.id} className="border-t border-rose-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-stone-700">{r.product.nama}</p>
                    <p className="text-xs text-stone-400">{r.product.kode}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-stone-700">{r.user.username}</p>
                    <p className="text-xs text-stone-400">{r.user.email}</p>
                  </td>
                  <td className="text-center px-4 py-3">{r.kualitas}</td>
                  <td className="text-center px-4 py-3">{r.popularitas}</td>
                  <td className="text-center px-4 py-3">{r.desain}</td>
                  <td className="text-center px-4 py-3">
                    <span className="inline-flex items-center gap-1 font-semibold text-brand-600">
                      <Star size={12} className="fill-amber-400 text-amber-400" /> {average(r)}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-xs text-stone-600">{r.review || "-"}</td>
                  <td className="px-4 py-3 text-xs text-stone-400 whitespace-nowrap">
                    {new Date(r.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(r.id)}
                      disabled={deletingId === r.id}
                      className="text-rose-400 hover:text-rose-600 disabled:opacity-40"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}