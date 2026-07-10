import { Outlet } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="grid md:grid-cols-2 min-h-screen items-center bg-[#fffaf9]">
      <div className="hidden md:flex bg-linear-to-br from-brand-50 to-peach-50 h-screen items-center justify-center flex-col gap-4">
        <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center">
          <Sparkles className="text-brand-500" size={40} />
        </div>
        <p className="font-display font-bold text-2xl text-brand-600">GlowMatch</p>
        <p className="text-stone-500 max-w-xs text-center text-sm">
          Rekomendasi skincare berbasis SPK — masuk untuk konsultasi, atau kelola data sebagai admin.
        </p>
      </div>
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}
