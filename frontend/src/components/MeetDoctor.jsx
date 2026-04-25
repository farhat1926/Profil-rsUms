import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  CalendarDays,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function MeetDoctor() {
  const [openJadwal, setOpenJadwal] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [doctorList, setDoctorList] = useState([]);
  const [search, setSearch] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const filteredDoctors = doctorList.filter((doctor) =>
  doctor.nama.toLowerCase().includes(search.toLowerCase()) ||
  doctor.spesialis.toLowerCase().includes(search.toLowerCase())
);
useEffect(() => {
  setVisibleCount(4);
}, [search]);
{filteredDoctors.length === 0 && (
  <p className="text-center text-gray-500 mt-10">
    Dokter tidak ditemukan
  </p>
)}

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };
  useEffect(() => {
    fetch(`${API_URL}/jadwal`)
      .then((res) => res.json())
      .then((data) => {
        const result = {};

        data.forEach((item) => {
          if (!result[item.id]) {
            result[item.id] = {
              id: item.id,
              nama: item.nama_dokter,
              spesialis: item.spesialis,
              image: item.image,
              deskripsi: item.deskripsi, // 🔥 ambil dari DB
              jadwal: {},
            };
          }

          if (item.hari && item.jam) {
            result[item.id].jadwal[item.hari] = item.jam;
          }
        });

        setDoctorList(Object.values(result));
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* ================= HERO HEADER SECTION ================= */}
      <section className="relative w-full h-[160px] md:h-[220px] bg-[#96d649]/70 flex flex-col justify-center items-center text-center px-4 overflow-hidden shadow-inner">
        <img
          src="images/banner-web.png"
          alt="Banner Profil Dokter"
          className="absolute inset-0 w-full h-full object-cover z-10 mix-blend-multiply opacity-20"
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
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Cari nama dokter atau spesialis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-[400px] px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {filteredDoctors.length === 0 ? (
            <p className="col-span-2 text-center text-gray-500 mt-10">
              Dokter tidak ditemukan
            </p>
          ) : (
            filteredDoctors.slice(0, visibleCount).map((doctor, index) => (
              <div key={doctor.id}>
                {/* isi card dokter kamu */}
              </div>
            ))
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {filteredDoctors.slice(0, visibleCount).map((doctor, index) => (
            <div
              key={doctor.id}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col"
            >
              {/* LAYOUT KARTU UTAMA */}
              <div className="flex gap-5 md:gap-6">
                {/* Foto Dokter */}
                <div className="w-[120px] md:w-[150px] shrink-0">
                  <Link to={`/doctor/${doctor.id}`}>
                    <img
                      src={`${API_URL}${doctor.image}`}
                      alt={doctor.nama}
                      className="w-full aspect-[3/4] object-cover object-top rounded-2xl bg-gray-200 border border-gray-100"
                    />
                  </Link>
                </div>

                {/* Informasi Dokter */}
                <div className="flex-1 py-1 flex flex-col justify-between min-w-0">
                  <div>
                    <span className="bg-[#175e97] text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-lg inline-block mb-3 shadow-sm">
                      {doctor.spesialis}
                    </span>

                    <Link to={`/doctor/${doctor.id}`}>
                      <h2 className="text-xl md:text-2xl font-bold text-[#175e97] leading-tight mb-2 hover:text-green-600 transition-colors line-clamp-2">
                        {doctor.nama}
                      </h2>
                    </Link>

                    {/* Deskripsi Singkat */}
                    <p className="text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed">
                      {doctor.deskripsi || "Deskripsi belum tersedia"}
                    </p>
                  </div>

                  {/* Tombol Terpisah: Lihat Profil & Dropdown Jadwal */}
                  <div className="mt-4 flex flex-col gap-3">
                    <Link
                      to={`/doctor/${doctor.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#175e97] hover:text-green-600 transition-colors w-max"
                    >
                      Lihat Profil Selengkapnya <ArrowRight size={16} />
                    </Link>

                    <button
                      // PERBAIKAN: openDropdown diubah menjadi openJadwal
                      onClick={() =>
                        setOpenJadwal(openJadwal === index ? null : index)
                      }
                      className="flex items-center justify-between w-full md:w-[85%] px-4 py-2.5 bg-gray-50 hover:bg-green-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:text-green-700 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-green-600" />
                        Lihat Jadwal Praktek
                      </span>
                      {openJadwal === index ? (
                        <ChevronUp size={16} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* EXPANDED JADWAL */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openJadwal === index
                    ? "max-h-[500px] opacity-100 mt-5 pt-5 border-t border-gray-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(doctor.jadwal).map(([hari, jam]) => (
                    <div
                      key={hari}
                      className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center gap-3"
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
            </div>
          ))}
        </div>

        {/* Tombol Load More */}
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
