import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Tag,
  LogOut,
} from "lucide-react";

// Import komponen-komponen dari folder yang sama
import EditPage from "./EditPage";
import InputEvent from "./InputEvent";
import InputInformasi from "./InputInformasi";
import InputPromo from "./InputPromo";

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // Proteksi Halaman
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  // Render konten dinamis
  const renderContent = () => {
    switch (activeMenu) {
      case "dokter":
        return <EditPage />;
      case "event":
        return <InputEvent />;
      case "informasi":
        return <InputInformasi />;
      case "promo":
        return <InputPromo />;
      case "dashboard":
      default:
        return (
          <>
            <header className="mb-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-800">
                Dashboard Overview
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600">
                  Halo, Admin
                </span>
                <div className="w-10 h-10 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <Users size={28} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Total Dokter
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800">24</h3>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                  <Calendar size={28} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Event Aktif
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800">5</h3>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[300px]">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Selamat Datang di Admin Panel
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                Gunakan menu navigasi di sebelah kiri untuk mengelola berbagai
                data *website* Rumah Sakit UMS A.R. Fachrudin.
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR FIXED */}
      <aside className="w-64 bg-[#0f2a4a] text-white flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-blue-900/50">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-xs text-gray-400 mt-1">RS UMS A.R. Fachrudin</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => setActiveMenu("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
              activeMenu === "dashboard"
                ? "bg-blue-900/50 text-white"
                : "text-gray-300 hover:bg-blue-900/30 hover:text-white"
            }`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>

          <button
            onClick={() => setActiveMenu("dokter")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
              activeMenu === "dokter"
                ? "bg-blue-900/50 text-white"
                : "text-gray-300 hover:bg-blue-900/30 hover:text-white"
            }`}
          >
            <Users size={20} /> Kelola Dokter
          </button>

          <button
            onClick={() => setActiveMenu("event")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
              activeMenu === "event"
                ? "bg-blue-900/50 text-white"
                : "text-gray-300 hover:bg-blue-900/30 hover:text-white"
            }`}
          >
            <Calendar size={20} /> Kelola Event
          </button>

          <button
            onClick={() => setActiveMenu("informasi")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
              activeMenu === "informasi"
                ? "bg-blue-900/50 text-white"
                : "text-gray-300 hover:bg-blue-900/30 hover:text-white"
            }`}
          >
            <FileText size={20} /> Kelola Informasi
          </button>

          <button
            onClick={() => setActiveMenu("promo")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
              activeMenu === "promo"
                ? "bg-blue-900/50 text-white"
                : "text-gray-300 hover:bg-blue-900/30 hover:text-white"
            }`}
          >
            <Tag size={20} /> Kelola Promo
          </button>
        </nav>

        <div className="p-4 border-t border-blue-900/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 px-4 py-3 rounded-lg font-medium transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT Area - Margin Left 64 (256px) untuk Sidebar */}
      <main className="flex-1 p-8 ml-64 overflow-y-auto h-screen">
        {renderContent()}
      </main>
    </div>
  );
}
