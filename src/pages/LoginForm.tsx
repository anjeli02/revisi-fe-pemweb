import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../component/ui/InputText";
import { Sparkles } from "lucide-react";
import InputPassword from "../component/ui/InputPasword";
import Button from "../component/ui/Button";
import { useAuthStore } from "../store/useAuthStore";
import { loginApi } from "../services/skincareApi";

const schema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(4, "Password minimal 4 karakter"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await loginApi(data.email, data.password);
      login({
        user: {
          id: result.user.id,
          name: result.user.username,
          email: result.user.email,
          role: result.user.role ?? "user",
        },
        token: result.token,
      });
      const role = result.user.role ?? "user";
      navigate(role === "user" ? "/" : "/dashboard");
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Email atau password salah";
      setError("email", { message: msg });
    }
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

      <p className="text-sm text-stone-500 text-center mt-6">
        Belum punya akun? <Link to="/register" className="text-brand-600 font-semibold">Daftar</Link>
      </p>
    </div>
  );
}