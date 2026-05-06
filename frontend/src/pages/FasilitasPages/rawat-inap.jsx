function RawatInap() {
  return(
  <section className="w-full py-20 overflow-hidden relative bg-gradient-to-br from-green-50 via-white to-emerald-100">
      
      {/* BACKGROUND EFFECT */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-lime-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          
          {/* KIRI */}
          <div>
            <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
              Ruang Rawat Inap RS UMS A.R. Fachrudin
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-gray-900">
              Pelayanan Ruang Rawat Inap
              <br />
              Modern & Profesional
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl">
              Ruang Rawat Inap RS UMS A.R. Fachrudin siap memberikan pelayanan
              rawat inap yang nyaman, aman, dan profesional selama 24 jam dengan
              dukungan tenaga medis berpengalaman, fasilitas steril, serta
              peralatan medis modern untuk menunjang kenyamanan pasien.
            </p>

            {/* LIST LAYANAN */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                "Pemeriksaan Rawat Inap 24 Jam",
                "Ruang Perawatan Nyaman",
                "Pemantauan Kondisi Pasien",
                "Pelayanan Makan dan Kebutuhan Pasien",
                "Tenaga Medis dan Perawat Siaga",
                "Peralatan Rawat Inap Modern",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-green-100 px-4 py-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>

                  <p className="text-gray-700 font-medium text-sm">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* KANAN */}
          <div className="relative flex justify-center">
            
            {/* GLOW */}
            <div className="absolute inset-0 bg-green-300/20 blur-3xl rounded-full scale-90"></div>

            {/* CARD IMAGE */}
            <div className="relative bg-white/70 backdrop-blur-md border border-white/50 shadow-2xl rounded-[2rem] p-5">
              <img
                src="/rawat_inap.webp"
                alt="Ruang Rawat Inap"
                className="relative z-10 w-full max-h-[520px] object-contain drop-shadow-2xl rounded-2xl"
              />

              {/* INFO BOX */}
              <div className="absolute bottom-8 left-8 bg-white rounded-2xl px-6 py-4 shadow-xl z-20 border border-gray-100">
                <p className="text-sm text-gray-500 font-medium">
                  Pelayanan Ruang Rawat Inap
                </p>

                <h3 className="text-2xl font-bold text-green-600">
                  Modern & Aman
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
)}

export default RawatInap;