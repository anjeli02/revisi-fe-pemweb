import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductForm from "./ProdukForm";
import { api } from "../../../lib/axios";

export default function ProdukEdit() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) return <Navigate to="/dashboard/produk" replace />;
  if (!product) return <p className="text-stone-400 p-6">Memuat...</p>;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-800 mb-1">Edit Produk</h1>
      <p className="text-sm text-stone-500 mb-6">{product.kode} · {product.nama}</p>
      <ProductForm existing={product} />
    </div>
  );
}