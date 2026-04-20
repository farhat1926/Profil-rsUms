import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";

export default function DoctorDetail() {
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  setLoading(true);

  fetch(`${API_URL}/jadwal/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Dokter tidak ditemukan");
      }
      return res.json();
    })
    .then((data) => {
      setDoctor(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setDoctor(null);
      setLoading(false);
    });
}, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">
        Memuat Data Dokter...
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-red-500">
        Dokter tidak ditemukan.
      </div>
    );
  }
  const daysOfWeek = [
  "senin",
  "selasa",
  "rabu",
  "kamis",
  "jumat",
  "sabtu",
  "minggu",
];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* HERO HEADER BACKGROUND */}
      <section className="relative w-full h-[160px] md:h-[220px] bg-[#96d649]/70 flex flex-col justify-center items-center text-center px-4 overflow-hidden shadow-inner">
        <img
          src="/images/banner-web.png"
          alt="Banner Profil Dokter"
          className="absolute inset-0 w-full h-full object-cover z-10 mix-blend-multiply opacity-20"
        />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 md:mb-3 drop-shadow-md">
            Profil Dokter
          </h1>
        </div>
      </section>

      {/* KONTEN UTAMA */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-12 md:-mt-16 relative z-20">
        {/* Tombol Kembali */}
        <Link
          to="/meet-doctor"
          className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 font-medium bg-black/20 px-5 py-2.5 rounded-full backdrop-blur-sm transition-colors shadow-sm"
        >
          <ArrowLeft size={18} /> Kembali ke Daftar Dokter
        </Link>

        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
          {/* FOTO DOKTER (Menembus Header) */}
          <div className="w-56 h-72 md:w-[280px] md:h-[380px] shrink-0 bg-white p-2.5 rounded-2xl shadow-xl border border-gray-100 -mt-12 md:-mt-20">
            <img
  src={`${API_URL}${doctor.image}`}
  alt={doctor.nama}
  className="w-full h-full object-cover object-top rounded-xl bg-gray-100"
  onError={(e) => {
    e.target.src = "/images/logo square.png";
  }}
/>
          </div>

          {/* INFORMASI DOKTER */}
          <div className="flex-1 pt-2 md:pt-10">
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 leading-tight">
              {doctor.nama}
            </h2>

            <div className="flex flex-wrap items-center gap-4 mt-5">
              <span className="bg-[#175e97] text-white text-sm font-bold px-4 py-1.5 rounded-md shadow-sm">
                {doctor.spesialis}
              </span>
              <div className="flex items-center gap-1.5 text-gray-500 text-sm font-semibold uppercase tracking-wide">
                <MapPin size={16} className="text-[#175e97]" />
                RS UMS A.R. Fachrudin
              </div>
            </div>

            {/* Deskripsi */}
            <div className="mt-8 text-gray-600 text-[15px] leading-relaxed space-y-4 text-justify">
  <p>{doctor.deskripsi || "Deskripsi belum tersedia"}</p>
</div>
          </div>
        </div>

        {/* TABEL JADWAL MENDATAR */}
        <div className="mt-16">
          <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-center border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#0f2a4a] text-white">
                  {daysOfWeek.map((day) => (
                    <th key={day} className="py-4 px-2 text-sm font-bold">
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  {daysOfWeek.map((day) => (
                    <td key={day} className="py-6 px-2 text-sm font-semibold">
                      {doctor?.jadwal?.[day] || "-"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 italic mt-4">
            *Jadwal dapat berubah sewaktu-waktu. Info lebih lanjut silahkan
            hubungi bagian Pendaftaran.
          </p>
        </div>
      </div>
    </div>
  );
}
