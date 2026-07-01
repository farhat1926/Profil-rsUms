import React from "react";

const mitraList = [
  "/images/bjs.webp",
  "/images/jasaraharja.webp",
  "/images/isomedik.webp",
  "/images/reliance.webp",
  "/images/mag.webp",
];

const MitraSection = () => {
  return (
    <section
      id="mitra"
      className="w-full py-16 bg-white border-t border-gray-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-2">
          Mitra & Kerjasama
        </h2>
        <p className="text-base text-gray-600">
          Kami bekerja sama dengan berbagai instansi untuk memberikan pelayanan
          kesehatan terbaik.
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
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-50%, 0, 0); }
            }
            .animate-scroll-mitra {
              display: flex;
              width: max-content;
              animation: scroll-mitra 30s linear infinite;
              will-change: transform;
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
              loading="lazy"
              decoding="async"
              className="w-28 md:w-40 h-12 md:h-16 object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MitraSection;
