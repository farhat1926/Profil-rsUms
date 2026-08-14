import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function PromoPopup() {
  const [show, setShow] = useState(false);
  const [popupImages, setPopupImages] = useState([]);

  useEffect(() => {
    const today = new Date().getDay(); // 0 (Minggu) sampai 6 (Sabtu)

    const gambarIjinDokter = "images/ijin.webp";
    const jadwalHarian = {
      1: "images/senin.webp",
      2: "images/selasa.webp",
      3: "images/rabu.webp",
      4: "images/kamis.webp",
      5: "images/jumat.webp",
      6: "images/sabtu.webp",
    };

    let imagesToShow = [];

    if (today === 0) {
      imagesToShow = [gambarIjinDokter];
    } else {
      imagesToShow = [jadwalHarian[today], gambarIjinDokter];
    }

    setPopupImages(imagesToShow);

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
    <div
      onClick={() => setShow(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 animate-in fade-in duration-500"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[85%] sm:max-w-[360px] md:max-w-[400px] bg-white rounded-[1.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 ease-out flex flex-col group"
      >
        {" "}
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 z-20 bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all hover:scale-110"
        >
          ✕
        </button>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={
            popupImages.length > 1
              ? { delay: 5000, disableOnInteraction: false }
              : false
          }
          pagination={popupImages.length > 1 ? { clickable: true } : false}
          navigation={popupImages.length > 1}
          loop={popupImages.length > 1}
          className="w-full flex-grow [--swiper-navigation-color:#ffffff] [--swiper-navigation-size:1.5rem] [--swiper-pagination-color:#22c55e] [&_.swiper-button-next]:opacity-0 [&_.swiper-button-next]:transition-opacity [&_.swiper-button-next]:duration-300 group-hover:[&_.swiper-button-next]:opacity-100 [&_.swiper-button-prev]:opacity-0 [&_.swiper-button-prev]:transition-opacity [&_.swiper-button-prev]:duration-300 group-hover:[&_.swiper-button-prev]:opacity-100"
        >
          {popupImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`info-rs-${index}`}
                className="w-full aspect-[4/5] object-cover bg-gray-50"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="p-4 sm:p-5 text-center bg-white border-t border-gray-100 z-10">
          <a
            href="https://wa.me/6285129972996"
            target="_blank"
            rel="noreferrer"
            onClick={() => setShow(false)}
            className="inline-block w-full bg-green-500 hover:bg-green-600 text-white font-extrabold text-sm sm:text-base px-8 py-3 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
          >
            Hubungi Customer Care
          </a>
        </div>
      </div>
    </div>
  );
}
