import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdminAccount } from "../types/adminAccounts";

interface AdminAccountsState {
  admins: AdminAccount[];
  addAdmin: (a: AdminAccount) => void;
  updateAdmin: (a: AdminAccount) => void;
  deleteAdmin: (id: string) => void;
}

// yang sudah didokumentasikan di README, supaya login demo yang lama tetap
// jalan (sekarang sebagai Super Admin, bukan tenant_admin generik).
const SEED_ADMINS: AdminAccount[] = [
  {
    id: "acc-seed-1",
    name: "Anjeli",
    email: "anjeli@gmail.com",
    role: "super_admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "acc-seed-2",
    name: "Admin Demo",
    email: "admin@glowmatch.com",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
];

export const useAdminAccountsStore = create<AdminAccountsState>()(
  persist(
    (set, get) => ({
      admins: SEED_ADMINS,
      addAdmin: (a) => set({ admins: [...get().admins, a] }),
      updateAdmin: (a) => set({ admins: get().admins.map((x) => (x.id === a.id ? a : x)) }),
      deleteAdmin: (id) => set({ admins: get().admins.filter((x) => x.id !== id) }),
    }),
    { name: "glowmatch-admin-accounts" }
  )
);
