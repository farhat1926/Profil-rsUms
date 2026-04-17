import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const InstagramEmbed = React.memo(({ children }) => {
  useEffect(() => {
    const processInsta = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    if (!window.instgrm) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = processInsta;
      document.body.appendChild(script);
    } else {
      setTimeout(processInsta, 100);
    }
  }, []);

  return (
    <div className="instagram-embed-container flex justify-center w-full">
      {children}
    </div>
  );
});

const instagramEmbeds = [
  {
    id: 1,
    embedCode: (
      <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/DW2x9sXiRPL/"
        data-instgrm-version="14"
      />
    ),
  },
  {
    id: 2,
    embedCode: (
      <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/DXEH6PlCRPN/"
        data-instgrm-version="14"
      />
    ),
  },
  {
    id: 3,
    embedCode: (
      <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/DXHEs73iZnz/"
        data-instgrm-version="14"
      />
    ),
  },
];

const fasilitas = [
  {
    title: "IGD",
    desc: "Fasilitas pelayanan darurat 24 jam untuk menangani kondisi kritis dan kebutuhan medis mendesak.",
    img: "/igd.JPG",
  },
  {
    title: "Instalasi Rawat Inap",
    desc: "Ruang perawatan dengan berbagai kelas yang nyaman, higienis, dan dilengkapi fasilitas pendukung pasien.",
    img: "/rawat_Inap.JPG",
  },
  {
    title: "Instalasi Bedah / Kamar Operasi",
    desc: "Ruang operasi modern dengan peralatan medis steril dan teknologi canggih untuk tindakan pembedahan.",
    img: "/igd.jpg",
  },
  {
    title: "Instalasi Radiologi & Diagnostik",
    desc: "Layanan pemeriksaan seperti X-ray dan USG untuk diagnosa yang akurat dan cepat.",
    img: "/radiologi.JPG",
  },
  {
    title: "Laboratorium Klinik",
    desc: "Fasilitas pemeriksaan darah, urin, dan berbagai tes medis untuk mendukung diagnosis dan pengobatan.",
    img: "/lab.JPG",
  },
  {
    title: "Apotek Rumah Sakit",
    desc: "Pelayanan farmasi lengkap untuk memenuhi kebutuhan obat pasien sesuai resep dokter.",
    img: "/farmasi.JPG",
  },
];

const heroImages = ["/slider.png", "/Slider2.png"];

const Home = () => {
  const [currentHero, setCurrentHero] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dokterList, setDokterList] = useState([]);
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/event")
      .then((res) => res.json())
      .then((data) => setEventList(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/jadwal")
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
              img: `http://localhost:3001${item.image}`,
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans w-full overflow-hidden">
      {/* Hero + Profil Overlay (DIBUAT LEBIH KECIL DAN ROUNDED) */}
      <section id="profil" className="w-full bg-white pt-6 pb-10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Container Slider - Tinggi dikurangi dan ujung dilengkungkan (rounded-3xl) */}
          <div className="relative w-full h-[180px] sm:h-[280px] md:h-[380px] lg:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-gray-100">
            <div
              className="flex h-full transition-transform duration-1500 ease-in-out"
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
                  className="w-full h-full object-cover flex-shrink-0"
                  style={{ width: `${100 / heroImages.length}%` }}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))}
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10"></div>
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
              <div
                key={item.title}
                className="relative rounded-2xl overflow-hidden group shadow-md border border-gray-100"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dokter Spesialis */}
      <section id="dokter" className="w-full bg-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Dokter Spesialis
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
            {dokterList.length > 0 ? (
              dokterList.map((dokter, index) => (
                <div
                  key={dokter.id}
                  className="min-w-[360px] bg-white rounded-2xl p-6 flex gap-5 shadow-sm hover:shadow-lg transition-shadow border border-green-50"
                >
                  <img
                    src={dokter.img}
                    alt={dokter.nama}
                    loading="lazy"
                    className="w-28 h-28 object-cover rounded-xl"
                  />

                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {dokter.nama}
                      </h3>

                      <p className="text-sm text-gray-600 mt-1">
                        {dokter.spesialis}
                      </p>

                      <ul className="text-xs text-gray-500 mt-3 space-y-1 bg-green-50/50 inline-block px-3 py-1 rounded-full border border-green-100">
                        <li>🟢 {dokter.pengalaman}</li>
                      </ul>

                      <p
                        onClick={() =>
                          setOpenDropdown(openDropdown === index ? null : index)
                        }
                        className="mt-4 text-sm text-green-600 font-semibold cursor-pointer hover:text-green-700 transition-colors"
                      >
                        Jadwal Dokter {openDropdown === index ? "▲" : "▼"}
                      </p>

                      {openDropdown === index && dokter.jadwal && (
                        <div className="mt-3 text-xs text-gray-700 bg-gray-50 rounded-xl p-4 border border-gray-100 animate-in fade-in duration-200">
                          {Object.entries(dokter.jadwal).map(([hari, jam]) => (
                            <div
                              key={hari}
                              className="flex justify-between py-1.5 border-b border-gray-200 last:border-b-0"
                            >
                              <span className="font-medium">{hari}</span>
                              <span>{jam}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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

      {/* Kegiatan & Event / Informasi */}
      <section id="informasi" className="w-full py-16 bg-gray-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-green-600 mb-2">
              Informasi Rumah Sakit
            </h2>
            <p className="text-base text-gray-600 max-w-3xl">
              Berbagai informasi terbaru mengenai kegiatan, event, serta artikel
              kesehatan dari rumah sakit.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Kegiatan & Event
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {eventList.map((event, index) => (
                <Link
                  to={`/event/${event.id || index}`}
                  key={event.id || index}
                  className="relative rounded-2xl overflow-hidden shadow-md group block border border-gray-200"
                >
                  <img
                    src={`http://localhost:3001${event.image}`}
                    alt={event.title}
                    loading="lazy"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-200 text-sm line-clamp-2">
                      {event.short_desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= RS UMS UPDATE ================= */}
      <section id="rs-ums-update" className="w-full py-16 bg-white">
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

          {/* Grid Embed Instagram */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {instagramEmbeds.map((item) => (
              <div
                key={item.id}
                className="w-full overflow-hidden flex justify-center bg-gray-50 rounded-2xl p-2 border border-gray-100 shadow-sm"
              >
                <InstagramEmbed>{item.embedCode}</InstagramEmbed>
              </div>
            ))}
          </div>

          <a
            href="https://instagram.com/rs.ums"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden mt-8 block text-center text-sm bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-bold shadow-md"
          >
            Kunjungi Instagram
          </a>
        </div>
      </section>

      {/* Lokasi Rumah Sakit */}
      <section id="lokasi" className="w-full py-16 bg-gray-50 scroll-mt-20">
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
                  <span className="text-2xl">📞</span> 0888 0888 0880
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
