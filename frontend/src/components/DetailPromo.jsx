import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailPromo() {
  const { id } = useParams();
  const [promo, setPromo] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/promo/${id}`)
      .then((res) => res.json())
      .then((data) => setPromo(data));
  }, [id]);

  if (!promo) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <section className="p-10 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto">
        <img
          src={`http://localhost:3001${promo.image}`}
          alt={promo.title}
          className="w-full h-[600px] object-cover rounded-2xl"
        />

        <h1 className="text-4xl font-bold mt-6">
          {promo.title}
        </h1>

        <p className="mt-4 text-gray-700 leading-8">
          {promo.description}
        </p>

        <a
          href={promo.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 text-green-600 font-semibold hover:underline"
        >
          Kunjungi Promo →
        </a>
      </div>
    </section>
  );
}   