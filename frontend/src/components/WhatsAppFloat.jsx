import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloat = () => {
  const phoneNumber = "6285169799799"; // nomor humas

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="flex items-center gap-3 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition duration-300">
        <FaWhatsapp className="text-3xl" />
        <span className="font-semibold text-sm md:text-base">Hubungi Kami</span>
      </div>
    </a>
  );
};

export default WhatsAppFloat;
