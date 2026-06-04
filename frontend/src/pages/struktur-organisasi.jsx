
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// sesuaikan path gambar

export default function StrukturOrganisasi() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* BUTTON KEMBALI */}
        <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-md transition-all duration-300 cursor-pointer"
            >
            <ArrowLeft size={20} />
            Kembali
            </button>

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* HEADER */}
          <div className="bg-gradient-to-r bg-[#96d649]/70 text-white px-8 py-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold">
              Struktur Organisasi
            </h1>

            <p className="mt-3 text-green-100 text-lg">
              Rumah Sakit UMS A.R. Fachrudin
            </p>
          </div>

          {/* CONTENT */}
          <div className="p-4 md:p-10">
            <div className="overflow-auto rounded-2xl border border-gray-200">
              <img
                src={"/strukturImg.jpeg"}
                alt="Struktur Organisasi"
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}