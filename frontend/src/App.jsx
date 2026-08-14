import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

// Komponen Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PromoPopup from "./components/Popup";
import WhatsAppFloat from "./components/WhatsAppFloat";

// Halaman Publik
import Home from "./pages/Home";
import FasilitasPage from "./pages/FasilitasPage";
import InformasiPage from "./pages/Informasipage";
import ArticleDetail from "./pages/ArticleDetail";
import PromoPage from "./pages/PromoPage";
import Profil from "./pages/profil";
import StrukturOrganisasi from "./pages/struktur-organisasi";
import BedPage from "./pages/BedPage";

//kompoenen fasilitas
import Apotek from "./pages/FasilitasPages/apotek";
import IGD from "./pages/FasilitasPages/igd";
import RawatInap from "./pages/FasilitasPages/rawat-inap";
import Laboratorium from "./pages/FasilitasPages/laboratorium";
import Radiologi from "./pages/FasilitasPages/radiologi";
import RuangOperasi from "./pages/FasilitasPages/ruang-operasi";

// Komponen Detail & Fitur Tambahan
import MeetDoctor from "./components/MeetDoctor";
import DoctorDetail from "./components/DoctorDetail";
import JadwalDokter from "./components/JadwalDokter";
import DetailPromo from "./components/DetailPromo";

// Halaman Admin
import AdminLogin from "./pages/AdminPages/AdminLogin";
import DashboardAdmin from "./pages/AdminPages/DashboardAdmin";

// =======================================================
// KOMPONEN PROTEKSI RUTE ADMIN
// =======================================================
const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/visitors/track`, { method: "POST" }).catch((err) =>
      console.error("Gagal merekam visitor", err),
    );
  }, []);
  // Sembunyikan Navbar, Footer, dll jika di halaman login/register atau di dalam area admin
  const hideLayout =
    ["/login"].includes(location.pathname) ||
    location.pathname.startsWith("/admin");

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Navbar />}
      {!hideLayout && <PromoPopup />}
      {!hideLayout && <WhatsAppFloat />}

      <main className="flex-1">
        <ScrollToTop />
        <Routes>
          {/* ================= RUTE PUBLIK ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/fasilitas" element={<FasilitasPage />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/struktur-organisasi" element={<StrukturOrganisasi />} />
          <Route path="/bed" element={<BedPage />} />
          <Route path="/FasilitasPages/igd" element={<IGD />} />
          <Route path="/FasilitasPages/rawat-inap" element={<RawatInap />} />
          <Route path="/FasilitasPages/apotek" element={<Apotek />} />
          <Route
            path="/FasilitasPages/laboratorium"
            element={<Laboratorium />}
          />
          <Route path="/FasilitasPages/radiologi" element={<Radiologi />} />
          <Route
            path="/FasilitasPages/ruang-operasi"
            element={<RuangOperasi />}
          />
          <Route path="/meet-doctor" element={<MeetDoctor />} />
          <Route path="/doctor/:id" element={<DoctorDetail />} />
          <Route path="/JadwalDokter" element={<JadwalDokter />} />
          <Route path="/artikel" element={<InformasiPage />} />
          <Route path="/artikel/:id" element={<ArticleDetail />} />
          <Route path="/promo" element={<PromoPage />} />
          <Route path="/promo/:id" element={<DetailPromo />} />

          {/* ================= RUTE ADMIN PANEL ================= */}
          {/* Halaman Login Admin */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* Halaman Utama Dashboard (Sekarang menampung semua fitur Manage & Input) */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <DashboardAdmin />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
