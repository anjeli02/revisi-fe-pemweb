import ProductForm from "./ProdukForm";

export default function ProdukCreate() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-800 mb-1">Tambah Produk</h1>
      <p className="text-sm text-stone-500 mb-6">Isi nilai tiap kriteria SAW untuk produk baru.</p>
      <ProductForm />
    </div>
  );
}
