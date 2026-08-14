import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Tag,
  LogOut,
  Menu,
  X,
  Activity,
  TrendingUp,
  Video,
  Eye, // Ditambahkan untuk icon views
  Award, // Ditambahkan untuk icon terpopuler
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

import ManageDokter from "./ManageDokter";
import ManageInformasi from "./ManageInformasi";
import ManagePromo from "./ManagePromo";
import ManageReels from "./ManageReels";

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    dokter: 0,
    informasi: 0,
    promo: 0,
    reels: 0,
  });

  // State baru untuk menyimpan Top 5 Artikel Terpopuler
  const [popularArticles, setPopularArticles] = useState([]);
  const [visitorChartData, setVisitorChartData] = useState([]);
  const [timeFilter, setTimeFilter] = useState("7days");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (activeMenu === "dashboard") {
      const fetchStats = async () => {
        try {
          const [resDokter, resInfo, resPromo, resReels] = await Promise.all([
            fetch(`${API_URL}/jadwal`),
            fetch(`${API_URL}/informasi`),
            fetch(`${API_URL}/promo`),
            fetch(`${API_URL}/reels`),
          ]);

          const dataDokter = await resDokter.json();
          const dataInfo = await resInfo.json();
          const dataPromo = await resPromo.json();
          const dataReels = await resReels.json();

          const uniqueDokter = new Set(dataDokter.map((d) => d.id)).size;

          setStats({
            dokter: uniqueDokter,
            informasi: dataInfo.length,
            promo: dataPromo.length,
            reels: dataReels.length,
          });

          // LOGIKA MENGAMBIL ARTIKEL TERPOPULER
          // 1. Urutkan berdasarkan 'views' dari yang paling besar ke kecil
          // 2. Ambil 5 data teratas (slice)
          const sortedArticles = [...dataInfo]
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 5);

          setPopularArticles(sortedArticles);
        } catch (error) {
          console.error("Gagal mengambil data statistik:", error);
        }
      };
      fetchStats();
    }
  }, [activeMenu, API_URL]);

  useEffect(() => {
    if (activeMenu === "dashboard") {
      const fetchChartData = async () => {
        try {
          const res = await fetch(
            `${API_URL}/visitors/stats?filter=${timeFilter}`,
          );
          const data = await res.json();
          setVisitorChartData(data);
        } catch (error) {
          console.error("Gagal mengambil data grafik pengunjung:", error);
        }
      };
      fetchChartData();
    }
  }, [activeMenu, timeFilter, API_URL]);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.go(1);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin", { replace: true });
  };

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    setIsSidebarOpen(false);
  };

  const renderDashboardSummary = () => (
    <div className="animate-in fade-in duration-500 space-y-6">
      {/* KARTU STATISTIK ATAS */}
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
          <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Artikel</p>
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

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
            <Video size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Reels</p>
            <h4 className="text-2xl font-bold text-gray-800">{stats.reels}</h4>
          </div>
        </div>
      </div>

      {/* AREA GRAFIK PENGUNJUNG & ARTIKEL TERPOPULER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KOLOM KIRI (LEBAR 2/3) - Grafik Interaksi */}
        <div className="lg:col-span-2 space-y-6">
          {/* GRAFIK GARIS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Activity className="text-blue-500" size={20} />
                <h3 className="text-lg font-bold text-gray-800">
                  Trafik Pengunjung
                </h3>
              </div>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm hover:bg-gray-100 transition-colors"
              >
                <option value="7days">7 Hari Terakhir</option>
                <option value="this_week">Minggu Ini</option>
                <option value="last_week">Minggu Kemarin</option>
                <option value="this_month">Bulan Ini</option>
                <option value="last_month">Bulan Kemarin</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              {visitorChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={visitorChartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#eee"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af" }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      formatter={(value) => [`${value} Orang`, "Pengunjung"]}
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
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 font-medium">
                  Belum ada data
                </div>
              )}
            </div>
          </div>

          {/* GRAFIK BATANG */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="text-green-500" size={20} />
              <h3 className="text-lg font-bold text-gray-800">
                Interaksi Pengunjung
              </h3>
            </div>
            <div className="h-[300px] w-full">
              {visitorChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={visitorChartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#eee"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af" }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      cursor={{ fill: "#f3f4f6" }}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      formatter={(value) => [`${value} Orang`, "Pengunjung"]}
                    />
                    <Bar
                      dataKey="pengunjung"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 font-medium">
                  Belum ada data
                </div>
              )}
            </div>
          </div>
        </div>

        {/* KOLOM KANAN (LEBAR 1/3) - Artikel Terpopuler */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <Award className="text-yellow-500" size={24} />
              <h3 className="text-lg font-bold text-gray-800">
                5 Artikel Terpopuler
              </h3>
            </div>

            <div className="space-y-4">
              {popularArticles.length > 0 ? (
                popularArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                  >
                    <div className="flex items-center gap-3 flex-1 overflow-hidden">
                      {/* Desain Ranking Number */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${
                          index === 0
                            ? "bg-yellow-100 text-yellow-600"
                            : index === 1
                              ? "bg-gray-200 text-gray-600"
                              : index === 2
                                ? "bg-orange-100 text-orange-600"
                                : "bg-blue-50 text-blue-400"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-bold text-gray-800 line-clamp-1 truncate"
                          title={article.title}
                        >
                          {article.title}
                        </p>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-green-600 mt-0.5">
                          {article.category}
                        </p>
                      </div>
                    </div>

                    {/* Badge Views */}
                    <div className="flex items-center gap-1.5 bg-gray-100/80 text-gray-600 px-3 py-1.5 rounded-full text-xs font-bold shrink-0">
                      <Eye size={14} className="text-blue-500" />
                      {article.views || 0}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic text-center py-4">
                  Belum ada data pembaca.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case "dokter":
        return <ManageDokter API_URL={API_URL} />;
      case "informasi":
        return <ManageInformasi API_URL={API_URL} />;
      case "promo":
        return <ManagePromo API_URL={API_URL} />;
      case "reels":
        return <ManageReels API_URL={API_URL} />;
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
              id: "informasi",
              icon: <FileText size={20} />,
              label: "Kelola Artikel",
            },
            { id: "promo", icon: <Tag size={20} />, label: "Kelola Promo" },
            {
              id: "reels",
              icon: <Video size={20} />,
              label: "Kelola Reels",
            },
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

      <main className="flex-1 flex flex-col min-h-screen md:ml-72 transition-all duration-300">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100 px-6 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
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

        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
