
import React, { useEffect, useState } from "react";
const fasilitas = [
  {
    title: "IGD",
    desc: "Fasilitas pelayanan darurat 24 jam untuk menangani kondisi kritis dan kebutuhan medis mendesak.",
    img: "/igd.jpg",
  },
  {
    title: "Instalasi Rawat Inap",
    desc: "Ruang perawatan dengan berbagai kelas yang nyaman, higienis, dan dilengkapi fasilitas pendukung pasien.",
    img: "/igd.jpg",
  },
  {
    title: "Instalasi Bedah / Kamar Operasi",
    desc: "Ruang operasi modern dengan peralatan medis steril dan teknologi canggih untuk tindakan pembedahan.",
    img: "/igd.jpg",
  },
  {
    title: "Instalasi Radiologi & Diagnostik",
    desc: "Layanan pemeriksaan seperti X-ray dan USG untuk diagnosa yang akurat dan cepat.",
    img: "/igd.jpg",
  },
  {
    title: "Laboratorium Klinik",
    desc: "Fasilitas pemeriksaan darah, urin, dan berbagai tes medis untuk mendukung diagnosis dan pengobatan.",
    img: "/lab.jpeg",
  },
  {
    title: "Apotek Rumah Sakit",
    desc: "Pelayanan farmasi lengkap untuk memenuhi kebutuhan obat pasien sesuai resep dokter.",
    img: "/igd.jpg",
  },
];
const heroImages = [
    "/rumahsakit.jpg",
    "/rumahsakit2.jpg",
  
]
const dokterList = [
  {
    nama: "Dr. Carmen",
    spesialis: "Spesialis implan dan bedah gusi",
    pengalaman: "12 tahun pengalaman",
    organisasi: "Anggota Asosiasi Implantologi Indonesia",
    img: "/dokter.png",
  },
  {
    nama: "Dr. Nader",
    spesialis: "Spesialis implan dan bedah gusi",
    pengalaman: "10 tahun pengalaman",
    organisasi: "Anggota Asosiasi Implantologi Indonesia",
    img: "/dokter.png",
  },
  {
    nama: "Dr. Nader",
    spesialis: "Spesialis implan dan bedah gusi",
    pengalaman: "10 tahun pengalaman",
    organisasi: "Anggota Asosiasi Implantologi Indonesia",
    img: "/dokter.png",
  },
  {
    nama: "Dr. Nader",
    spesialis: "Spesialis implan dan bedah gusi",
    pengalaman: "10 tahun pengalaman",
    organisasi: "Anggota Asosiasi Implantologi Indonesia",
    img: "/dokter.png",
  },
];
const eventList = [
  {
    title: "Seminar Kesehatan Jantung",
    desc: "Edukasi kesehatan jantung untuk masyarakat umum.",
    img: "/avatar.png",
  },
  {
    title: "Seminar Kesehatan Jantung",
    desc: "Edukasi kesehatan jantung untuk masyarakat umum.",
    img: "/avatar.png",
  },
  
];

const jadwalDokterList = [
  {
    nama: "Dr. Carmen",
    spesialis: "Spesialis THT",
    hari: "Senin - Jumat",
    jam: "08:00 - 14:00",
    status: "Tersedia",
    img: "/dokter.png",
  },
  {
    nama: "Dr. Nader",
    spesialis: "Spesialis Anak",
    hari: "Senin - Sabtu",
    jam: "09:00 - 15:00",
    status: "Tersedia",
    img: "/dokter.png",
  },
  {
    nama: "Dr. Maya",
    spesialis: "Spesialis Jantung",
    hari: "Selasa - Jumat",
    jam: "10:00 - 16:00",
    status: "Tersedia",
    img: "/dokter.png",
  },
  {
    nama: "Dr. Kevin",
    spesialis: "Spesialis Penyakit Dalam",
    hari: "Setiap Hari",
    jam: "08:00 - 20:00",
    status: "Tersedia",
    img: "/dokter.png",
  },
];
const Home = ()=> {
  const [currentHero, setCurrentHero] = useState(0);
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
  className="relative w-full h-[600px] overflow-hidden scroll-mt-20"
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
        className="w-full h-full object-cover flex-shrink-0"
        style={{ width: `${100 / heroImages.length}%` }}
      />
    ))}
  </div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>
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

  <div  className="flex gap-6 overflow-x-auto">
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
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-bold">{dokter.nama}</h3>
            <p className="text-sm text-gray-600">
              {dokter.spesialis}
            </p>

            <ul className="text-xs text-gray-500 mt-2 space-y-1">
              <li>🟢 {dokter.pengalaman}</li>
              <li>🟢 {dokter.organisasi}</li>
            </ul>
          </div>

          {/* Tombol */}
          <div className="flex gap-2 mt-3">
            <button className="bg-green-500 text-white px-3 py-1 text-xs rounded-full">
              Lihat Jadwal Praktek
            </button>
            <button className="border border-green-500 text-green-500 px-3 py-1 text-xs rounded-full">
              Lihat Profil
            </button>
          </div>

          {/* Rating */}
          <div className="text-yellow-400 text-sm mt-2">
            ⭐⭐⭐⭐⭐
          </div>
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

  {/* ================= JADWAL DOKTER ================= */}
<div>
  <h3 className="text-xl font-semibold mb-4">
    Jadwal Dokter
  </h3>

  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
    {jadwalDokterList.map((dokter, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={dokter.img}
            alt={dokter.nama}
            className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
          />

          {/* Status badge */}
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
            {dokter.status}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg">
            {dokter.nama}
          </h3>

          <p className="text-sm text-gray-500 mb-3">
            {dokter.spesialis}
          </p>

          <div className="space-y-2 text-sm text-gray-600">
            <p>📅 {dokter.hari}</p>
            <p>🕒 {dokter.jam}</p>
          </div>

          <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition">
            Booking Jadwal
          </button>
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