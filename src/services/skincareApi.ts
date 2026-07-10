// Contoh service layer untuk menyambungkan ke backend yang sudah kamu buat.
// Sesuaikan path endpoint di bawah ini dengan route backend kamu yang sebenarnya.
//
// Cara pakai (lihat BACKEND_INTEGRATION.md di root project):
// 1. Ganti pemanggilan useAdminStore() di halaman-halaman dashboard/produk dengan
//    react-query (useQuery/useMutation) yang memanggil fungsi-fungsi di file ini.
// 2. Hapus persist() pada useAdminStore.ts kalau datanya sudah datang dari server.

import { api } from "../lib/axios";
import type { Criteria, Product, HistoryEntry, WeightMap } from "../types/skincare";

// ----- Produk -----
export async function getProducts(): Promise<Product[]> {
  const res = await api.get("/products");
  return res.data;
}

export async function createProduct(payload: Omit<Product, "id">): Promise<Product> {
  const res = await api.post("/products", payload);
  return res.data;
}

export async function updateProductApi(id: string, payload: Partial<Product>): Promise<Product> {
  const res = await api.put(`/products/${id}`, payload);
  return res.data;
}

export async function deleteProductApi(id: string): Promise<void> {
  await api.delete(`/products/${id}`);
}

// ----- Kriteria -----
export async function getCriteria(): Promise<Criteria[]> {
  const res = await api.get("/criteria");
  return res.data;
}

export async function updateCriteriaWeightApi(key: Criteria["key"], weight: number): Promise<Criteria> {
  const res = await api.put(`/criteria/${key}`, { defaultWeight: weight });
  return res.data;
}

// ----- Rekomendasi (SAW dihitung di backend) -----
export async function postRecommendation(weights: WeightMap): Promise<{
  results: (Product & { finalScore: number; rank: number })[];
}> {
  const res = await api.post("/recommendations", { weights });
  return res.data;
}

// ----- Riwayat -----
export async function getHistory(): Promise<HistoryEntry[]> {
  const res = await api.get("/recommendations/history");
  return res.data;
}
