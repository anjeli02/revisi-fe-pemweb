import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../../component/ui/Button";
import InputText from "../../../component/ui/InputText";
import SelectInput from "../../../component/ui/SelectInput";
import { useAdminAccountsStore } from "../../../store/useAdminAccounts";
import { uid } from "../../../lib/uid";
import type { AdminAccount } from "../../../types/adminAccounts";

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "super_admin", label: "Super Admin" },
];

type FormValues = {
  name: string;
  email: string;
  role: string;
};

export default function AkunAdminForm({ existing }: { existing?: AdminAccount }) {
  const navigate = useNavigate();
  const { admins, addAdmin, updateAdmin } = useAdminAccountsStore();

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: existing
      ? { name: existing.name, email: existing.email, role: existing.role }
      : { name: "", email: "", role: "admin" },
  });

  const onSubmit = (data: FormValues) => {
    const email = data.email.trim().toLowerCase();
    if (!email) {
      alert('Email wajib diisi — email ini yang menentukan role saat login demo.');
      return;
    }
    const duplicate = admins.find((a) => a.email.toLowerCase() === email && a.id !== existing?.id);
    if (duplicate) {
      alert("Email ini sudah dipakai akun admin lain.");
      return;
    }

    const payload: AdminAccount = {
      id: existing?.id ?? uid("acc"),
      name: data.name || "Admin Baru",
      email,
      role: data.role === "super_admin" ? "super_admin" : "admin",
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    };
    if (existing) updateAdmin(payload);
    else addAdmin(payload);
    navigate("/dashboard/akun-admin");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-1">
      <InputText label="Nama" nama="name" register={register} />
      <InputText label="Email (dipakai untuk login demo)" nama="email" register={register} />
      <SelectInput label="Role" nama="role" register={register} options={ROLE_OPTIONS} />

      <div className="flex gap-3 pt-4">
        <Button tittle={existing ? "Simpan Perubahan" : "Tambah Admin"} type="submit" />
        <button
          type="button"
          onClick={() => navigate("/dashboard/akun-admin")}
          className="px-6 py-3 rounded-full text-stone-500 font-semibold hover:bg-stone-100"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
