import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

const heroImages = ["/slider.webp", "/Slider2.webp"];

const mitraList = [
  "/images/bjs.webp",
  "/images/jasaraharja.webp",
  "/images/isomedik.webp",
  "/images/reliance.webp",
];

const Home = () => {
  const [currentHero, setCurrentHero] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dokterList, setDokterList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const [reelsList, setReelsList] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "";
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    fetch(`${API_URL}/event`)
      .then((res) => res.json())
      .then((data) => setEventList(data))
      .catch((err) => console.error("Gagal mengambil event:", err));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/informasi`)
      .then((res) => res.json())
      .then((data) => {
        setArticleList(data.slice(0, 3));
      })
      .catch((err) => console.error("Gagal mengambil artikel:", err));
  }, []);

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

  // ================= PERUBAHAN: FETCH REELS DENGAN AUTO-UPDATE =================
  useEffect(() => {
    const fetchReels = () => {
      fetch(`${API_URL}/reels`)
        .then((res) => res.json())
        .then((data) => {
          // Tetap batasi hanya 3 data teratas
          setReelsList(data.slice(0, 3));
        })
        .catch((err) => console.error("Gagal mengambil data reels:", err));
    };

    // Panggil saat pertama kali web dibuka
    fetchReels();

    // Jalankan fungsi fetchReels secara otomatis setiap 30 detik (30000 milidetik)
    const intervalReels = setInterval(() => {
      fetchReels();
    }, 30000);

    // Hapus interval jika pengunjung pindah ke halaman lain (mencegah kebocoran memori)
    return () => clearInterval(intervalReels);
  }, []);
  // ==============================================================================

  const nextSlide = () => {
    setCurrentHero((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentHero((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentHero]);

  return (
    <div className="font-sans w-full overflow-hidden">
      {/* Hero Slider */}
      <section id="profil" className="w-full pt-6 pb-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="relative w-full h-[180px] sm:h-[280px] md:h-[380px] lg:h-[500px] rounded-3xl overflow-hidden group shadow-md">
            <div
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{
                width: `${heroImages.length * 100}%`,
                transform: `translateX(-${currentHero * (100 / heroImages.length)}%)`,
              }}
            >
              {heroImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`hero-${index}`}
                  className="w-full h-full object-contain"
                  style={{ width: `${100 / heroImages.length}%` }}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 cursor-pointer"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 cursor-pointer"
            >
              <ChevronRight size={28} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHero(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 shadow-sm cursor-pointer ${
                    currentHero === index
                      ? "bg-[#96d649] w-6"
                      : "bg-white/70 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ARTIKEL & BERITA ================= */}
      <section
        id="artikel-terbaru"
        className="w-full py-16 bg-gray-50 border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-green-600 mb-2">
              Artikel Terbaru RS UMS{" "}
            </h2>
            <p className="text-base text-gray-600 w-full">
              Dapatkan informasi kesehatan terkini, tips medis, dan berita
              terbaru seputar pelayanan RS UMS A.R. Fachrudin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {articleList.map((article) => (
              <Link
                to={`/informasi/${article.id}`}
                key={article.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full border border-gray-100 group"
              >
                <div className="w-full aspect-video bg-gray-100 overflow-hidden border-b border-gray-100">
                  <img
                    src={`${API_URL}${article.image}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={article.title}
                    loading="lazy"
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">
                    {article.category}
                  </p>
                  <h2 className="text-xl font-bold text-gray-800 leading-tight line-clamp-2">
                    {article.title}
                  </h2>

                  <p className="text-gray-600 mt-3 line-clamp-3 text-justify text-sm">
                    {article.summary}
                  </p>

                  <p className="text-xs text-gray-400 mt-auto pt-4 flex items-center gap-2 border-t border-gray-50">
                    <span className="font-medium text-gray-600">
                      {article.author}
                    </span>{" "}
                    • <span>{formatTanggal(article.date)}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              to="/informasi"
              className="text-sm font-bold bg-white text-green-600 hover:text-white hover:bg-green-500 border border-green-500 px-8 py-3 rounded-full transition-colors shadow-sm"
            >
              Lihat Semua Artikel →
            </Link>
          </div>
        </div>
      </section>

      {/* Fasilitas */}
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
              Fasilitas 24 jam yang menangani pasien dengan kondisi darurat
              medis. Dilengkapi ruang triase, ruang resusitasi, observasi,
              perawatan luka, serta peralatan penunjang emergensi.
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

      {/* ================= DOKTER SPESIALIS ================= */}
      <section id="dokter" className="w-full bg-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Dokter Spesialis
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar px-1">
            {dokterList.length > 0 ? (
              dokterList.slice(0, 5).map((dokter, index) => (
                <div
                  key={dokter.id}
                  className="min-w-[340px] sm:min-w-[380px] max-w-[400px] bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col snap-center"
                >
                  <div className="p-6 flex gap-5 items-start">
                    <img
                      src={dokter.img}
                      alt={dokter.nama}
                      loading="lazy"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-top border border-gray-200 shrink-0 shadow-sm"
                      onError={(e) => {
                        e.target.src = "/default-doctor.jpg";
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-base sm:text-lg font-bold text-gray-900 leading-snug line-clamp-2"
                        title={dokter.nama}
                      >
                        {dokter.nama}
                      </h3>

                      <p className="text-[11px] text-gray-400 mt-2.5 uppercase tracking-wider font-bold">
                        SPESIALIS
                      </p>
                      <p
                        className="text-sm font-bold text-green-700 mt-0.5 truncate"
                        title={dokter.spesialis}
                      >
                        {dokter.spesialis}
                      </p>

                      <Link
                        to={`/doctor/${dokter.id}`}
                        className="inline-flex items-center gap-1.5 text-xs text-green-700 hover:text-green-900 mt-4 font-semibold transition-colors group"
                      >
                        <span className="group-hover:underline">
                          Lihat Profil Selengkapnya
                        </span>
                        <Eye size={14} />
                      </Link>
                    </div>
                  </div>

                  <div className="mt-auto border-t border-gray-100">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === index ? null : index)
                      }
                      className="w-full px-6 py-4 flex justify-between items-center text-sm font-bold text-gray-800 hover:bg-green-50/50 transition-colors rounded-b-2xl"
                    >
                      <span className="flex items-center gap-2.5">
                        <CalendarDays size={18} className="text-green-700" />
                        Lihat Jadwal Praktek
                      </span>
                      {openDropdown === index ? (
                        <ChevronUp size={18} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={18} className="text-gray-500" />
                      )}
                    </button>

                    {openDropdown === index && dokter.jadwal && (
                      <div className="px-6 pb-6 pt-2">
                        <div className="bg-white rounded-xl p-0 border border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                          {Object.entries(dokter.jadwal).map(([hari, jam]) => (
                            <div
                              key={hari}
                              className="flex justify-between py-3 px-4 border-b border-gray-50 last:border-b-0 text-sm"
                            >
                              <span className="font-semibold text-gray-700">
                                {hari}
                              </span>
                              <span className="text-gray-600 font-medium">
                                {jam}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center w-full text-base text-gray-500">
                Belum ada data dokter
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ================= KEGIATAN & AGENDA ================= */}
      <section id="kegiatan" className="w-full py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-green-600 mb-2">
              Kegiatan Rumah Sakit
            </h2>
            <p className="text-base text-gray-600 w-full">
              Dokumentasi berbagai agenda, acara, dan program rutin yang
              diselenggarakan oleh RS UMS A.R. Fachrudin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {eventList.slice(0, 3).map((event, index) => (
              <Link
                to={`/event/${event.id || index}`}
                key={event.id || index}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full border border-gray-100 group"
              >
                <div className="w-full aspect-video bg-gray-100 overflow-hidden border-b border-gray-100">
                  <img
                    src={`${API_URL}${event.image}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={event.title}
                    loading="lazy"
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">
                    Kegiatan
                  </p>
                  <h2 className="text-xl font-bold text-gray-800 leading-tight line-clamp-2">
                    {event.title}
                  </h2>

                  <p className="text-gray-600 mt-3 line-clamp-3 text-justify text-sm">
                    {event.short_desc}
                  </p>

                  <p className="text-xs text-gray-400 mt-auto pt-4 flex items-center gap-2 border-t border-gray-50">
                    <span className="font-medium text-gray-600">
                      RS UMS A.R. Fachrudin
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RS UMS UPDATE (INSTAGRAM EMBED NATIVE) ================= */}
      <section
        id="rs-ums-update"
        className="w-full py-16 bg-gray-50 border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-green-600 flex items-center gap-2 mb-2">
                RS UMS Update
              </h2>
              <p className="text-base text-gray-600">
                Lebih dekat dengan Rumah Sakit UMS A.R. Fachrudin, saksikan juga
                reels berikut!
              </p>
            </div>
          </div>

          {/* Menampilkan 3 Reels dari State Database */}
          <div className="w-full flex flex-wrap justify-center gap-6">
            {reelsList.length > 0 ? (
              reelsList.map((reel, index) => (
                <iframe
                  key={reel.id || index}
                  src={reel.link}
                  width="320"
                  height="540"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency="true"
                  className="rounded-2xl shadow-md border border-gray-200 bg-white"
                  title={`Instagram Reel ${index + 1}`}
                ></iframe>
              ))
            ) : (
              <p className="text-gray-500 py-10">
                Belum ada tayangan Reels terbaru yang ditambahkan.
              </p>
            )}
          </div>
        </div>
        <a
          href="https://www.instagram.com/rsumsarfachrudin/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 block w-fit mx-auto text-sm bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-bold shadow-md"
        >
          Kunjungi Instagram
        </a>
      </section>

      {/* ================= MITRA & KERJASAMA (CAROUSEL) ================= */}
      <section
        id="mitra"
        className="w-full py-16 bg-white border-t border-gray-100 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10 text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-2">
            Mitra & Kerjasama
          </h2>
          <p className="text-base text-gray-600">
            Kami bekerja sama dengan berbagai instansi untuk memberikan
            pelayanan kesehatan terbaik.
          </p>
        </div>

        <div
          className="relative w-full max-w-7xl mx-auto flex items-center"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <style>
            {`
              @keyframes scroll-mitra {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-scroll-mitra {
                display: flex;
                width: max-content;
                animation: scroll-mitra 30s linear infinite;
              }
              .animate-scroll-mitra:hover {
                animation-play-state: paused;
              }
            `}
          </style>

          <div className="animate-scroll-mitra gap-12 md:gap-24 items-center">
            {[...mitraList, ...mitraList].map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt="Mitra RS"
                className="w-28 md:w-40 h-12 md:h-16 object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lokasi Rumah Sakit */}
      <section
        id="lokasi"
        className="w-full py-16 bg-gray-50 border-t border-gray-100 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* MAP */}
            <div className="w-full h-[380px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <iframe
                title="Lokasi RS"
                src="https://www.google.com/maps?q=RS%20UMS%20A.R.%20Facrudin&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>
            </div>

            {/* INFO */}
            <div className="pl-0 md:pl-6">
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                Lokasi Rumah Sakit
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                RS UMS A.R. Fachrudin berlokasi strategis di Surakarta dan mudah
                dijangkau oleh masyarakat.
              </p>
              <ul className="space-y-4 text-base text-gray-700 font-medium">
                <li className="flex items-center gap-3">
                  <span className="text-2xl">📍</span> Jl. Adi Sucipto No.167,
                  Surakarta
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">📞</span> 0851-2997-2996
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl">🕒</span> Buka 24 Jam
                </li>
              </ul>
              <a
                href="https://www.google.com/maps?q=RS%20UMS%20A.R.%20Facrudin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-8 bg-green-500 hover:bg-green-600 text-white text-base px-8 py-3 rounded-full shadow-md transition-colors font-semibold"
              >
                Lihat di Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
