import { useParams, Navigate } from "react-router-dom";
import ProductForm from "./ProdukForm";
import { useAdminStore } from "../../../store/useAdminStore";

export default function ProdukEdit() {
  const { id } = useParams();
  const product = useAdminStore((s) => s.products.find((p) => p.id === id));

  if (!product) return <Navigate to="/dashboard/produk" replace />;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-800 mb-1">Edit Produk</h1>
      <p className="text-sm text-stone-500 mb-6">{product.code} &middot; {product.name}</p>
      <ProductForm existing={product} />
    </div>
  );
}
