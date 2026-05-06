import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Clock3 } from "lucide-react";

const fasilitasData = {
  igd: {
    title: "Instalasi Gawat Darurat (IGD)",
    image: "/igd.webp",
    desc: "Pelayanan medis darurat 24 jam untuk menangani pasien dengan kondisi kritis dan membutuhkan tindakan cepat.",
    layanan: [
      "Pelayanan emergensi 24 jam",
      "Ruang observasi pasien",
      "Penanganan trauma dan kecelakaan",
      "Tim dokter dan perawat siaga",
      "Ambulans darurat",
    ],
  },

  "rawat-inap": {
    title: "Instalasi Rawat Inap",
    image: "/rawat_Inap.webp",
    desc: "Ruang perawatan pasien dengan fasilitas nyaman dan pelayanan optimal untuk mendukung proses penyembuhan.",
    layanan: [
      "Kamar VIP dan kelas perawatan",
      "Monitoring pasien",
      "Pelayanan perawat 24 jam",
      "Fasilitas AC dan TV",
      "Kunjungan dokter rutin",
    ],
  },

  operasi: {
    title: "Instalasi Bedah / Kamar Operasi",
    image: "/ruang_operasi.webp",
    desc: "Ruang operasi modern dengan standar sterilitas tinggi dan teknologi medis terkini.",
    layanan: [
      "Operasi umum",
      "Operasi orthopedi",
      "Operasi minor dan mayor",
      "Peralatan steril modern",
      "Tim bedah profesional",
    ],
  },

  radiologi: {
    title: "Radiologi & Diagnostik",
    image: "/radiologi.webp",
    desc: "Layanan pemeriksaan penunjang medis menggunakan teknologi radiologi modern.",
    layanan: [
      "X-Ray",
      "USG",
      "CT Scan",
      "Pemeriksaan diagnostik",
      "Interpretasi dokter spesialis",
    ],
  },

  laboratorium: {
    title: "Laboratorium Klinik",
    image: "/lab.webp",
    desc: "Pemeriksaan laboratorium lengkap untuk membantu proses diagnosis penyakit.",
    layanan: [
      "Tes darah",
      "Tes urin",
      "Pemeriksaan gula darah",
      "Pemeriksaan kolesterol",
      "Pemeriksaan kesehatan rutin",
    ],
  },

  apotek: {
    title: "Apotek Rumah Sakit",
    image: "/farmasi.webp",
    desc: "Pelayanan farmasi lengkap dengan obat-obatan berkualitas dan tenaga farmasi profesional.",
    layanan: [
      "Pelayanan resep dokter",
      "Obat lengkap",
      "Konsultasi penggunaan obat",
      "Pelayanan cepat",
      "Farmasi 24 jam",
    ],
  },
};

function FasilitasDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const fasilitas = fasilitasData[slug];

  if (!fasilitas) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Fasilitas tidak ditemukan
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <section className="relative h-[350px] overflow-hidden">
        <img
          src={fasilitas.image}
          alt={fasilitas.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <button
              onClick={() => navigate(-1)}
              className="mb-6 flex items-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-5 py-3 rounded-xl transition cursor-pointer"
            >
              <ArrowLeft size={20} />
              Kembali
            </button>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {fasilitas.title}
            </h1>

            <p className="text-lg text-gray-200 max-w-3xl leading-relaxed">
              {fasilitas.desc}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Layanan Fasilitas
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                {fasilitas.layanan.map((item, index) => (
                  <div
                    key={index}
                    className="bg-green-50 border border-green-100 rounded-2xl p-5 hover:shadow-md transition"
                  >
                    <div className="flex gap-3 items-start">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>

                      <p className="text-gray-700 font-medium leading-relaxed">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="bg-white rounded-3xl shadow-md p-8 sticky top-28">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Informasi
              </h3>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <Clock3 className="text-green-600" size={22} />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      Jam Operasional
                    </p>
                    <p className="text-gray-600">24 Jam</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Phone className="text-blue-600" size={22} />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      Kontak Pelayanan
                    </p>
                    <p className="text-gray-600">0851-2997-2996</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold transition cursor-pointer">
                Hubungi Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FasilitasDetail;