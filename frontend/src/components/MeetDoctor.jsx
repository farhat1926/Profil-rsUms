import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  MessageCircle,
  ArrowRight,
  Clock,
  CalendarDays,
} from "lucide-react";

const doctorList = [
  {
    id: 1,
    nama: "dr. Diah Kurnia Mirawati, Sp. S(K)",
    spesialis: "Spesialis Neurologi",
    image: "/dokter1.jpg",
    jadwal: {
      Senin: "08:00 - 12:00",
      Selasa: "09:00 - 13:00",
      Rabu: "08:00 - 11:00",
    },
  },
  {
    id: 2,
    nama: "dr. Erupsiana Fitri Indrihapsari, Sp.N",
    spesialis: "Spesialis Neurologi",
    image: "/dokter2.jpg",
    jadwal: {
      Senin: "10:00 - 14:00",
      Kamis: "08:00 - 12:00",
    },
  },
  {
    id: 3,
    nama: "dr. Naziya, Sp.M",
    spesialis: "Spesialis Mata",
    image: "/dokter3.jpg",
    jadwal: {
      Selasa: "08:00 - 12:00",
      Jumat: "09:00 - 13:00",
    },
  },
  {
    id: 4,
    nama: "drg. Astri Zuraida Jannati",
    spesialis: "Gigi",
    image: "/dokter4.jpg",
    jadwal: {
      Senin: "08:00 - 15:00",
    },
  },
  {
    id: 5,
    nama: "drg. Sri Indriyani, MM",
    spesialis: "Gigi",
    image: "/dokter5.jpg",
    jadwal: {
      Rabu: "09:00 - 14:00",
    },
  },
  {
    id: 6,
    nama: "drg. Andhita Permatasari",
    spesialis: "Gigi",
    image: "/dokter6.jpg",
    jadwal: {
      Kamis: "08:00 - 12:00",
    },
  },
];

export default function MeetDoctor() {
  const [openJadwal, setOpenJadwal] = useState(null);

  // State untuk membatasi jumlah dokter yang tampil awal (misal: 4 dokter)
  const [visibleCount, setVisibleCount] = useState(4);

  // Fungsi untuk menambah jumlah tampilan saat tombol diklik
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* ================= HERO HEADER SECTION ================= */}
      <section className="relative w-full h-[160px] md:h-[220px] bg-[#96d649]/70 flex flex-col justify-center items-center text-center px-4 overflow-hidden shadow-inner">
        <img
          src="/images/banner-web.png"
          alt="Banner Profil Dokter"
          className="absolute inset-0 w-full h-full object-cover -z-10 mix-blend-multiply opacity-70"
        />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 md:mb-3 drop-shadow-md">
            Profil Dokter
          </h1>
          <p className="text-white font-medium text-sm md:text-base max-w-2xl mx-auto drop-shadow-sm">
            Cari dan temukan jadwal dokter spesialis di RS UMS A.R. Fachrudin.
            Kami siap memberikan layanan kesehatan terbaik untuk Anda.
          </p>
        </div>
      </section>

      {/* ================= MAIN CONTENT: GRID DOKTER ================= */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Membatasi render dengan .slice(0, visibleCount) */}
          {doctorList.slice(0, visibleCount).map((doctor, index) => (
            <div
              key={doctor.id}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col"
            >
              {/* LAYOUT KARTU UTAMA (Kiri Foto, Kanan Info) */}
              <div className="flex gap-5 md:gap-6">
                {/* Foto Dokter */}
                <div className="w-[120px] md:w-[150px] shrink-0">
                  <Link to={`/doctor/${doctor.id}`}>
                    <img
                      src={doctor.image}
                      alt={doctor.nama}
                      // Penambahan object-top agar dahi dokter tidak terpotong
                      className="w-full aspect-[3/4] object-cover object-top rounded-2xl bg-gray-200 border border-gray-100"
                    />
                  </Link>
                </div>

                {/* Informasi Dokter */}
                <div className="flex-1 py-1 flex flex-col justify-between">
                  <div>
                    {/* Badge Spesialis */}
                    <span className="bg-[#175e97] text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-lg inline-block mb-3 shadow-sm">
                      {doctor.spesialis}
                    </span>

                    {/* Nama Dokter */}
                    <Link to={`/doctor/${doctor.id}`}>
                      <h2 className="text-xl md:text-2xl font-bold text-[#175e97] leading-tight mb-2 hover:text-green-600 transition-colors">
                        {doctor.nama}
                      </h2>
                    </Link>

                    {/* Deskripsi Singkat */}
                    <p className="text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed">
                      {doctor.nama} adalah Dokter Spesialis {doctor.spesialis}{" "}
                      yang memiliki kompetensi dalam menangani berbagai keluhan
                      dan penyakit terkait secara profesional.
                    </p>
                  </div>

                  {/* Tombol Profile & Jadwal */}
                  <button
                    onClick={() =>
                      setOpenJadwal(openJadwal === index ? null : index)
                    }
                    className="flex items-center gap-2 text-green-600 font-semibold text-sm hover:underline w-max mt-auto"
                  >
                    Profile lengkap / Jadwal
                    <ArrowRight
                      size={16}
                      className={`transition-transform duration-300 ${
                        openJadwal === index ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* EXPANDED JADWAL & BUTTONS */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openJadwal === index
                    ? "max-h-[500px] opacity-100 mt-6 pt-5 border-t border-gray-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="mb-5">
                  <div className="flex items-center gap-2 text-slate-800 font-bold mb-3">
                    <CalendarDays size={18} className="text-green-600" />
                    <h3>Jadwal Praktek</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(doctor.jadwal).map(([hari, jam]) => (
                      <div
                        key={hari}
                        className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center gap-3 hover:border-green-200 transition-colors"
                      >
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                          <Clock size={16} className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-700 uppercase">
                            {hari}
                          </p>
                          <p className="text-sm font-medium text-slate-500">
                            {jam}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tombol Aksi (Book & Kontak) */}
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-white border-2 border-green-600 text-green-600 rounded-xl py-3 flex justify-center items-center gap-2 font-bold hover:bg-green-600 hover:text-white transition-colors shadow-sm">
                    <Phone size={18} />
                    <span className="hidden md:inline">Book Appointment</span>
                    <span className="md:hidden">Booking</span>
                  </button>

                  <button className="bg-white border-2 border-blue-600 text-blue-600 rounded-xl py-3 flex justify-center items-center gap-2 font-bold hover:bg-blue-600 hover:text-white transition-colors shadow-sm">
                    <MessageCircle size={18} />
                    Kontak Cepat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= TOMBOL LIHAT LEBIH BANYAK ================= */}
        {visibleCount < doctorList.length && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="bg-white border-2 border-green-600 text-green-600 font-bold text-base px-10 py-3.5 rounded-full shadow-sm hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Lihat Lebih Banyak
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
