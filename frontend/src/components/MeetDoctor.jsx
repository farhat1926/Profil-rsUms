import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
} from "lucide-react";

export default function MeetDoctor() {
  const location = useLocation(); // Hook untuk menangkap state dari halaman Home

  const [openJadwal, setOpenJadwal] = useState(null);
  const [doctorList, setDoctorList] = useState([]);

  // Mengatur nilai awal pencarian berdasarkan data yang dilempar dari Home (jika ada)
  const [search, setSearch] = useState(location.state?.searchQuery || "");
  const [selectedSpesialis, setSelectedSpesialis] = useState(
    location.state?.selectedSpesialis || "Semua",
  );

  const API_URL = import.meta.env.VITE_API_URL;

  // 1. Mengambil daftar spesialis unik dari data dokter untuk Filter Dropdown
  const uniqueSpesialis = [
    "Semua",
    ...new Set(doctorList.map((d) => d.spesialis || "Lainnya")),
  ].sort();

  // 2. Filter dokter berdasarkan teks pencarian DAN dropdown spesialis
  const filteredDoctors = doctorList.filter((doctor) => {
    const matchesSearch =
      doctor.nama.toLowerCase().includes(search.toLowerCase()) ||
      doctor.spesialis.toLowerCase().includes(search.toLowerCase());

    const matchesSpesialis =
      selectedSpesialis === "Semua" || doctor.spesialis === selectedSpesialis;

    return matchesSearch && matchesSpesialis;
  });

  // 3. Kelompokkan dokter yang sudah difilter berdasarkan Spesialis
  const groupedDoctors = filteredDoctors.reduce((acc, doctor) => {
    const spesialis = doctor.spesialis || "Lainnya";
    if (!acc[spesialis]) {
      acc[spesialis] = [];
    }
    acc[spesialis].push(doctor);
    return acc;
  }, {});

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
              deskripsi: item.deskripsi,
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
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* ================= HERO HEADER SECTION ================= */}
      <section className="relative w-full h-[160px] md:h-[220px] bg-[#5aa1db]/90 flex flex-col justify-center items-center text-center px-4 overflow-hidden shadow-inner">
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

      {/* ================= PENCARIAN & FILTER DROPDOWN ================= */}
      <section className="max-w-[1000px] mx-auto px-4 md:px-6 relative -mt-8 z-20 mb-16">
        <div className="bg-white p-4 md:p-6 rounded-3xl shadow-lg shadow-blue-900/5 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Bar Pencarian */}
            <div className="relative group flex-1">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#175e97] transition-colors"
                size={22}
              />
              <input
                type="text"
                placeholder="Cari nama dokter atau spesialisasi (Cth: Gigi, Anak)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-gray-50 border-0 ring-1 ring-gray-200 rounded-2xl text-gray-800 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#175e97] focus:bg-white transition-all text-sm md:text-base"
              />
            </div>

            {/* Dropdown Filter Spesialis */}
            <div className="relative shrink-0 w-full md:w-[300px]">
              <Filter
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={20}
              />

              <select
                value={selectedSpesialis}
                onChange={(e) => setSelectedSpesialis(e.target.value)}
                className="w-full appearance-none pl-12 pr-12 py-4 bg-gray-50 border-0 ring-1 ring-gray-200 rounded-2xl text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#175e97] focus:bg-white transition-all text-sm md:text-base cursor-pointer"
              >
                {uniqueSpesialis.map((spesialis) => (
                  <option key={spesialis} value={spesialis}>
                    {spesialis === "Semua" ? "Semua Spesialisasi" : spesialis}
                  </option>
                ))}
              </select>

              <ChevronDown
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT: GRID DOKTER KELOMPOK ================= */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-6">
        {Object.keys(groupedDoctors).length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-[#175e97] opacity-50" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Dokter Tidak Ditemukan
            </h3>
            <p className="text-gray-500 text-sm">
              Cobalah untuk menggunakan kata kunci pencarian lain atau pilih
              spesialisasi yang berbeda.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedSpesialis("Semua");
              }}
              className="mt-6 text-[#175e97] font-semibold hover:underline"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          Object.entries(groupedDoctors).map(([spesialis, doctors]) => (
            <div
              key={spesialis}
              className="mb-14 animate-in fade-in duration-500"
            >
              {/* Judul Kategori Spesialis */}
              <div className="flex items-center gap-3 mb-6 pl-2">
                <div className="w-1.5 h-8 bg-green-500 rounded-full shadow-sm shadow-green-500/20"></div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#175e97] tracking-tight">
                  {spesialis}
                </h3>
                <span className="bg-blue-50 text-[#175e97] text-xs font-bold px-3 py-1 rounded-full ml-2">
                  {doctors.length} Dokter
                </span>
              </div>

              {/* Grid Kartu Dokter */}
              <div className="grid md:grid-cols-2 gap-6">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col group"
                  >
                    {/* LAYOUT KARTU UTAMA */}
                    <div className="flex gap-5 md:gap-6">
                      {/* Foto Dokter */}
                      <div className="w-[120px] md:w-[150px] shrink-0">
                        <Link to={`/doctor/${doctor.id}`}>
                          <div className="relative overflow-hidden rounded-2xl bg-gray-100 border border-gray-100 aspect-[3/4]">
                            <img
                              src={`${API_URL}${doctor.image}`}
                              alt={doctor.nama}
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                              onError={(e) => {
                                e.target.src = "/default-doctor.jpg";
                              }}
                            />
                          </div>
                        </Link>
                      </div>

                      {/* Informasi Dokter */}
                      <div className="flex-1 py-1 flex flex-col justify-between min-w-0">
                        <div>
                          <span className="bg-[#175e97] text-white text-xs font-semibold px-3 py-1 rounded-lg inline-block mb-3 shadow-sm shadow-blue-900/10 tracking-wide uppercase">
                            {doctor.spesialis}
                          </span>

                          <Link to={`/doctor/${doctor.id}`}>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                              {doctor.nama}
                            </h2>
                          </Link>

                          {/* Deskripsi Singkat */}
                          <p className="text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed">
                            {doctor.deskripsi ||
                              "Informasi deskripsi profil dan kompetensi dokter belum tersedia."}
                          </p>
                        </div>

                        {/* Tombol Terpisah: Lihat Profil & Dropdown Jadwal */}
                        <div className="mt-4 flex flex-col gap-3">
                          <Link
                            to={`/doctor/${doctor.id}`}
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#175e97] hover:text-green-600 transition-colors w-max"
                          >
                            Lihat Profil Lengkap <ArrowRight size={16} />
                          </Link>

                          <button
                            onClick={() =>
                              setOpenJadwal(
                                openJadwal === doctor.id ? null : doctor.id,
                              )
                            }
                            className={`flex items-center justify-between w-full md:w-[85%] px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
                              openJadwal === doctor.id
                                ? "bg-green-50 border-green-200 text-green-700"
                                : "bg-gray-50 hover:bg-green-50 border-gray-200 text-gray-700 hover:text-green-700 hover:border-green-200"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <CalendarDays
                                size={16}
                                className={
                                  openJadwal === doctor.id
                                    ? "text-green-600"
                                    : "text-gray-400"
                                }
                              />
                              Lihat Jadwal Praktek
                            </span>
                            {openJadwal === doctor.id ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown
                                size={16}
                                className="text-gray-400"
                              />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* EXPANDED JADWAL */}
                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        openJadwal === doctor.id
                          ? "max-h-[500px] opacity-100 mt-5 pt-5 border-t border-gray-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(doctor.jadwal).map(([hari, jam]) => (
                          <div
                            key={hari}
                            className="bg-white border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] rounded-xl p-3.5 flex items-center gap-3 hover:border-green-200 transition-colors"
                          >
                            <div className="bg-green-50 p-2.5 rounded-lg text-green-600 shrink-0">
                              <Clock size={16} strokeWidth={2.5} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                                {hari}
                              </p>
                              <p className="text-sm font-bold text-[#175e97]">
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
            </div>
          ))
        )}
      </section>
    </div>
  );
}
