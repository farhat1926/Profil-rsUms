import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/event/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
      })
      .catch((err) => {
        console.error("Gagal mengambil detail event:", err);
      });
  }, [id]);

  if (!event) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-block mb-6 text-green-600 hover:text-green-700 hover:underline font-medium transition-colors cursor-pointer"
        >
          &larr; Kembali ke halaman utama
        </Link>

        {/* Gambar diubah menjadi rasio 16:9 (aspect-video) dan object-contain agar tidak terpotong */}
        <div className="w-full aspect-video bg-gray-50 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center border border-gray-100">
          <img
            src={`${API_URL}${event.image}`}
            alt={event.title}
            className="w-full h-full object-contain"
          />
        </div>

        <h1 className="text-4xl font-bold mt-8 text-green-600">
          {event.title}
        </h1>

        <p className="text-gray-500 mt-3 text-lg">{event.short_desc}</p>

        {/* Ditambahkan text-justify agar paragraf rata kanan-kiri */}
        <div className="mt-6 text-gray-700 leading-8 text-lg whitespace-pre-line text-justify">
          {event.full_desc}
        </div>

        <p className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-400 font-medium">
          📅 Tanggal Event: {event.event_date}
        </p>
      </div>
    </div>
  );
};

export default EventDetail;
