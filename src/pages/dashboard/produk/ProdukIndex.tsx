import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useAdminStore } from "../../../store/useAdminStore";

export default function ProdukIndex() {
  const { products, deleteProduct } = useAdminStore();

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-800">Produk Skincare</h1>
          <p className="text-sm text-stone-500">{products.length} produk terdaftar</p>
        </div>
        <Link
          to="/dashboard/produk/create"
          className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-[0_10px_30px_-10px_rgba(240,77,110,0.35)] inline-flex items-center gap-2"
        >
          <Plus size={16} /> Tambah Produk
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-rose-50 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-stone-400 border-b border-stone-100">
              <th className="px-5 py-3">Kode</th>
              <th className="px-5 py-3">Produk</th>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3">C1</th>
              <th className="px-5 py-3">C2</th>
              <th className="px-5 py-3">C3</th>
              <th className="px-5 py-3">C4</th>
              <th className="px-5 py-3">C5</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-stone-50 hover:bg-rose-50/40">
                <td className="px-5 py-3 text-stone-400">{p.code}</td>
                <td className="px-5 py-3 font-semibold text-stone-700">{p.name}</td>
                <td className="px-5 py-3 text-stone-500">{p.category}</td>
                <td className="px-5 py-3">{p.harga}</td>
                <td className="px-5 py-3">{p.jenisKulit}</td>
                <td className="px-5 py-3">{p.masalahKulit}</td>
                <td className="px-5 py-3">{p.kandunganAktif}</td>
                <td className="px-5 py-3">{p.bpom}</td>
                <td className="px-5 py-3 text-right whitespace-nowrap">
                  <Link to={`/dashboard/produk/edit/${p.id}`} className="text-brand-500 hover:underline mr-3 inline-flex items-center gap-1">
                    <Pencil size={14} /> Edit
                  </Link>
                  <button
                    onClick={() => confirm("Hapus produk ini?") && deleteProduct(p.id)}
                    className="text-stone-400 hover:text-rose-600 hover:underline inline-flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
