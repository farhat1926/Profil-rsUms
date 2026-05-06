function RuangOperasi() {
  return 
  <section className="w-full py-16 overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-12 items-center">

      {/* KIRI */}
      <div className="text-white">
        <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-5 backdrop-blur-sm">
          Ruang Operasi RS UMS A.R. Fachrudin
        </span>

        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Pelayanan Ruang Operasi
          <br />
          Cepat & Terpercaya
        </h2>

        <p className="text-lg text-green-100 leading-relaxed mb-8 max-w-2xl">
          Ruang Operasi RS UMS A.R. Fachrudin siap memberikan pelayanan operasi yang akurat dan cepat selama 24 jam dengan dukungan tenaga kesehatan profesional, fasilitas modern, serta penanganan cepat untuk berbagai kondisi kegawatdaruratan.
        </p>

        {/* LIST LAYANAN */}
        <div className="space-y-4 mb-10">
          {[
                 "Pemeriksaan Ruang Operasi 24 Jam",
                "Ruang Operasi Nyaman",
                "Pemantauan Kondisi Pasien",
                "Pelayanan Operasi dan Tindakan Bedah",
                "Tim Dokter Bedah dan Perawat Profesional",
                "Peralatan Ruang Operasi Modern",
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              <div className="w-3 h-3 rounded-full bg-yellow-300"></div>

              <p className="text-white font-medium">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        {/* <button className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold shadow-lg transition-all duration-300 cursor-pointer">
          Lihat Pelayanan Ruang Operasi
        </button> */}
      </div>

      {/* KANAN */}
      <div className="relative">
        {/* EFFECT */}
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

        {/* IMAGE */}
        <img
          src="/ruang-operasi.webp"
          alt="Ruang Operasi"
          className="relative z-10 w-full max-h-[500px] object-contain drop-shadow-2xl"
        />

        {/* INFO BOX */}
        <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-6 py-4 shadow-xl z-20">
          <p className="text-sm text-gray-500 font-medium">
            Pelayanan Ruang Operasi
          </p>

          <h3 className="text-2xl font-bold text-green-600">
            Profesional
          </h3>
        </div>
      </div>
    </div>
  </div>
</section>
}

export default RuangOperasi;