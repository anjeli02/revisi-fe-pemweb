// Contoh service layer untuk CRUD akun admin/super admin — pola sama persis
// dengan services/skincareApi.ts. BELUM dipanggil di manapun; halaman
// "Kelola Admin" saat ini masih pakai useAdminAccountsStore (mock localStorage).
//
// Backend yang dibutuhkan supaya ini bisa dipakai (belum ada per audit terakhir):
// - Kolom `role` di tabel User ("super_admin" | "admin" | "user"), atau tabel
//   AdminAccount terpisah — sesuaikan dengan skema yang dipakai temanmu.
// - Endpoint di bawah ini, dan middleware yang membatasi akses hanya untuk
//   role "super_admin" (authMiddleware.ts saat ini cuma cek token valid,
//   belum cek role sama sekali).
//
// Cara pakai nanti: ganti `useAdminAccountsStore()` di AkunAdminIndex.tsx /
// AkunAdminForm.tsx dengan react-query (useQuery/useMutation) yang manggil
// fungsi-fungsi di bawah, lalu hapus persist() di useAdminAccounts.ts.

import { api } from "../lib/axios";
import type { AdminAccount } from "../types/adminAccounts";

export async function getAdminAccounts(): Promise<AdminAccount[]> {
  const res = await api.get("/admin-accounts");
  return res.data;
}

export async function createAdminAccount(payload: Omit<AdminAccount, "id" | "createdAt">): Promise<AdminAccount> {
  const res = await api.post("/admin-accounts", payload);
  return res.data;
}

export async function updateAdminAccountApi(id: string, payload: Partial<AdminAccount>): Promise<AdminAccount> {
  const res = await api.put(`/admin-accounts/${id}`, payload);
  return res.data;
}

export async function deleteAdminAccountApi(id: string): Promise<void> {
  await api.delete(`/admin-accounts/${id}`);
}
