// Contoh service layer untuk menyambungkan ke backend yang sudah kamu buat.
// Sesuaikan path endpoint di bawah ini dengan route backend kamu yang sebenarnya.
//
// Cara pakai (lihat BACKEND_INTEGRATION.md di root project):
// 1. Ganti pemanggilan useAdminStore() di halaman-halaman dashboard/produk dengan
//    react-query (useQuery/useMutation) yang memanggil fungsi-fungsi di file ini.
// 2. Hapus persist() pada useAdminStore.ts kalau datanya sudah datang dari server.

import { api } from "../lib/axios";

//login & register
export async function loginApi(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password });
  const data = res.data;
  // konversi id dari number ke string
  data.user.id = String(data.user.id);
  return data;
}

export async function registerApi(username: string, email: string, password: string) {
  const res = await api.post("/auth/register", { username, email, password });
  const data = res.data;
  // konversi id dari number ke string
  data.user.id = String(data.user.id);
  return data;
}

// ----- Produk -----
export async function getProducts() {
  const res = await api.get("/products");
  return res.data;
}

export async function getProductById(id: number) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}

// ----- Kriteria -----
export async function getKriteria() {
  const res = await api.get("/kriteria");
  return res.data;
}

// ----- SPK / Rekomendasi -----
export async function postRecommendation(input: {
  inputHarga: number;
  inputJenisKulit: number;
  inputMasalahKulit: number;
  inputKandungan: number;
  inputBpom: number;
}) {
  const res = await api.post("/spk/calculate", input);
  return res.data;
  // res.data.topRekomendasi = array top 10 produk
  // res.data.semua = semua produk terurut
}

// ----- Riwayat -----
export async function getHistory() {
  const res = await api.get("/history");
  return res.data;
}