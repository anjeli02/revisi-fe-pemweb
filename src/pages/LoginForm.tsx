import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../component/ui/InputText";
import { Sparkles } from "lucide-react";
import InputPassword from "../component/ui/InputPasword";
import Button from "../component/ui/Button";
import { useAuthStore } from "../store/useAuthStore";
import { useAdminAccountsStore } from "../store/useAdminAccounts";
import type { Role } from "../types/Auth";

const schema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(4, "Password minimal 4 karakter"),
});

type FormValues = z.infer<typeof schema>;

// Demo: role ditentukan dari email yang terdaftar di menu "Kelola Admin".
// Email yang tidak terdaftar di sana otomatis jadi role "user".
function resolveRole(email: string): Role {
  const account = useAdminAccountsStore
    .getState()
    .admins.find((a: { email: string; role: Role }) => a.email.toLowerCase() === email.toLowerCase());
  return account?.role ?? "user";
}

const ROLE_LABEL: Record<Role, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  user: "Pengguna",
};

export default function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    // Demo: belum tersambung ke backend nyata (lihat src/lib/axios.ts untuk koneksi API).
    // Login selalu berhasil; role-nya ditentukan dari daftar akun di "Kelola Admin".
    await new Promise((r) => setTimeout(r, 400));
    const role = resolveRole(data.email);
    login({
      user: { id: "u1", name: ROLE_LABEL[role], email: data.email, role },
      token: "demo-token",
    });
    navigate(role === "user" ? "/" : "/dashboard");
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <Sparkles className="text-brand-500 mx-auto mb-3" size={28} />
      <h1 className="font-display text-2xl font-bold text-stone-800 text-center mb-1">Masuk</h1>
      <p className="text-sm text-stone-500 text-center mb-7">
        Masuk untuk konsultasi, atau kelola data lewat dashboard kalau akunmu terdaftar sebagai admin.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        <InputText label="Email" nama="email" register={register} error={errors.email?.message} />
        <InputPassword label="Password" nama="password" register={register} error={errors.password?.message} />
        <Button tittle="Masuk" type="submit" isLoading={isSubmitting} className="w-full mt-4" />
      </form>

      <p className="text-xs text-stone-400 text-center mt-4">
        Demo: password bebas. Role ditentukan dari email — lihat daftar akun admin di menu &quot;Kelola Admin&quot;.
      </p>
      <p className="text-sm text-stone-500 text-center mt-6">
        Belum punya akun? <Link to="/register" className="text-brand-600 font-semibold">Daftar</Link>
      </p>
    </div>
  );
}
