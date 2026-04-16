import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PromoPopup from "./components/Popup";

import Home from "./pages/Home";
import FasilitasPage from "./pages/FasilitasPage";
import DokterPage from "./pages/DokterPage";
import ContactSection from "./pages/ContactSection";
import ComplaintForm from "./pages/ComplaintForm";
import InformasiPage from "./pages/Informasipage";
import ArticleDetail from "./pages/ArticleDetail";
import JadwalDokter from "./components/JadwalDokter";
import Register from "./components/register";
import EditPage from "./pages/EditPage";
import UpdateJadwal from "./components/UpdateJadwal";

function AppContent() {
    const hideLayout = ["/login", "/register"];

    const isAuthPage = hideLayout.includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}
      <PromoPopup />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dokter" element={<DokterPage />} />
        <Route path="/fasilitas" element={<FasilitasPage />} />
        <Route path="/edit-jadwal" element={<EditPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/complaint" element={<ComplaintForm />} />
        <Route path="/informasi" element={<InformasiPage />} />
        <Route path="/informasi/:id" element={<ArticleDetail />} />
        <Route path="/JadwalDokter" element={<JadwalDokter />} />
        <Route path="/update-jadwal" element={<UpdateJadwal />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </>
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