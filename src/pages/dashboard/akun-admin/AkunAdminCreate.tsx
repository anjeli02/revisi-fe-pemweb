import AkunAdminForm from "./AkunAdminForm";

export default function AkunAdminCreate() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-stone-800 mb-1">Tambah Admin</h1>
      <p className="text-sm text-stone-500 mb-6">
        Akun ini langsung bisa dipakai login demo sesuai role yang dipilih.
      </p>
      <AkunAdminForm />
    </div>
  );
}
