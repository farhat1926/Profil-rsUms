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


// const jadwalDokterList = [
//   {
//     nama: "Dr. Carmen",
//     spesialis: "Spesialis THT",
//     hari: "Senin - Jumat",
//     jam: "08:00 - 14:00",
//     status: "Tersedia",
//     img: "/dokter.png",
//     jadwal: {
//       Senin: "08:00 - 14:00",
//       Selasa: "08:00 - 14:00",
//       Rabu: "08:00 - 14:00",
//       Kamis: "08:00 - 14:00",
//       Jumat: "08:00 - 14:00",
//       Sabtu: "09:00 - 12:00",
//       Minggu: "Libur",
//     },
//   },
//   {
//     nama: "Dr. Nader",
//     spesialis: "Spesialis Anak",
//     hari: "Senin - Sabtu",
//     jam: "09:00 - 15:00",
//     status: "Tersedia",
//     img: "/dokter.png",
//     jadwal: {
//       Senin: "08:00 - 14:00",
//       Selasa: "08:00 - 14:00",
//       Rabu: "08:00 - 14:00",
//       Kamis: "08:00 - 14:00",
//       Jumat: "08:00 - 14:00",
//       Sabtu: "09:00 - 12:00",
//       Minggu: "Libur",
//     },
//   },
//   {
//     nama: "Dr. Maya",
//     spesialis: "Spesialis Jantung",
//     hari: "Selasa - Jumat",
//     jam: "10:00 - 16:00",
//     status: "Tersedia",
//     img: "/dokter.png",
//     jadwal: {
//       Senin: "08:00 - 14:00",
//       Selasa: "08:00 - 14:00",
//       Rabu: "08:00 - 14:00",
//       Kamis: "08:00 - 14:00",
//       Jumat: "08:00 - 14:00",
//       Sabtu: "09:00 - 12:00",
//       Minggu: "Libur",
//     },
//   },
//   {
//     nama: "Dr. Kevin",
//     spesialis: "Spesialis Penyakit Dalam",
//     hari: "Setiap Hari",
//     jam: "08:00 - 20:00",
//     status: "Tersedia",
//     img: "/dokter.png",
//     jadwal: {
//       Senin: "10:00 - 14:00",
//       Selasa: "08:00 - 14:00",
//       Rabu: "08:00 - 14:00",
//       Kamis: "08:00 - 14:00",
//       Jumat: "08:00 - 14:00",
//       Sabtu: "09:00 - 12:00",
//       Minggu: "Libur",
//     },
//   },
// ];
const Home = ()=> {
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
      {/* Hero + Profil Overlay */}
      <section
        id="profil"
        className="relative w-full h-[220px] sm:h-[350px] md:h-[500px] lg:h-[600px] overflow-hidden scroll-mt-20"
      >
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
              className="w-full h-full object-contain flex-shrink-0"
              style={{ width: `${100 / heroImages.length}%` }}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>
        <div className="absolute "></div>
      </section>

      {/* Fasilitas */}
      <section id="fasilitas" className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold text-green-500">Fasilitas</h1>
              <h2 className="text-xl font-semibold">RS UMS A.R. Fachrudin</h2>
            </div>
            <p className="max-w-xl text-gray-600">
              Fasilitas 24 jam yang menangani pasien dengan kondisi darurat
              medis. Dilengkapi ruang triase, ruang resusitasi, observasi,
              perawatan luka, serta peralatan penunjang emergensi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {fasilitas.map((item) => (
              <div
                key={item.title}
                className="relative rounded-xl overflow-hidden group"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/50 p-4 flex flex-col justify-end">
                  <h3 className="text-green-400 font-semibold">
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
    <h2 className="text-2xl font-bold text-center mb-8">
      Dokter Spesialis
    </h2>

    <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
      {dokterList.length > 0 ? (
        dokterList.map((dokter, index) => (
          <div
            key={dokter.id}
            className="min-w-[350px] bg-white rounded-2xl p-5 flex gap-4 shadow hover:shadow-lg transition"
          >
            <img
              src={dokter.img}
              alt={dokter.nama}
              loading="lazy"
              className="w-28 h-28 object-cover rounded-xl"
            />

            <div className="flex flex-col justify-between w-full">
              <div>
                <h3 className="font-bold">
                  {dokter.nama}
                </h3>

                <p className="text-sm text-gray-600">
                  {dokter.spesialis}
                </p>

                <ul className="text-xs text-gray-500 mt-2 space-y-1">
                  <li>🟢 {dokter.pengalaman}</li>
                </ul>

                <p
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === index ? null : index
                    )
                  }
                  className="mt-3 text-sm text-green-600 font-semibold cursor-pointer hover:underline"
                >
                  Jadwal Dokter{" "}
                  {openDropdown === index ? "▲" : "▼"}
                </p>

                {openDropdown === index &&
                  dokter.jadwal && (
                    <div className="mt-2 text-xs text-gray-600 bg-gray-50 rounded-lg p-3 border">
                      {Object.entries(
                        dokter.jadwal
                      ).map(([hari, jam]) => (
                        <div
                          key={hari}
                          className="flex justify-between py-1 border-b last:border-b-0"
                        >
                          <span>{hari}</span>
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
        <p className="text-center w-full text-gray-500">
          Belum ada data dokter
        </p>
      )}
    </div>
  </div>
</section>

      {/* Kegiatan & Event / Informasi */}
     <section
  id="informasi"
  className="w-full py-12 bg-gray-100 scroll-mt-20"
>
  <div className="max-w-7xl mx-auto px-4 md:px-8">
    <div className="mb-10">
      <h2 className="text-3xl font-bold text-green-600">
        Informasi Rumah Sakit
      </h2>
      <p className="text-gray-600 mt-2 max-w-2xl">
        Berbagai informasi terbaru mengenai kegiatan, event,
        serta artikel kesehatan dari rumah sakit.
      </p>
    </div>

    <div className="mb-12">
      <h3 className="text-xl font-semibold mb-4">
        Kegiatan & Event
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {eventList.map((event, index) => (
          <Link
            to={`/event/${event.id || index}`}
            key={event.id || index}
            className="relative rounded-xl overflow-hidden shadow group block"
          >
            <img
  src={`http://localhost:3001${event.image}`}
  alt={event.title}
  loading="lazy"
  className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
/>

            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
              <h3 className="text-white font-semibold">
                {event.title}
              </h3>
              <p className="text-gray-200 text-sm">
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
              <h2 className="text-3xl font-bold text-green-600 flex items-center gap-2">
                RS UMS Update
              </h2>
              <p className="text-gray-600 mt-2">
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
                className="w-full overflow-hidden flex justify-center bg-gray-50 rounded-xl p-2"
              >
               <InstagramEmbed>
  {item.embedCode}
</InstagramEmbed>
              </div>
            ))}
          </div>

          <a
            href="https://instagram.com/rs.ums"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden mt-6 block text-center text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-3 rounded-full font-semibold shadow"
          >
            Kunjungi Instagram
          </a>
        </div>
      </section>

      {/* Lokasi Rumah Sakit */}
      <section id="lokasi" className="w-full py-12 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* MAP */}
            <div className="w-full h-[350px] rounded-xl overflow-hidden shadow">
              <iframe
                title="Lokasi RS"
                src="https://www.google.com/maps?q=RS%20UMS%20A.R.%20Facrudin&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>
            </div>

            {/* INFO */}
            <div>
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                Lokasi Rumah Sakit
              </h2>
              <p className="text-gray-600 mb-4">
                RS UMS A.R. Facrudin berlokasi strategis di Surakarta dan mudah
                dijangkau oleh masyarakat.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>📍 Jl. Adi Sucipto No.167, Surakarta</li>
                <li>📞 0888 0888 0880</li>
                <li>🕒 Buka 24 Jam</li>
              </ul>
              <a
                href="https://www.google.com/maps?q=RS%20UMS%20A.R.%20Facrudin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-green-500 text-white px-5 py-2 rounded-full"
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
