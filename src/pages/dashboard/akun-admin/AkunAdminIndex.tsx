import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, ShieldCheck } from "lucide-react";
import { useAdminAccountsStore } from "../../../store/useAdminAccounts";

export default function AkunAdminIndex() {
  const { admins, deleteAdmin } = useAdminAccountsStore();
  const superAdminCount = admins.filter((a) => a.role === "super_admin").length;

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-800">Kelola Admin</h1>
          <p className="text-sm text-stone-500">
            {admins.length} akun terdaftar &middot; role saat login dicocokkan dari email di daftar ini
          </p>
        </div>
        <Link
          to="/dashboard/akun-admin/create"
          className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-[0_10px_30px_-10px_rgba(240,77,110,0.35)] inline-flex items-center gap-2"
        >
          <Plus size={16} /> Tambah Admin
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-rose-50 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-stone-400 border-b border-stone-100">
              <th className="px-5 py-3">Nama</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => {
              const isLastSuperAdmin = a.role === "super_admin" && superAdminCount <= 1;
              return (
                <tr key={a.id} className="border-b border-stone-50 hover:bg-rose-50/40">
                  <td className="px-5 py-3 font-semibold text-stone-700">{a.name}</td>
                  <td className="px-5 py-3 text-stone-500">{a.email}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        a.role === "super_admin" ? "bg-amber-50 text-amber-600" : "bg-brand-50 text-brand-600"
                      }`}
                    >
                      <ShieldCheck size={12} /> {a.role === "super_admin" ? "Super Admin" : "Admin"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    <Link
                      to={`/dashboard/akun-admin/edit/${a.id}`}
                      className="text-brand-500 hover:underline mr-3 inline-flex items-center gap-1"
                    >
                      <Pencil size={14} /> Edit
                    </Link>
                    <button
                      type="button"
                      disabled={isLastSuperAdmin}
                      title={isLastSuperAdmin ? "Tidak bisa hapus super admin terakhir" : undefined}
                      onClick={() => {
                        if (isLastSuperAdmin) return;
                        if (!a.id) return;
                        if (confirm(`Hapus akun ${a.email}?`)) deleteAdmin(a.id as string);
                      }}
                      className={`inline-flex items-center gap-1 ${
                        isLastSuperAdmin
                          ? "text-stone-300 cursor-not-allowed"
                          : "text-stone-400 hover:text-rose-600 hover:underline"
                      }`}
                    >
                      <Trash2 size={14} /> Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
