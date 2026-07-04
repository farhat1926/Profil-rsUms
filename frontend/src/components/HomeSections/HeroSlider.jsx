import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroImages = [
  "images/banner_umroh.webp",
  "images/banner-jantung.webp",
  "images/banner-mcu.webp",
  "images/banner-fet.webp",
];

const HeroSlider = () => {
  const [currentHero, setCurrentHero] = useState(0);

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
                decoding={index === 0 ? "sync" : "async"}
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
  );
};

export default HeroSlider;
