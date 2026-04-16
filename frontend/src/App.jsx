import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PromoPopup from "./components/Popup";

import Home from "./pages/Home";
import FasilitasPage from "./pages/FasilitasPage";
import InputEvent from "./pages/InputEvent";
import DokterPage from "./pages/DokterPage";
import InformasiPage from "./pages/Informasipage";
import ArticleDetail from "./pages/ArticleDetail";
import JadwalDokter from "./components/JadwalDokter";
import Register from "./components/register";
import EditPage from "./pages/EditPage";
import UpdateJadwal from "./components/UpdateJadwal";
import WhatsAppFloat from "./components/WhatsAppFloat";
import EventDetail from "./components/EventDetail";
import InputInformasi from "./pages/InputInformasi";
import MeetDoctor from "./components/MeetDoctor";
import PromoPage from "./pages/PromoPage";
import DetailPromo from "./components/DetailPromo";
import InputPromo from "./components/InputPromo";


function AppContent() {
  const location = useLocation(); // WAJIB ADA

  const hideLayout = ["/login", "/register"];
  const isAuthPage = hideLayout.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <PromoPopup />
      <WhatsAppFloat />

      {/* isi halaman otomatis dorong footer */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meet-doctor" element={<MeetDoctor />} />
          <Route path="/input-promo" element={<InputPromo />} />
          <Route path="/dokter" element={<DokterPage />} />
          <Route path="/input-informasi" element={<InputInformasi />} />
          <Route path="/promo" element={<PromoPage />} />
          <Route path="/fasilitas" element={<FasilitasPage />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/edit-jadwal" element={<EditPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/input-event" element={<InputEvent />} />
          <Route path="/informasi" element={<InformasiPage />} />
          <Route path="/informasi/:id" element={<ArticleDetail />} />
          <Route path="/promo" element={<PromoPage />} />
        <Route
          path="/promo"
          element={<PromoPage />}
        />

        <Route
          path="/promo/:id"
          element={<DetailPromo />}
        />
          <Route path="/JadwalDokter" element={<JadwalDokter />} />
          <Route path="/update-jadwal" element={<UpdateJadwal />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
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