import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, SlidersHorizontal, History, LogOut, Sparkles, UserCog } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import type { Role } from "../types/Auth";

type MenuItem = {
    to: string;
    label: string;
    icon: typeof LayoutDashboard;
    roles: Role[];
};

const menu: MenuItem[] = [
    { to: "/dashboard", label: "Ringkasan", icon: LayoutDashboard, roles: ["admin", "super_admin"] },
    { to: "/dashboard/produk", label: "Produk Skincare", icon: Package, roles: ["admin", "super_admin"] },
    { to: "/dashboard/kriteria", label: "Kriteria SAW", icon: SlidersHorizontal, roles: ["admin", "super_admin"] },
    { to: "/dashboard/riwayat", label: "Riwayat Konsultasi", icon: History, roles: ["admin", "super_admin"] },
    { to: "/dashboard/akun-admin", label: "Kelola Admin", icon: UserCog, roles: ["super_admin"] },
];

export default function DashboardLayout() {
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const visibleMenu = menu.filter((item) => user && item.roles.includes(user.role));

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#fffaf9]">
            <div className="w-64 bg-white border-r border-rose-100 h-screen p-5 flex flex-col justify-between shrink-0">
                <div>
                    <div className="flex items-center gap-2 px-2 pb-6 mb-2 border-b border-rose-100">
                        <Sparkles className="text-brand-500" size={20} />
                        <span className="font-display font-bold text-brand-600">GlowMatch</span>
                    </div>
                    <nav className="flex flex-col gap-1">
                        {visibleMenu.map((item) => {
                            const active = location.pathname === item.to;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-sm transition ${
                                        active ? "bg-brand-50 text-brand-600 font-semibold" : "text-stone-600 hover:bg-rose-50"
                                    }`}
                                >
                                    <Icon size={16} /> {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <button
                    onClick={handleLogout}
                    type="button"
                    className="bg-stone-100 hover:bg-rose-100 text-stone-600 font-semibold w-full py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2"
                >
                    <LogOut size={16} /> Keluar
                </button>
            </div>
            <div className="flex-1 h-full overflow-y-auto p-8">
                <Outlet />
            </div>
        </div>
    );
}
