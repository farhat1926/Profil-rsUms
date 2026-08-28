import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Tambahkan ikon X untuk tombol close (tutup)
import { Search, ChevronLeft, ChevronRight, ArrowLeft, X } from "lucide-react";

export default function AsuransiPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // State baru untuk menyimpan URL gambar yang sedang di-preview
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const asuransiData = [
    { id: 2, name: "Jasa Raharja", logo: "/images/jasaraharja.webp" },
    { id: 3, name: "ISOMedik", logo: "/images/isomedik.webp" },
    { id: 4, name: "Reliance", logo: "/images/reliance.webp" },
    { id: 5, name: "MAG Insurance", logo: "/images/mag.webp" },
    { id: 6, name: "Meditap", logo: "/images/meditap.webp" },
  ];

  const filteredAsuransi = asuransiData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredAsuransi.length / itemsPerPage);

  const displayedAsuransi = filteredAsuransi.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50/50 py-12 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#245fa9] hover:text-blue-800 font-bold mb-8 transition-colors group"
          >
            <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
              <ArrowLeft size={20} />
            </div>
            Kembali ke Beranda
          </Link>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[#245fa9] mb-8">
            Asuransi
          </h1>

          <div className="relative mb-12">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari nama asuransi atau mitra..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-gray-700 text-lg"
            />
          </div>

          {displayedAsuransi.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {displayedAsuransi.map((item) => (
                <a
                  href="#"
                  // Fungsi klik untuk membuka preview gambar
                  onClick={(e) => {
                    e.preventDefault();
                    setPreviewImage(item.logo);
                  }}
                  key={item.id}
                  className="group flex flex-col items-center justify-center bg-white border border-gray-200 rounded-[1.5rem] p-8 md:p-10 transition-all duration-300 hover:border-blue-500 hover:shadow-lg cursor-zoom-in"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-3xl flex items-center justify-center p-4 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/150?text=Logo";
                      }}
                    />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-[#245fa9] text-center group-hover:text-blue-600">
                    {item.name}
                  </h3>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
              <p className="text-gray-500 font-medium text-lg">
                Asuransi "{searchQuery}" tidak ditemukan.
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16 overflow-x-auto pb-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2.5 border border-gray-200 rounded-xl transition-colors ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ChevronLeft size={20} />
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-11 h-11 flex items-center justify-center rounded-xl font-bold transition-colors ${
                    currentPage === index + 1
                      ? "bg-gray-900 text-white border border-gray-900"
                      : "bg-white/50 text-gray-700 border border-gray-200 hover:bg-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`p-2.5 border border-gray-200 rounded-xl transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================= BAGIAN POPUP PREVIEW GAMBAR ================= */}
      {previewImage && (
        <div
          // Klik area gelap untuk menutup popup
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md px-4 animate-in fade-in duration-300"
        >
          <div
            // Cegah klik di dalam kotak putih agar popup tidak ikut tertutup
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm md:max-w-md bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl flex items-center justify-center animate-in zoom-in-95 duration-300"
          >
            {/* Tombol Close */}
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-4 -right-4 md:-top-5 md:-right-5 z-10 bg-white border border-gray-200 hover:bg-gray-100 text-gray-800 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            >
              <X size={24} />
            </button>

            {/* Gambar yang di-preview */}
            <img
              src={previewImage}
              alt="Preview Asuransi"
              className="w-full max-h-[60vh] object-contain mix-blend-multiply"
            />
          </div>
        </div>
      )}
      {/* ================================================================ */}
    </>
  );
}
