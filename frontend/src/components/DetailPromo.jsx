import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function DetailPromo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promo, setPromo] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/promo/${id}`)
      .then((res) => res.json())
      .then((data) => setPromo(data));
  }, [id]);

  if (!promo) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <section className="min-h-screen bg-white pt-10 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/promo")}
          className="mb-4 text-green-600 hover:underline"
        >
          ← Kembali ke Promo
        </button>

        {/* JUDUL */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
          {promo.title}
        </h1>

        {/* META */}
        <p className="text-sm text-gray-400 mb-6">
          Dipublikasikan oleh RS UMS A.R. Fachrudin
        </p>

        <div className="w-16 h-[3px] bg-green-600 mb-8"></div>

        <div className="flex flex-col md:flex-row gap-10 items-start">

          <div className="w-full md:w-[320px] shrink-0">
            <img
              src={
                promo.image
                  ? `${API_URL}${promo.image}`
                  : "/images/banner-web.png"
              }
              alt={promo.title}
              className="w-full h-[420px] object-cover object-top rounded-md"
            />
          </div>

          <div className="flex-1">
            <div className="text-gray-700 leading-8 text-[15px] md:text-base whitespace-pre-line break-words">
              {promo.detail_description}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}