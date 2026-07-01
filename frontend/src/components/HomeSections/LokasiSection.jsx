import React from "react";

const LokasiSection = () => {
  return (
    <section
      id="lokasi"
      className="w-full py-16 bg-gray-50 border-t border-gray-100 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="w-full h-[380px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              title="Lokasi RS"
              src="https://www.google.com/maps?q=RS%20UMS%20A.R.%20Facrudin&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>

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
  );
};

export default LokasiSection;
