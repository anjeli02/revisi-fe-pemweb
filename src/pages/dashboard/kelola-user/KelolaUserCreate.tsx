import KelolaUserForm from "./KelolaUserForm";

export default function KelolaUserCreate() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-800 mb-1">Tambah User</h1>
      <p className="text-sm text-stone-500 mb-6">
        Akun ini dibuat dengan role "user" — untuk akun admin, pakai halaman Kelola Admin.
      </p>
      <KelolaUserForm />
    </div>
  );
}
