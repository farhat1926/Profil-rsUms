
import React, { useEffect, useState } from "react";
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
const heroImages = [
    "/slider.png",
    "/Slider2.png",
  
]
const dokterList = [
  {
    nama: "Dr. dr. Flora Ramona Sigit Prakoeswa, M.Kes, Sp.DVE, Dipl. STD-HIV/AIDS, FINSDV, FAADV",
    spesialis: "Spesialis Dermatologi, Venereologi, dan Estetika (Sp.DVE)",
    pengalaman: "12 tahun pengalaman",
    img: "/Dr flora ramona.jpg",
    jadwal: {
      Senin: "08:00 - 14:00",
      Selasa: "08:00 - 14:00",
    }
  },
  {
    nama: "dr. Abdurahman Ama, Sp.KJ., M.Kes",
    spesialis: "Spesialis Kedokteran Jiwa",
    pengalaman: "10 tahun pengalaman",
    img: "/dr. Abdurahman Ama, Sp.KJ., M.Kes..JPG",
    jadwal: {
      Senin: "08:00 - 14:00",
      Selasa: "08:00 - 14:00",
    }
  },
  {
    nama: "dr. Restu Triwulandani Tolibin, SpA",
    spesialis: "Spesialis Anak",
    pengalaman: "10 tahun pengalaman",
    img: "/dr. Restu Triwulandani Tolibin, SpA.jpg",
    jadwal: {
      Senin: "08:00 - 14:00",
      Selasa: "08:00 - 14:00",
    }
  },
  {
    nama: "Dr. dr. Siswarni Sp KFR (K)",
    spesialis: "Spesialis Kedokteran Fisik dan Rehabilitasi",
    pengalaman: "10 tahun pengalaman",
    img: "/Dr. dr. Siswarni Sp KFR (K).JPG",
    jadwal: { 
      Senin: "08:00 - 14:00",
      Selasa: "08:00 - 14:00",
    }
  },
];
const eventList = [
  {
    title: "Seminar Kesehatan Jantung",
    desc: "Edukasi kesehatan jantung untuk masyarakat umum.",
    img: "/Arisan.jpeg",
  },
  {
    title: "Seminar Kesehatan Jantung",
    desc: "Edukasi kesehatan jantung untuk masyarakat umum.",
    img: "/Stunting.jpeg",
  },
  
];

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
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) =>
      prev === heroImages.length -1 ? 0 : prev + 1)
    }, 3000)
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="font-sans">
      

      {/* Hero */}
      {/* Hero + Profil Overlay */}
<section
  id="profil"
  className="relative w-full h-[220px] sm:h-[350px] md:h-[500px] lg:h-[600px] overflow-hidden scroll-mt-20"
>
  {/* Slider Track */}
  <div
    className="flex h-full transition-transform duration-1000 ease-in-out"
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
      />
    ))}
  </div>

  {/* Overlay */}
  <div className="absolute  bg-black/30"></div>
</section>
      

      {/* Fasilitas */}
      <section id="fasilitas" className="px-8 py-20 bg-white ">
        <div  className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-green-500">Fasilitas</h1>
            <h2 className="text-xl font-semibold">
              RS UMS A.R. Facrudin
            </h2>
          </div>

          <p className="max-w-xl text-gray-600">
            Fasilitas 24 jam yang menangani pasien dengan kondisi darurat medis.
            Dilengkapi ruang triase, ruang resusitasi, observasi, perawatan luka,
            serta peralatan penunjang emergensi.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {fasilitas.map((item, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden group"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 p-4 flex flex-col justify-end">
                <h3 className="text-green-400 font-semibold">
                  ✳ {item.title}
                </h3>
                <p className="text-white text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    {/* Dokter Spesialis */}
<section id="dokter" className="bg-green-50 px-8 py-20">
  <h2 className="text-2xl font-bold text-center mb-8">
    Dokter Spesialis
  </h2>

  <div className="flex gap-6 overflow-x-auto">
    {dokterList.map((dokter, index) => (
      <div
        key={index}
        className="min-w-[350px] bg-white rounded-2xl p-5 flex gap-4 shadow hover:shadow-lg transition"
      >
        {/* Foto */}
        <img
          src={dokter.img}
          alt={dokter.nama}
          className="w-28 h-28 object-cover rounded-xl"
        />

        {/* Info */}
        <div className="flex flex-col justify-between w-full">
          <div>
            <h3 className="font-bold">{dokter.nama}</h3>
            <p className="text-sm text-gray-600">
              {dokter.spesialis}
            </p>

           <ul className="text-xs text-gray-500 mt-2 space-y-1">
  <li>🟢 {dokter.pengalaman}</li>
</ul>

<p
  onClick={() =>
    setOpenDropdown(openDropdown === index ? null : index)
  }
  className="mt-3 text-sm text-green-600 font-semibold cursor-pointer hover:underline"
>
  Jadwal Dokter {openDropdown === index ? "▲" : "▼"}
</p>

{openDropdown === index && dokter.jadwal && (
  <div className="mt-2 text-xs text-gray-600 bg-gray-50 rounded-lg p-3 border">
    {Object.entries(dokter.jadwal).map(([hari, jam]) => (
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
          {/* Tombol */}
        </div>
      </div>
    ))}
  </div>
</section>



     {/* Kegiatan & Event */}
{/* Informasi */}
<section id="informasi" className="px-8 py-12 bg-gray-100 scroll-mt-20">

  {/* HEADER */}
  <div className="mb-10">
    <h2 className="text-3xl font-bold text-green-600">
      Informasi Rumah Sakit
    </h2>
    <p className="text-gray-600 mt-2 max-w-2xl">
      Berbagai informasi terbaru mengenai kegiatan, event, serta artikel kesehatan dari rumah sakit.
    </p>
  </div>

  {/* ================= EVENT ================= */}
  <div className="mb-12">
    <h3 className="text-xl font-semibold mb-4">
      Kegiatan & Event
    </h3>

    <div className="grid md:grid-cols-2 gap-6">
      {eventList.map((event, index) => (
        <div
          key={index}
          className="relative rounded-xl overflow-hidden shadow group"
        >
          <img
            src={event.img}
            alt={event.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
            <h3 className="text-white font-semibold">
              {event.title}
            </h3>
            <p className="text-gray-200 text-sm">
              {event.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>

</section>

{/* Lokasi Rumah Sakit */}
<section id="lokasi" className="px-8 py-12 bg-white scroll-mt-20">
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
        RS UMS A.R. Facrudin berlokasi strategis di Surakarta dan mudah dijangkau oleh masyarakat.
      </p>

      <ul className="space-y-3 text-gray-700">
        <li>📍 Jl. Adi Sucipto No.167, Surakarta</li>
        <li>📞 0888 0888 0880</li>
        <li>🕒 Buka 24 Jam</li>
      </ul>

      {/* Button */}
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
</section>
{/* Footer */}

    </div>
  );
}


export default Home;