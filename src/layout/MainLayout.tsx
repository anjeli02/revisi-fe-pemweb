import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Sparkles, Globe, Share2 } from "lucide-react";
import Header from "../component/Header";

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                <Outlet />
            </main>

            <footer className="bg-white border-t border-rose-100 mt-10">
                <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10 text-sm">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-7 h-7 rounded-xl bg-brand-50 flex items-center justify-center">
                                <Sparkles className="text-brand-500" size={15} />
                            </span>
                            <span className="font-display font-bold text-brand-600 text-lg">GlowMatch</span>
                        </div>
                        <p className="text-stone-500 leading-relaxed max-w-sm">
                            Platform rekomendasi skincare berbasis SPK (Sistem Pendukung Keputusan) metode SAW.
                            Temukan produk yang benar-benar cocok untuk kulitmu, bukan sekadar tren.
                        </p>
                        <div className="flex gap-3 mt-4">
                            <a href="#" className="w-9 h-9 rounded-full bg-stone-100 hover:bg-brand-50 hover:text-brand-600 flex items-center justify-center text-stone-500 transition">
                                <Globe size={16} />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-stone-100 hover:bg-brand-50 hover:text-brand-600 flex items-center justify-center text-stone-500 transition">
                                <Share2 size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <p className="font-semibold text-stone-700 mb-3">Menu</p>
                        <ul className="space-y-2 text-stone-500">
                            <li><Link to="/" className="hover:text-brand-600 transition">Beranda</Link></li>
                            <li><Link to="/konsultasi" className="hover:text-brand-600 transition">Konsultasi</Link></li>
                            <li><Link to="/katalog" className="hover:text-brand-600 transition">Katalog Produk</Link></li>
                            <li><Link to="/login" className="hover:text-brand-600 transition">Masuk</Link></li>
                            <li><Link to="/register" className="hover:text-brand-600 transition">Daftar</Link></li>
                        </ul>
                    </div>

                    {/* Kriteria */}
                    <div>
                        <p className="font-semibold text-stone-700 mb-3">Rekomendasi Berdasarkan</p>
                        <ul className="space-y-2 text-stone-500">
                            <li className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-brand-50 text-brand-600 text-[10px] font-bold flex items-center justify-center">1</span>
                                Jenis Kulit
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-brand-50 text-brand-600 text-[10px] font-bold flex items-center justify-center">2</span>
                                Masalah Kulit
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-brand-50 text-brand-600 text-[10px] font-bold flex items-center justify-center">3</span>
                                Kandungan Aktif
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-brand-50 text-brand-600 text-[10px] font-bold flex items-center justify-center">4</span>
                                Rentang Harga
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-brand-50 text-brand-600 text-[10px] font-bold flex items-center justify-center">5</span>
                                Status BPOM
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-rose-100 px-6 py-4 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-stone-400">
                    <p>&copy; 2026 GlowMatch. Dibuat untuk membantu kamu milih skincare dengan lebih cerdas.</p>
                    <p>GlowMatch</p>
                </div>
            </footer>
        </div>
    );
}
