import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import Beranda from "./pages/Beranda";
import Katalog from "./pages/Katalog";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";

import KonsultasiJenisKulit from "./pages/konsultasi/KonsultasiJenisKulit";
import KonsultasiMasalahKulit from "./pages/konsultasi/KonsultasiMasalahKulit";
import KonsultasiPrioritas from "./pages/konsultasi/KonsultasiPrioritas";
import HasilRekomendasi from "./pages/konsultasi/HasilRekomendasi";

import DashboardIndex from "./pages/dashboard/DashboardIndex";
import ProdukIndex from "./pages/dashboard/produk/ProdukIndex";
import ProdukCreate from "./pages/dashboard/produk/ProdukCreate";
import ProdukEdit from "./pages/dashboard/produk/ProdukEdit";
import KriteriaIndex from "./pages/dashboard/kriteria/KriteriaIndex";
import RiwayatIndex from "./pages/dashboard/riwayat/RiwayatIndex";
import AkunAdminIndex from "./pages/dashboard/akun-admin/AkunAdminIndex";
import AkunAdminCreate from "./pages/dashboard/akun-admin/AkunAdminCreate";
import AkunAdminEdit from "./pages/dashboard/akun-admin/AkunAdminEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Beranda />} />
          <Route path="/katalog" element={<Katalog />} />
          <Route path="/konsultasi" element={<KonsultasiJenisKulit />} />
          <Route path="/konsultasi/masalah" element={<KonsultasiMasalahKulit />} />
          <Route path="/konsultasi/prioritas" element={<KonsultasiPrioritas />} />
          <Route path="/konsultasi/hasil" element={<HasilRekomendasi />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin", "super_admin"]} redirectTo="/" />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardIndex />} />
            <Route path="produk" element={<ProdukIndex />} />
            <Route path="produk/create" element={<ProdukCreate />} />
            <Route path="produk/edit/:id" element={<ProdukEdit />} />
            <Route path="kriteria" element={<KriteriaIndex />} />
            <Route path="riwayat" element={<RiwayatIndex />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["super_admin"]} redirectTo="/dashboard" />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="akun-admin" element={<AkunAdminIndex />} />
            <Route path="akun-admin/create" element={<AkunAdminCreate />} />
            <Route path="akun-admin/edit/:id" element={<AkunAdminEdit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
