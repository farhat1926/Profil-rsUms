import React, { useState } from "react";

const kategoriList = [
  "Rawat Jalan",
  "Rawat Inap",
  "Layanan Unggulan",
  "Fasilitas Umum",
  "Fasilitas Penunjang",
];

const fasilitasData = [
  { title: "Poli Umum", category: "Rawat Jalan", image: "/poliklinik.jpeg" },
  { title: "Poli Gigi", category: "Rawat Jalan", image: "/gigi.jpeg" },

  { title: "Kamar VIP", category: "Rawat Inap", image: "/kamar_vip.jpeg" },
  { title: "Kamar Kelas 1", category: "Rawat Inap", image: "/kelas_1.jpg" },

  { title: "Rontgen", category: "Layanan Unggulan", image: "/scan_radiologi.jpeg" },
  { title: "MRI", category: "Layanan Unggulan", image: "/mri.jpg" },

  { title: "Masjid", category: "Fasilitas Umum", image: "/masjid.jpg" },
  { title: "Kantin", category: "Fasilitas Umum", image: "/kantin.jpg" },
  { title: "Minimarket", category: "Fasilitas Umum", image: "/minimarket.jpg" },
  { title: "Parkir", category: "Fasilitas Umum", image: "/parkir.jpg" },

  { title: "Ruang Operasi", category: "Fasilitas Penunjang", image: "/ruang_operasi.jpeg" },
  { title: "Radiologi", category: "Fasilitas Penunjang", image: "/scan_radiologi.jpeg" },
];

export default function FasilitasPage() {
  const [activeKategori, setActiveKategori] = useState("Fasilitas Umum");

  const filteredData = fasilitasData.filter(
    (item) => item.category === activeKategori
  );

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-10">
      {/* Title */}
      <h1 className="text-5xl font-bold mb-6">Fasilitas RS UMS</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-10 flex-wrap">
        {kategoriList.map((kategori) => (
          <button
            key={kategori}
            onClick={() => setActiveKategori(kategori)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              activeKategori === kategori
                ? "bg-lime-500 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {kategori}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-10">
        {filteredData.map((item, index) => (
          <div key={index}>
            {/* Image */}
            <div className="w-full h-52 bg-gray-300 rounded-md overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <p className="mt-3 text-lg font-medium">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}