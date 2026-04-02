import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FasilitasPage from "./pages/FasilitasPage";
import DokterPage from "./pages/DokterPage";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dokter" element={<DokterPage />} />
        <Route path="/fasilitas" element={<FasilitasPage />} />
      </Routes>
    </Router>
  );
}

export default App;