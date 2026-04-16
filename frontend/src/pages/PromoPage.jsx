import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PromoPage() {
  const [promoList, setPromoList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/promo")
      .then((res) => res.json())
      .then((data) => setPromoList(data));
  }, []);

  return (
    <section className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Promosi Rumah Sakit
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {promoList.map((promo) => (
          <div
            key={promo.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            {/* gambar portrait */}
            <img
              src={`http://localhost:3001${promo.image}`}
              alt={promo.title}
              className="w-full h-[420px] object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-bold line-clamp-2">
                {promo.title}
              </h2>

              <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                {promo.description}
              </p>

              {/* button tanpa background */}
              <Link
  to={`/promo/${promo.id}`}
  className="inline-block mt-4 text-green-600 font-semibold hover:underline"
>
  Lihat Promo →
</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}