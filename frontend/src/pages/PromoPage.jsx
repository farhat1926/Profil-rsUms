import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PromoPage() {
  const [promoList, setPromoList] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/promo`)
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:", data);
        setPromoList(data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      {/* ================= HERO HEADER SECTION ================= */}
      <section className="relative w-full h-[160px] md:h-[220px] bg-[#96d649]/70 flex flex-col justify-center items-center text-center px-4 overflow-hidden shadow-inner">
        <img
          src="/images/banner-web.png"
          alt="Banner Promo"
          // HANYA MENGGUNAKAN object-cover TANPA object-top
          className="absolute inset-0 w-full h-full object-cover z-10 mix-blend-multiply opacity-20"
        />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 md:mb-3 drop-shadow-md">
            Promosi & Layanan Khusus
          </h1>
          <p className="text-white font-medium text-sm md:text-base max-w-2xl mx-auto drop-shadow-sm">
            Temukan berbagai penawaran khusus dan paket pelayanan kesehatan
            eksklusif dari RS UMS A.R. Fachrudin.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {promoList.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
            >
              <img
                src={`${API_URL}${promo.image}`}
                alt={promo.title}
                className="w-full h-[350px] md:h-[420px] object-cover"
              />
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-800 leading-snug line-clamp-2">
                    {promo.title}
                  </h2>
                  <p className="text-gray-500 mt-2 text-sm line-clamp-3">
                    {promo.description}
                  </p>
                </div>
                <Link
                  to={`/promo/${promo.id}`}
                  className="inline-block mt-5 text-green-600 font-bold hover:underline"
                >
                  Lihat Promo &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
