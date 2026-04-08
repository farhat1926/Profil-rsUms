import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FasilitasPage from "./pages/FasilitasPage";
import DokterPage from "./pages/DokterPage";
import ContactSection from "./pages/ContactSection";
import ComplaintForm from "./pages/ComplaintForm";
import InformasiPage from "./pages/Informasipage";
import ArticleDetail from "./pages/ArticleDetail";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dokter" element={<DokterPage />} />
        <Route path="/fasilitas" element={<FasilitasPage />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/complaint" element={<ComplaintForm />} />
        <Route path="/informasi" element={<InformasiPage />} />
        <Route path="/informasi/:id" element={<ArticleDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;