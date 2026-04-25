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
    image: "/poliklinik.webp",
    desc: "Poli Umum menyediakan layanan pemeriksaan kesehatan menyeluruh untuk berbagai keluhan medis yang umum dialami pasien, mulai dari penyakit ringan hingga kondisi yang membutuhkan penanganan lanjutan. Didukung oleh dokter profesional dan berpengalaman, fasilitas ini dilengkapi dengan peralatan medis yang memadai untuk memastikan diagnosis yang cepat dan akurat, sehingga pasien mendapatkan penanganan awal yang tepat, efektif, dan aman.",
  },
  {
    title: "Poli Gigi",
    category: "Rawat Jalan",
    image: "/gigi.webp",
    desc: "Poli Gigi memberikan pelayanan lengkap untuk menjaga kesehatan gigi dan mulut, mulai dari pemeriksaan rutin, pembersihan karang gigi (scaling), penanganan gigi berlubang, hingga konsultasi kesehatan mulut. Ditangani oleh dokter gigi berpengalaman dengan pendekatan yang ramah pasien, layanan ini mengutamakan kenyamanan, kebersihan, dan keamanan dalam setiap tindakan medis.",
  },
  {
    title: "Threadmill",
    category: "Rawat Jalan",
    image: "/poli jantung.webp",
    desc: "Fasilitas treadmill test digunakan untuk mengevaluasi kondisi kesehatan jantung dengan memantau respon jantung terhadap aktivitas fisik. Pemeriksaan ini sangat membantu dalam mendeteksi gangguan jantung secara dini dan akurat, serta dilakukan dengan alat modern di bawah pengawasan tenaga medis profesional untuk memastikan keamanan dan hasil yang optimal.",
  },
  {
    title: "Echo",
    category: "Rawat Jalan",
    image: "/usg.webp",
    desc: "Layanan echocardiography (Echo) berfungsi untuk menilai struktur dan fungsi jantung secara detail menggunakan teknologi pencitraan ultrasonografi. Pemeriksaan ini membantu dokter dalam mendiagnosis berbagai kondisi jantung dengan lebih akurat, cepat, dan non-invasif, sehingga pasien mendapatkan penanganan yang tepat sesuai kondisi kesehatannya.",
  },
  {
    title: "USG Abdomen",
    category: "Rawat Jalan",
    image: "/abdomen.webp",
    desc: "USG Abdomen merupakan pemeriksaan non-invasif yang digunakan untuk melihat kondisi organ dalam perut seperti hati, ginjal, pankreas, dan kandung empedu. Dengan menggunakan teknologi ultrasonografi modern, pemeriksaan ini aman, cepat, dan memberikan hasil yang akurat untuk membantu proses diagnosis tanpa menimbulkan rasa sakit.",
  },
  {
    title: "THT Endoscopy",
    category: "Rawat Jalan",
    image: "/tht.webp",
    desc: "Layanan THT Endoscopy memungkinkan pemeriksaan mendalam pada telinga, hidung, dan tenggorokan menggunakan alat endoskopi canggih. Prosedur ini membantu dokter dalam mendeteksi gangguan secara lebih detail dan akurat, dengan metode yang aman serta minim rasa tidak nyaman bagi pasien.",
  },
  {
    title: "Kamar VVIP",
    category: "Rawat Inap",
    image: "/kamar_vip.webp",
    desc: "Kamar VVIP menawarkan fasilitas perawatan eksklusif dengan tingkat kenyamanan tertinggi bagi pasien. Dilengkapi ruang pribadi, fasilitas premium, serta pelayanan khusus, kamar ini dirancang untuk memberikan pengalaman perawatan yang lebih tenang, nyaman, dan berkualitas bagi pasien dengan kebutuhan khusus.",
  },
  {
    title: "Kamar VIP",
    category: "Rawat Inap",
    image: "/kelas_1.webp",
    desc: "Kamar VIP menyediakan ruang perawatan dengan privasi lebih tinggi dan fasilitas yang lengkap untuk mendukung proses penyembuhan pasien. Dengan lingkungan yang tenang dan pelayanan optimal dari tenaga medis, pasien dapat beristirahat dengan nyaman selama masa perawatan.",
  },
  {
    title: "Kamar Kelas 1",
    category: "Rawat Inap",
    image: "/kelas1.webp",
    desc: "Kamar Kelas 1 menawarkan fasilitas rawat inap dengan standar yang baik dan nyaman, dilengkapi dengan peralatan medis yang memadai untuk menunjang proses penyembuhan. Pelayanan diberikan secara profesional untuk memastikan pasien mendapatkan perawatan terbaik.",
  },
  {
    title: "Kamar Kelas 2",
    category: "Rawat Inap",
    image: "/kelas 2.webp",
    desc: "Kamar Kelas 2 dirancang untuk memberikan kenyamanan dengan fasilitas yang cukup lengkap dan biaya yang lebih terjangkau. Dengan kapasitas sedang, pasien tetap mendapatkan pelayanan medis yang optimal dari tenaga kesehatan berpengalaman.",
  },
  {
    title: "Kamar Kelas 3",
    category: "Rawat Inap",
    image: "/kelas_3.webp",
    desc: "Kamar Kelas 3 menyediakan layanan rawat inap dengan kapasitas lebih besar dan biaya yang ekonomis, sehingga dapat diakses oleh lebih banyak pasien. Meskipun sederhana, fasilitas ini tetap mengutamakan kenyamanan dan pelayanan yang baik.",
  },
  {
    title: "Rontgen",
    category: "Layanan Unggulan",
    image: "/scan_radiologi.webp",
    desc: "Layanan rontgen menyediakan pemeriksaan radiologi untuk membantu mendeteksi berbagai kondisi kesehatan dengan cepat dan akurat. Dengan teknologi pencitraan modern, hasil pemeriksaan dapat digunakan sebagai dasar diagnosis yang tepat oleh dokter.",
  },
  {
    title: "Fetomaternal",
    category: "Layanan Unggulan",
    image: "/feto.webp",
    desc: "Fasilitas fetomaternal memberikan pelayanan khusus bagi ibu hamil dan janin, termasuk pemantauan kondisi kehamilan secara menyeluruh. Ditangani oleh dokter spesialis berpengalaman, layanan ini bertujuan menjaga kesehatan ibu dan bayi hingga proses persalinan.",
  },
  {
    title: "Masjid",
    category: "Fasilitas Umum",
    image: "/moshola.webp",
    desc: "Masjid rumah sakit menyediakan tempat ibadah yang nyaman, bersih, dan tenang bagi pasien, keluarga, maupun pengunjung. Lingkungan yang kondusif membantu memberikan ketenangan spiritual selama berada di rumah sakit.",
  },
  {
    title: "Kantin",
    category: "Fasilitas Umum",
    image: "/kantin.webp",
    desc: "Kantin menyediakan berbagai pilihan makanan dan minuman yang higienis, lezat, dan terjangkau bagi pasien maupun pengunjung. Dengan suasana yang nyaman, kantin menjadi tempat istirahat yang menyenangkan di lingkungan rumah sakit.",
  },
  {
    title: "Taman Bermain",
    category: "Fasilitas Umum",
    image: "/Taman_Bermain.webp",
    desc: "Taman bermain anak dirancang sebagai area rekreasi yang aman dan menyenangkan bagi anak-anak pasien maupun pengunjung. Dilengkapi berbagai permainan menarik, fasilitas ini membantu mengurangi rasa bosan selama berada di rumah sakit.",
  },
  {
    title: "Parkir",
    category: "Fasilitas Umum",
    image: "/parkiran.webp",
    desc: "Area parkir luas dan tertata rapi disediakan untuk kenyamanan pengunjung dengan sistem keamanan yang terjamin. Lokasinya mudah diakses dan mampu menampung berbagai jenis kendaraan.",
  },
  {
    title: "Ruang Operasi",
    category: "Fasilitas Penunjang",
    image: "/ruang_operasi.webp",
    desc: "Ruang operasi dilengkapi dengan peralatan medis modern dan standar sterilisasi tinggi untuk menunjang berbagai tindakan bedah. Ditangani oleh tim medis profesional, fasilitas ini menjamin keamanan dan keberhasilan prosedur operasi.",
  },
  {
    title: "Radiologi",
    category: "Fasilitas Penunjang",
    image: "/scan_radiologi.webp",
    desc: "Unit radiologi menyediakan berbagai layanan pencitraan medis dengan teknologi modern untuk membantu diagnosis penyakit secara akurat. Didukung tenaga ahli, proses pemeriksaan dilakukan dengan cepat dan aman.",
  },
  {
    title: "Laboratorium",
    category: "Fasilitas Penunjang",
    image: "/laboratorium.webp",
    desc: "Laboratorium menyediakan berbagai jenis pemeriksaan medis mulai dari tes darah hingga analisis lanjutan dengan hasil yang cepat dan terpercaya. Dikelola oleh tenaga profesional, layanan ini menjadi penunjang penting dalam proses diagnosis.",
  },
  {
    title: "Farmasi",
    category: "Fasilitas Penunjang",
    image: "/farm.webp",
    desc: "Instalasi farmasi memberikan pelayanan obat dan resep secara lengkap dengan standar kualitas tinggi. Didukung oleh apoteker berpengalaman, pasien juga mendapatkan edukasi terkait penggunaan obat yang aman dan efektif.",
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
