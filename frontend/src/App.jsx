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
import DokterPage from "./pages/DokterPage";
import InformasiPage from "./pages/Informasipage";
import ArticleDetail from "./pages/ArticleDetail";
import PromoPage from "./pages/PromoPage";
import Register from "./components/register";

// Komponen Detail & Fitur Tambahan
import MeetDoctor from "./components/MeetDoctor";
import DoctorDetail from "./components/DoctorDetail";
import JadwalDokter from "./components/JadwalDokter";
import EventDetail from "./components/EventDetail";
import DetailPromo from "./components/DetailPromo";

// Halaman Admin
import AdminLogin from "./pages/AdminPages/AdminLogin";
import DashboardAdmin from "./pages/AdminPages/DashboardAdmin";
import UpdateJadwal from "./components/UpdateJadwal"; // Tetap dipertahankan jika masih digunakan terpisah

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

  // Sembunyikan Navbar, Footer, dll jika di halaman login/register atau di dalam area admin
  const hideLayout =
    ["/login", "/register"].includes(location.pathname) ||
    location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Navbar />}
      {!hideLayout && <PromoPopup />}
      {!hideLayout && <WhatsAppFloat />}

      <main className="flex-1">
        <Routes>
          {/* ================= RUTE PUBLIK ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/fasilitas" element={<FasilitasPage />} />
          <Route path="/meet-doctor" element={<MeetDoctor />} />
          <Route path="/doctor/:id" element={<DoctorDetail />} />
          <Route path="/dokter" element={<DokterPage />} />
          <Route path="/JadwalDokter" element={<JadwalDokter />} />
          <Route path="/informasi" element={<InformasiPage />} />
          <Route path="/informasi/:id" element={<ArticleDetail />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/promo" element={<PromoPage />} />
          <Route path="/promo/:id" element={<DetailPromo />} />
          <Route path="/register" element={<Register />} />

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

          {/* Halaman Update Jadwal (Tetap ada jika Anda menggunakannya untuk mode Edit) */}
          <Route
            path="/admin/update-jadwal"
            element={
              <ProtectedAdminRoute>
                <UpdateJadwal />
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
