import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function PromoPopup() {
  const [show, setShow] = useState(false);

  const promos = ["/jantung.webp", "/MCU.webp", "/Persalinan.webp"];

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenPromo");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShow(true);
        sessionStorage.setItem("hasSeenPromo", "true");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 animate-in fade-in duration-500">
      <div className="relative w-full max-w-[90%] sm:max-w-sm md:max-w-md lg:max-w-lg max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 ease-out">
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-transform hover:scale-110"
        >
          ✕
        </button>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="w-full"
        >
          {promos.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`promo-${index}`}
                className="w-full max-h-[75vh] object-contain bg-gray-100"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="p-5 text-center bg-white">
          <a
            href="https://wa.me/6285129972996"
            target="_blank"
            rel="noreferrer"
            onClick={() => setShow(false)} // Tutup popup jika tombol diklik
            className="inline-block w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-2.5 rounded-xl shadow-md transition-colors transform hover:scale-105"
          >
            Daftar Sekarang
          </a>
        </div>
      </div>
    </div>
  );
}
