import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PromoPopup from "./components/Popup";

import Home from "./pages/Home";
import FasilitasPage from "./pages/FasilitasPage";
import InputEvent from "./pages/AdminPages/InputEvent";
import DokterPage from "./pages/DokterPage";
import InformasiPage from "./pages/Informasipage";
import ArticleDetail from "./pages/ArticleDetail";
import JadwalDokter from "./components/JadwalDokter";
import Register from "./components/register";
import EditPage from "./pages/AdminPages/EditPage";
import UpdateJadwal from "./components/UpdateJadwal";
import WhatsAppFloat from "./components/WhatsAppFloat";
import EventDetail from "./components/EventDetail";
import InputInformasi from "./pages/AdminPages/InputInformasi";
import MeetDoctor from "./components/MeetDoctor";
import PromoPage from "./pages/PromoPage";
import DetailPromo from "./components/DetailPromo";
import InputPromo from "./pages/AdminPages/InputPromo";
import DoctorDetail from "./components/DoctorDetail";
import AdminLogin from "./pages/AdminPages/AdminLogin";
import DashboardAdmin from "./pages/AdminPages/DashboardAdmin";

function AppContent() {
  const location = useLocation(); // WAJIB ADA
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
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/input-event" element={<InputEvent />} />
          <Route path="/input-informasi" element={<InputInformasi />} />
          <Route path="/input-promo" element={<InputPromo />} />
          <Route path="/edit-jadwal" element={<EditPage />} />
          <Route path="/update-jadwal" element={<UpdateJadwal />} />
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
