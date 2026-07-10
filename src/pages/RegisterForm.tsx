import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../component/ui/InputText";
import { Sparkles } from "lucide-react";
import InputPassword from "../component/ui/InputPasword";
import Button from "../component/ui/Button";
import { useAuthStore } from "../store/useAuthStore";
import { registerApi } from "../services/skincareApi";

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
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await registerApi(data.name, data.email, data.password);
      login({
        user: {
          id: result.user.id,
          name: result.user.username,
          email: result.user.email,
          role: result.user.role ?? "user",
        },
        token: result.token,
      });
      navigate("/");
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Gagal mendaftar";
      setError("email", { message: msg });
    }
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