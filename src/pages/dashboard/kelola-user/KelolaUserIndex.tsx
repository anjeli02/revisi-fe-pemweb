import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, ShieldPlus, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getUsers, deleteUserApi, updateUserApi } from "../../../services/skincareApi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyUser = any;

export default function KelolaUserIndex() {
  const [users, setUsers] = useState<AnyUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data.filter((u: AnyUser) => u.role !== "admin" && u.role !== "super_admin")))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus akun user ini?")) return;
    await deleteUserApi(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handlePromote = async (id: number, username: string) => {
    if (!confirm(`Jadikan "${username}" sebagai Admin? Akun ini akan pindah ke halaman Kelola Admin.`)) return;
    await updateUserApi(id, { role: "admin" });
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-800">Kelola User</h1>
          <p className="text-sm text-stone-500">{users.length} user terdaftar</p>
        </div>
        <Link
          to="/dashboard/kelola-user/create"
          className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-[0_10px_30px_-10px_rgba(240,77,110,0.35)] inline-flex items-center gap-2"
        >
          <Plus size={16} /> Tambah User
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-rose-50 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-stone-400 border-b border-stone-100">
              <th className="px-5 py-3">Nama</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={3} className="px-5 py-8 text-center text-stone-400">
                  Belum ada user terdaftar.
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id} className="border-b border-stone-50 hover:bg-rose-50/40">
                <td className="px-5 py-3 font-semibold text-stone-700 inline-flex items-center gap-2">
                  <UserIcon size={14} className="text-stone-300" /> {u.username}
                </td>
                <td className="px-5 py-3 text-stone-500">{u.email}</td>
                <td className="px-5 py-3 text-right whitespace-nowrap">
                  <Link
                    to={`/dashboard/kelola-user/edit/${u.id}`}
                    className="text-brand-500 hover:underline mr-3 inline-flex items-center gap-1"
                  >
                    <Pencil size={14} /> Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handlePromote(u.id, u.username)}
                    className="text-amber-600 hover:underline mr-3 inline-flex items-center gap-1"
                  >
                    <ShieldPlus size={14} /> Jadikan Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(u.id)}
                    className="text-stone-400 hover:text-rose-600 hover:underline inline-flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
