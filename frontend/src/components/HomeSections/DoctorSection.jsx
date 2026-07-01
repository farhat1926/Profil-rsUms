import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  UsersRound,
  Stethoscope,
  ShieldCheck,
} from "lucide-react";

const DoctorSection = () => {
  const navigate = useNavigate();
  const [dokterList, setDokterList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpesialis, setSelectedSpesialis] = useState("Semua");
  const [currentDoctorSlide, setCurrentDoctorSlide] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/jadwal`)
      .then((res) => res.json())
      .then((data) => {
        const groupedDokter = data.reduce((acc, item) => {
          const existing = acc.find((d) => d.id === item.id);

          if (existing) {
            existing.jadwal[item.hari] = item.jam;
          } else {
            acc.push({
              id: item.id,
              nama: item.nama_dokter,
              spesialis: item.spesialis,
              img: `${API_URL}${item.image}`,
              pengalaman: "Dokter Spesialis",
              jadwal: {
                [item.hari]: item.jam,
              },
            });
          }
          return acc;
        }, []);

        setDokterList(groupedDokter);
      })
      .catch((err) => {
        console.error("Gagal mengambil dokter:", err);
      });
  }, []);

  const uniqueSpesialisHome = [
    "Semua",
    ...new Set(dokterList.map((d) => d.spesialis || "Lainnya")),
  ].sort();

  const handleSearchDoctor = (e) => {
    e.preventDefault();
    navigate("/meet-doctor", {
      state: {
        searchQuery: searchQuery,
        selectedSpesialis: selectedSpesialis,
      },
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCardsPerView(3);
      else if (window.innerWidth >= 768) setCardsPerView(2);
      else setCardsPerView(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxSlide = Math.max(0, dokterList.length - cardsPerView);

  useEffect(() => {
    if (dokterList.length > 0) {
      const doctorInterval = setInterval(() => {
        setCurrentDoctorSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
      }, 3500);
      return () => clearInterval(doctorInterval);
    }
  }, [dokterList, maxSlide]);

  const trackWidth =
    dokterList.length > 0 ? dokterList.length * (100 / cardsPerView) : 100;
  const slidePercentage =
    dokterList.length > 0 ? (currentDoctorSlide / dokterList.length) * 100 : 0;

  return (
    <section
      id="dokter"
      className="w-full bg-gradient-to-b from-green-50/80 to-white py-20 overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-full h-[500px] bg-green-50/50 -skew-y-3 origin-top-left -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Cari Dokter Spesialis
          </h2>
          <p className="text-gray-600 md:text-lg max-w-3xl mx-auto">
            Temukan jadwal praktek dan profil lengkap dari puluhan dokter ahli
            kami yang siap memberikan pelayanan kesehatan terbaik untuk Anda.
          </p>
        </div>

        <form
          onSubmit={handleSearchDoctor}
          className="max-w-5xl mx-auto bg-white p-5 md:p-6 rounded-[2rem] shadow-[0_15px_60px_-15px_rgba(34,197,94,0.2)] border border-green-100 mb-10 relative overflow-hidden ring-4 ring-white/50 backdrop-blur-sm"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-[#175e97] to-green-500"></div>

          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <div className="relative group flex-1">
              <Search
                className="absolute left-6 top-1/2 -translate-y-1/2 text-green-600/70"
                size={24}
              />
              <input
                type="text"
                placeholder="Ketik nama dokter atau keahlian..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-5 py-5 bg-green-50/30 border border-gray-100 rounded-[1.25rem] text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-base font-medium placeholder-gray-400"
              />
            </div>

            <div className="relative shrink-0 w-full md:w-[320px]">
              <Filter
                className="absolute left-6 top-1/2 -translate-y-1/2 text-green-600/70 pointer-events-none"
                size={22}
              />
              <select
                value={selectedSpesialis}
                onChange={(e) => setSelectedSpesialis(e.target.value)}
                className="w-full appearance-none pl-14 pr-12 py-5 bg-green-50/30 border border-gray-100 rounded-[1.25rem] text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-base font-medium cursor-pointer"
              >
                {uniqueSpesialisHome.map((spesialis) => (
                  <option key={spesialis} value={spesialis}>
                    {spesialis === "Semua" ? "Semua Spesialis" : spesialis}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-6 top-1/2 -translate-y-1/2 text-green-600/70 pointer-events-none"
                size={22}
              />
            </div>

            <button
              type="submit"
              className="bg-[#175e97] hover:bg-blue-900 text-white font-extrabold py-5 px-10 rounded-[1.25rem] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-base whitespace-nowrap"
            >
              Cari Jadwal
            </button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-3 md:gap-5 mb-14 px-2">
          <div className="bg-white/90 backdrop-blur-md border border-green-100 shadow-sm px-5 py-3 rounded-full flex items-center gap-3 transform transition hover:scale-105 cursor-default">
            <div className="bg-green-100 p-2 rounded-full text-green-600">
              <UsersRound size={18} />
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Lebih dari{" "}
              <span className="font-extrabold text-[#175e97]">
                {dokterList.length}
              </span>{" "}
              Dokter
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-md border border-green-100 shadow-sm px-5 py-3 rounded-full flex items-center gap-3 transform transition hover:scale-105 cursor-default">
            <div className="bg-blue-100 p-2 rounded-full text-[#175e97]">
              <Stethoscope size={18} />
            </div>
            <p className="text-sm text-gray-600 font-medium">
              <span className="font-extrabold text-[#175e97]">
                {uniqueSpesialisHome.length > 1
                  ? uniqueSpesialisHome.length - 1
                  : 0}
              </span>{" "}
              Spesialisasi
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-md border border-green-100 shadow-sm px-5 py-3 rounded-full hidden sm:flex items-center gap-3 transform transition hover:scale-105 cursor-default">
            <div className="bg-orange-100 p-2 rounded-full text-orange-500">
              <ShieldCheck size={18} />
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Pelayanan{" "}
              <span className="font-extrabold text-orange-500">Terpercaya</span>
            </p>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto overflow-hidden px-2 pb-6">
          {dokterList.length > 0 ? (
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                width: `${trackWidth}%`,
                transform: `translateX(-${slidePercentage}%)`,
              }}
            >
              {dokterList.map((dokter) => (
                <div
                  key={dokter.id}
                  className="px-3 shrink-0"
                  style={{ width: `${100 / dokterList.length}%` }}
                >
                  <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col justify-center p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-green-100 h-full">
                    <div className="flex gap-4 items-center">
                      <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-30 scale-110"></div>
                        <img
                          src={dokter.img}
                          alt={dokter.nama}
                          loading="lazy"
                          className="relative w-24 h-24 lg:w-28 lg:h-28 object-cover object-top rounded-full border-4 border-white shadow-md z-10"
                          onError={(e) => {
                            e.target.src = "/default-doctor.jpg";
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0 pr-1">
                        <span className="text-[10px] font-bold text-[#175e97] bg-blue-50 border border-blue-100 px-2 py-1 rounded-md uppercase tracking-wider mb-2 inline-block">
                          {dokter.spesialis}
                        </span>
                        <h3 className="text-base lg:text-lg font-extrabold text-gray-800 leading-snug line-clamp-2">
                          {dokter.nama}
                        </h3>
                        <Link
                          to={`/doctor/${dokter.id}`}
                          className="inline-flex items-center gap-1 text-[11px] lg:text-xs text-green-600 hover:text-green-700 mt-2 font-bold transition-colors group uppercase tracking-wide"
                        >
                          <span className="group-hover:underline">
                            Lihat Profil
                          </span>
                          <ArrowRight
                            size={14}
                            className="group-hover:translate-x-0.5 transition-transform"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center w-full text-sm text-gray-500">
              Memuat data dokter...
            </p>
          )}

          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: maxSlide + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentDoctorSlide(idx)}
                className={`h-2 rounded-full transition-all duration-500 ease-out cursor-pointer ${
                  currentDoctorSlide === idx
                    ? "w-8 bg-green-500"
                    : "w-2 bg-gray-200 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorSection;
