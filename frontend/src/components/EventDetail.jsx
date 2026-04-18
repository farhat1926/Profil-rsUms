import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <img
          src={`${API_URL}${event.image}`}
          alt={event.title}
          className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
        />

        <h1 className="text-4xl font-bold mt-8 text-green-600">
          {event.title}
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          {event.short_desc}
        </p>

        <div className="mt-6 text-gray-700 leading-8 text-lg">
          {event.full_desc}
        </div>

        <p className="mt-6 text-sm text-gray-400">
          Tanggal Event: {event.event_date}
        </p>
      </div>
    </div>
  );
};

export default EventDetail;