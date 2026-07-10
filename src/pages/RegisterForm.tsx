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

// Sama seperti LoginForm: role ditentukan dari email yang terdaftar di "Kelola Admin".
function resolveRole(email: string): Role {
  const account = useAdminAccountsStore
    .getState()
    .admins.find((a: { email: string; }) => a.email.toLowerCase() === email.toLowerCase());
  return account?.role ?? "user";
}

const schema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(4, "Password minimal 4 karakter"),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterForm() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 400));
    const role = resolveRole(data.email);
    login({
      user: { id: "u-new", name: data.name, email: data.email, role },
      token: "demo-token",
    });
    navigate(role === "user" ? "/" : "/dashboard");
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <Sparkles className="text-brand-500 mx-auto mb-3" size={28} />
      <h1 className="font-display text-2xl font-bold text-stone-800 text-center mb-1">Daftar Akun</h1>
      <p className="text-sm text-stone-500 text-center mb-7">Buat akun untuk mulai konsultasi skincare di GlowMatch.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        <InputText label="Nama" nama="name" register={register} error={errors.name?.message} />
        <InputText label="Email" nama="email" register={register} error={errors.email?.message} />
        <InputPassword label="Password" nama="password" register={register} error={errors.password?.message} />
        <Button tittle="Buat Akun" type="submit" isLoading={isSubmitting} className="w-full mt-4" />
      </form>

      <p className="text-sm text-stone-500 text-center mt-6">
        Sudah punya akun? <Link to="/login" className="text-brand-600 font-semibold">Masuk</Link>
      </p>
    </div>
  );
}
