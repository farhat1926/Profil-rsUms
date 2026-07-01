import React from "react";
import { Link } from "react-router-dom";

const fasilitas = [
  {
    title: "IGD",
    desc: "Fasilitas pelayanan darurat 24 jam untuk menangani kondisi kritis dan kebutuhan medis mendesak.",
    img: "/igd.webp",
    link: "/FasilitasPages/igd",
  },
  {
    title: "Instalasi Rawat Inap",
    desc: "Ruang perawatan dengan berbagai kelas yang nyaman, higienis, dan dilengkapi fasilitas pendukung pasien.",
    img: "/rawat_Inap.webp",
    link: "/FasilitasPages/rawat-inap",
  },
  {
    title: "Instalasi Bedah / Kamar Operasi",
    desc: "Ruang operasi modern dengan peralatan medis steril dan teknologi canggih untuk tindakan pembedahan.",
    img: "/ruang_operasi.webp",
    link: "/FasilitasPages/ruang-operasi",
  },
  {
    title: "Instalasi Radiologi & Diagnostik",
    desc: "Layanan pemeriksaan seperti X-ray dan USG untuk diagnosa yang akurat dan cepat.",
    img: "/radiologi.webp",
    link: "/FasilitasPages/radiologi",
  },
  {
    title: "Laboratorium Klinik",
    desc: "Fasilitas pemeriksaan darah, urin, dan berbagai tes medis untuk mendukung diagnosis dan pengobatan.",
    img: "/lab.webp",
    link: "/FasilitasPages/laboratorium",
  },
  {
    title: "Apotek Rumah Sakit",
    desc: "Pelayanan farmasi lengkap untuk memenuhi kebutuhan obat pasien sesuai resep dokter.",
    img: "/farmasi.webp",
    link: "/FasilitasPages/apotek",
  },
];

const FasilitasSection = () => {
  return (
    <section id="fasilitas" className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-green-500 mb-2">
              Fasilitas
            </h1>
            <h2 className="text-2xl font-semibold">RS UMS A.R. Fachrudin</h2>
          </div>
          <p className="max-w-2xl text-base text-gray-600 leading-relaxed">
            Fasilitas 24 jam yang menangani pasien dengan kondisi darurat medis.
            Dilengkapi ruang triase, ruang resusitasi, observasi, perawatan
            luka, serta peralatan penunjang emergensi.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {fasilitas.map((item) => (
            <Link
              to={item.link}
              key={item.title}
              className="relative rounded-2xl overflow-hidden group shadow-md border border-gray-100 block cursor-pointer hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-52 object-cover group-hover:scale-110 transition duration-300"
              />

              <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end">
                <h3 className="text-green-400 font-bold text-lg mb-1">
                  ✳ {item.title}
                </h3>

                <p className="text-white text-sm">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FasilitasSection;
