import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../../../component/ui/Button";
import InputText from "../../../component/ui/InputText";
import SelectInput from "../../../component/ui/SelectInput";
import { createUserApi, updateUserApi } from "../../../services/skincareApi";

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "super_admin", label: "Super Admin" },
];

type FormValues = {
  username: string;
  email: string;
  password: string;
  role: string;
};

interface ExistingAccount {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function AkunAdminForm({ existing }: { existing?: ExistingAccount }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: existing
      ? { username: existing.username, email: existing.email, password: "", role: existing.role }
      : { username: "", email: "", password: "", role: "admin" },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError(null);
    try {
      if (existing) {
        await updateUserApi(existing.id, {
          username: data.username,
          email: data.email,
          role: data.role,
          ...(data.password ? { password: data.password } : {}),
        });
      } else {
        if (!data.password) {
          setError("Password wajib diisi untuk akun baru");
          return;
        }
        await createUserApi({
          username: data.username,
          email: data.email,
          password: data.password,
          role: data.role,
        });
      }
      navigate("/dashboard/akun-admin");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Gagal menyimpan akun");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-1">
      <InputText label="Nama" nama="username" register={register} />
      <InputText label="Email" nama="email" register={register} />
      <InputText label={existing ? "Password Baru (kosongkan jika tidak diubah)" : "Password"} nama="password" register={register} />
      <SelectInput label="Role" nama="role" register={register} options={ROLE_OPTIONS} />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3 pt-4">
        <Button tittle={loading ? "Menyimpan..." : existing ? "Simpan Perubahan" : "Tambah Admin"} type="submit" />
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