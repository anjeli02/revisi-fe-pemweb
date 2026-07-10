import { useAuthStore } from "../store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";
import type { Role } from "../types/Auth";

interface ProtectedRouteProps {
    // Kalau diisi, hanya role di daftar ini yang boleh lewat. Kalau kosong/undefined,
    // perilakunya sama seperti sebelumnya: siapa pun yang sudah login boleh lewat.
    allowedRoles?: Role[];
    redirectTo?: string;
}

export default function ProtectedRoute({ allowedRoles, redirectTo = "/dashboard" }: ProtectedRouteProps) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const user = useAuthStore((state) => state.user);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
        // Role "user" tidak pernah punya akses dashboard sama sekali, jadi langsung
        // pulangkan ke beranda — hindari bolak-balik redirect lewat /dashboard dulu.
        const fallback = user?.role === "user" ? "/" : redirectTo;
        return <Navigate to={fallback} replace />;
    }

    return <Outlet />;
}