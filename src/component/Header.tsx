import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LogIn,
  UserPlus,
  LayoutDashboard,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import logo from "../assets/logo1.jpeg";

const menuItems = [
  { label: "Beranda", href: "/" },
  { label: "Konsultasi", href: "/konsultasi" },
  { label: "Produk", href: "/katalog" },
];

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  const getDashboardPath = () => {
    if (user?.role === "super_admin") return "/superadmin";
    if (user?.role === "admin") return "/dashboard";
    return "/riwayat";
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center gap-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-3 shrink-0 transition-transform duration-300 hover:scale-105"
        >
          <img
            src={logo}
            alt="GlowMatch"
            className="w-12 h-12 object-contain"
          />

          <div className="leading-tight">
            <h1 className="font-display font-bold text-2xl text-brand-600">
              GlowMatch
            </h1>
          </div>
        </NavLink>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {menuItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                `transition-all duration-200 ${isActive ? "text-brand-600 font-semibold" : "text-stone-600 hover:text-brand-500"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-brand-600 transition px-3 py-2 rounded-full hover:bg-brand-50"
              >
                <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center">
                  <User size={14} className="text-brand-600" />
                </div>
                <span className="hidden sm:inline">{user.name}</span>
                <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] border border-stone-100 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-stone-100">
                    <p className="text-xs text-stone-400">Masuk sebagai</p>
                    <p className="font-semibold text-stone-800 text-sm truncate">{user.name}</p>
                    <p className="text-xs text-brand-500 capitalize">{user.role.replace("_", " ")}</p>
                  </div>
                  {(user.role === "admin" || user.role === "super_admin") && (
                    <Link
                      to={getDashboardPath()}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm text-stone-700 hover:bg-brand-50 transition"
                    >
                      <LayoutDashboard size={15} className="text-brand-500" />
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-stone-700 hover:bg-rose-50 transition"
                  >
                    <LogOut size={15} className="text-rose-500" />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-brand-600 transition px-4 py-2 rounded-full hover:bg-brand-50"
              >
                <LogIn size={15} /> Masuk
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-[0_10px_30px_-10px_rgba(240,77,110,0.35)] transition"
              >
                <UserPlus size={15} /> Daftar Gratis
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
