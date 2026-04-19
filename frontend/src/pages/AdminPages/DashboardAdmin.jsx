import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Tag,
  LogOut,
  Menu,
  X,
  Activity,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Import Komponen Manajemen Anda
import ManageDokter from "./ManageDokter";
import ManageEvent from "./ManageEvent";
import ManageInformasi from "./ManageInformasi";
import ManagePromo from "./ManagePromo";

// Data Dummy untuk Grafik Pengunjung
const visitorData = [
  { name: "Sen", pengunjung: 400 },
  { name: "Sel", pengunjung: 300 },
  { name: "Rab", pengunjung: 550 },
  { name: "Kam", pengunjung: 450 },
  { name: "Jum", pengunjung: 600 },
  { name: "Sab", pengunjung: 800 },
  { name: "Min", pengunjung: 750 },
];

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk Sidebar Mobile
  const [stats, setStats] = useState({
    dokter: 0,
    event: 0,
    informasi: 0,
    promo: 0,
  });

  const API_URL = import.meta.env.VITE_API_URL;

  // Proteksi Route
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin");
  }, [navigate]);

  // Fetch Summary Data secara Real-time
  useEffect(() => {
    if (activeMenu === "dashboard") {
      const fetchStats = async () => {
        try {
          const [resDokter, resEvent, resInfo, resPromo] = await Promise.all([
            fetch(`${API_URL}/jadwal`),
            fetch(`${API_URL}/event`),
            fetch(`${API_URL}/informasi`),
            fetch(`${API_URL}/promo`),
          ]);

          const dataDokter = await resDokter.json();
          const dataEvent = await resEvent.json();
          const dataInfo = await resInfo.json();
          const dataPromo = await resPromo.json();

          // Menghitung jumlah dokter unik (karena 1 dokter bisa punya banyak jadwal)
          const uniqueDokter = new Set(dataDokter.map((d) => d.id)).size;

          setStats({
            dokter: uniqueDokter,
            event: dataEvent.length,
            informasi: dataInfo.length,
            promo: dataPromo.length,
          });
        } catch (error) {
          console.error("Gagal mengambil data statistik:", error);
        }
      };
      fetchStats();
    }
  }, [activeMenu, API_URL]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  // Tutup sidebar jika menu diklik (khusus di mobile)
  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    setIsSidebarOpen(false);
  };

  // Render Konten Utama Dashboard
  const renderDashboardSummary = () => (
    <div className="animate-in fade-in duration-500 space-y-6">
      {/* Kartu Ringkasan (Stats Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Dokter</p>
            <h4 className="text-2xl font-bold text-gray-800">{stats.dokter}</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Event Aktif</p>
            <h4 className="text-2xl font-bold text-gray-800">{stats.event}</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Informasi</p>
            <h4 className="text-2xl font-bold text-gray-800">
              {stats.informasi}
            </h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
            <Tag size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Promo</p>
            <h4 className="text-2xl font-bold text-gray-800">{stats.promo}</h4>
          </div>
        </div>
      </div>

      {/* Area Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik Garis - Pengunjung Website */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="text-blue-500" size={20} />
            <h3 className="text-lg font-bold text-gray-800">
              Trafik Pengunjung (Mingguan)
            </h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#eee"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af" }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="pengunjung"
                  stroke="#3b82f6"
                  strokeWidth={4}
                  dot={{
                    r: 4,
                    fill: "#3b82f6",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grafik Batang - Interaksi */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-green-500" size={20} />
            <h3 className="text-lg font-bold text-gray-800">
              Interaksi Layanan
            </h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitorData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#eee"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af" }}
                />
                <Tooltip
                  cursor={{ fill: "#f3f4f6" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="pengunjung"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case "dokter":
        return <ManageDokter API_URL={API_URL} />;
      case "event":
        return <ManageEvent API_URL={API_URL} />;
      case "informasi":
        return <ManageInformasi API_URL={API_URL} />;
      case "promo":
        return <ManagePromo API_URL={API_URL} />;
      default:
        return renderDashboardSummary();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans overflow-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0f2a4a] text-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-blue-900/50 flex flex-col items-center relative">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
          <div className="bg-white p-2 rounded-full mb-3 mt-4">
            {/* Pastikan Anda memiliki logo-rs.png di folder public frontend Anda */}
            <img
              src="/images/logo square.png"
              alt="Logo RS"
              className="w-16 h-16 object-contain"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/64?text=RS")
              }
            />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-center">
            RS UMS
          </h2>
          <p className="text-[11px] text-blue-300 mt-0.5 uppercase font-bold tracking-[0.1em] text-center">
            A.R. Fachrudin
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          {[
            {
              id: "dashboard",
              icon: <LayoutDashboard size={20} />,
              label: "Dashboard",
            },
            { id: "dokter", icon: <Users size={20} />, label: "Kelola Dokter" },
            {
              id: "event",
              icon: <Calendar size={20} />,
              label: "Kelola Event",
            },
            {
              id: "informasi",
              icon: <FileText size={20} />,
              label: "Kelola Informasi",
            },
            { id: "promo", icon: <Tag size={20} />, label: "Kelola Promo" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium transition-all duration-300 ${
                activeMenu === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40 md:translate-x-1"
                  : "text-blue-100/70 hover:bg-blue-900/40 hover:text-white"
              }`}
            >
              <span
                className={
                  activeMenu === item.id ? "text-white" : "text-blue-400"
                }
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-900/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 text-red-400 hover:bg-red-500/10 px-4 py-3.5 rounded-xl font-bold transition-colors group"
          >
            <LogOut
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Keluar Panel
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col min-h-screen md:ml-72 transition-all duration-300">
        {/* Header Top Bar */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100 px-6 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            {/* Tombol Hamburger Mobile */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200"
            >
              <Menu size={24} />
            </button>

            <div className="hidden sm:block">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Halaman
              </h3>
              <p className="text-xl font-bold text-gray-800 capitalize">
                {activeMenu.replace("-", " ")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 px-3 md:px-4 py-2 rounded-2xl border border-gray-100">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-800">Administrator</p>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">
                Online
              </p>
            </div>
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
