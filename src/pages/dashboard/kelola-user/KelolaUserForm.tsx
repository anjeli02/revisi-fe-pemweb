import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../../../component/ui/Button";
import InputText from "../../../component/ui/InputText";
import { createUserApi, updateUserApi } from "../../../services/skincareApi";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

interface ExistingUser {
  id: number;
  username: string;
  email: string;
}

export default function KelolaUserForm({ existing }: { existing?: ExistingUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: existing
      ? { username: existing.username, email: existing.email, password: "" }
      : { username: "", email: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError(null);
    try {
      if (existing) {
        await updateUserApi(existing.id, {
          username: data.username,
          email: data.email,
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
          role: "user",
        });
      }
      navigate("/dashboard/kelola-user");
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const message = (err as any)?.response?.data?.message || "Gagal menyimpan user";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-1">
      <InputText label="Nama" nama="username" register={register} />
      <InputText label="Email" nama="email" register={register} />
      <InputText
        label={existing ? "Password Baru (kosongkan jika tidak diubah)" : "Password"}
        nama="password"
        register={register}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3 pt-4">
        <Button tittle={loading ? "Menyimpan..." : existing ? "Simpan Perubahan" : "Tambah User"} type="submit" />
        <button
          type="button"
          onClick={() => navigate("/dashboard/kelola-user")}
          className="px-6 py-3 rounded-full text-stone-500 font-semibold hover:bg-stone-100"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
