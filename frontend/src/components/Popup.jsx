import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function PromoPopup() {
  const [show, setShow] = useState(false);

  const promos = [
    "/jantung.jpeg",
    "/MCU.jpeg",
    "/Persalinan.jpeg",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3">
  <div className="relative w-full max-w-[90%] sm:max-w-sm md:max-w-md lg:max-w-lg max-h-[85vh] bg-white rounded-2xl shadow-xl overflow-hidden">
    
    <button
      onClick={() => setShow(false)}
      className="absolute top-2 right-2 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow"
    >
      ✕
    </button>

    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      loop={true}
      className="w-full"
    >
      {promos.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt={`promo-${index}`}
            className="w-full max-h-[75vh] object-contain"
          />
        </SwiperSlide>
      ))}
    </Swiper>

    <div className="p-4 text-center">
      <a
        href="https://wa.me/6285129972996"
        target="_blank"
        rel="noreferrer"
        className="inline-block w-full sm:w-auto bg-green-500 text-white px-5 py-2 rounded-lg"
      >
        Daftar Sekarang
      </a>
    </div>
  </div>
</div>
  );
}