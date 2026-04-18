import React, { useState } from "react";

const kategoriList = [
  "Rawat Jalan",
  "Rawat Inap",
  "Layanan Unggulan",
  "Fasilitas Umum",
  "Fasilitas Penunjang",
];

const fasilitasData = [
  {
    title: "Poli Umum",
    category: "Rawat Jalan",
    image: "/poliklinik.jpeg",
    desc: "Pelayanan pemeriksaan umum oleh dokter untuk berbagai keluhan kesehatan.",
  },
  {
    title: "Poli Gigi",
    category: "Rawat Jalan",
    image: "/gigi.jpeg",
    desc: "Layanan pemeriksaan kesehatan gigi dan mulut.",
  },
  {
    title: "Threadmill",
    category: "Rawat Jalan",
    image: "/poli jantung.JPG",
    desc: "Fasilitas pemeriksaan kesehatan jantung dengan treadmill test.",
  },
  {
    title: "Echo",
    category: "Rawat Jalan",
    image: "/usg.JPG",
    desc: "Pemeriksaan echocardiography untuk evaluasi kondisi jantung.",
  },
  {
    title: "USG 4D",
    category: "Rawat Jalan",
    image: "/usg.JPG",
    desc: "USG 4D untuk pemeriksaan kandungan dan organ tubuh.",
  },
  {
    title: "USG Abdomen",
    category: "Rawat Jalan",
    image: "/abdomen.JPG",
    desc: "Pemeriksaan organ perut dan abdomen.",
  },
  {
    title: "THT Endoscopy",
    category: "Rawat Jalan",
    image: "/tht.JPG",
    desc: "Pemeriksaan saluran telinga, hidung, dan tenggorokan.",
  },
  {
    title: "Kamar VVIP",
    category: "Rawat Inap",
    image: "/kamar_vip.jpeg",
    desc: "Kamar perawatan premium dengan fasilitas lengkap.",
  },
  {
    title: "Kamar VIP",
    category: "Rawat Inap",
    image: "/kelas_1.jpg",
    desc: "Kamar rawat inap nyaman dengan privasi lebih.",
  },
  {
    title: "Kamar Kelas 1",
    category: "Rawat Inap",
    image: "/kelas1.JPG",
    desc: "Kamar rawat inap kelas 1 dengan fasilitas standar terbaik.",
  },
  {
    title: "Kamar Kelas 2",
    category: "Rawat Inap",
    image: "/kelas 2.JPG",
    desc: "Kamar kelas 2 untuk perawatan pasien.",
  },
  {
    title: "Kamar Kelas 3",
    category: "Rawat Inap",
    image: "/kelas_1.jpg",
    desc: "Kamar kelas 3 dengan kapasitas lebih banyak.",
  },
  {
    title: "Rontgen",
    category: "Layanan Unggulan",
    image: "/scan_radiologi.jpeg",
    desc: "Layanan pemeriksaan radiologi dan rontgen.",
  },
  {
    title: "Fetomaternal",
    category: "Layanan Unggulan",
    image: "/scan_radiologi.jpeg",
    desc: "Pelayanan kesehatan ibu dan janin.",
  },
  {
    title: "Masjid",
    category: "Fasilitas Umum",
    image: "/moshola.JPG",
    desc: "Tempat ibadah untuk pasien dan keluarga.",
  },
  {
    title: "Kantin",
    category: "Fasilitas Umum",
    image: "/kantin.png",
    desc: "Menyediakan makanan dan minuman.",
  },
  {
    title: "Taman Bermain",
    category: "Fasilitas Umum",
    image: "/Taman_Bermain.jpeg",
    desc: "Area bermain anak yang nyaman.",
  },
  {
    title: "Parkir",
    category: "Fasilitas Umum",
    image: "/parkiran.JPG",
    desc: "Area parkir luas dan aman.",
  },
  {
    title: "Ruang Operasi",
    category: "Fasilitas Penunjang",
    image: "/ruang_operasi.jpeg",
    desc: "Ruang tindakan operasi dengan standar medis.",
  },
  {
    title: "Radiologi",
    category: "Fasilitas Penunjang",
    image: "/scan_radiologi.jpeg",
    desc: "Pemeriksaan radiologi modern.",
  },
  {
    title: "Laboratorium",
    category: "Fasilitas Penunjang",
    image: "/laboratorium.JPG",
    desc: "Pemeriksaan laboratorium lengkap.",
  },
  {
    title: "Farmasi",
    category: "Fasilitas Penunjang",
    image: "/farm.jpeg",
    desc: "Pelayanan obat dan resep pasien.",
  },
];

export default function FasilitasPage() {
  const [activeKategori, setActiveKategori] = useState("Fasilitas Umum");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const filteredData = fasilitasData.filter(
    (item) => item.category === activeKategori,
  );

  const toggleDetail = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      {/* ================= HERO HEADER SECTION ================= */}
      <section className="relative w-full h-[160px] md:h-[220px] bg-[#96d649]/70 flex flex-col justify-center items-center text-center px-4 overflow-hidden shadow-inner">
        <img
          src="/images/banner-web.png"
          alt="Banner Fasilitas"
          className="absolute inset-0 w-full h-full object-cover z-10 mix-blend-multiply opacity-20"
        />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 md:mb-3 drop-shadow-md">
            Fasilitas Rumah Sakit
          </h1>
          <p className="text-white font-medium text-sm md:text-base max-w-2xl mx-auto drop-shadow-sm">
            Jelajahi berbagai layanan rawat jalan, rawat inap, dan fasilitas
            penunjang medis unggulan di RS UMS A.R. Fachrudin.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-10">
        <div className="flex gap-3 mb-10 flex-wrap">
          {kategoriList.map((kategori) => (
            <button
              key={kategori}
              onClick={() => {
                setActiveKategori(kategori);
                setExpandedIndex(null);
              }}
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

        <div className="grid md:grid-cols-2 gap-10">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="w-full h-80 bg-gray-300 rounded-md overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-xl font-semibold">{item.title}</p>
                {expandedIndex === index && (
                  <p className="mt-3 text-gray-600 leading-7">{item.desc}</p>
                )}
                <button
                  onClick={() => toggleDetail(index)}
                  className="mt-3 text-lime-600 font-medium hover:underline"
                >
                  {expandedIndex === index ? "Sembunyikan" : "Selengkapnya"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
