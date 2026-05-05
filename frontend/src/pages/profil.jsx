// VisiMisi.jsx

import React from "react";
import { Eye, Target, HeartHandshake } from "lucide-react";

export default function Profil() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <section className="relative bg-gradient-to-r from-green-700 to-green-500 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Visi & Misi Rumah Sakit
          </h1>

          <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto">
            Memberikan pelayanan kesehatan yang profesional, humanis,
            berkualitas, dan terpercaya bagi seluruh masyarakat.
          </p>
        </div>
      </section>

      {/* VISI */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-green-100 p-4 rounded-2xl">
              <Eye size={40} className="text-green-600" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-800">Visi</h2>
              <p className="text-gray-500">
                Tujuan utama pelayanan rumah sakit
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-white border-l-4 border-green-500 p-6 rounded-2xl">
            <p className="text-lg leading-relaxed text-gray-700 font-medium">
              “Menjadi rumah sakit unggulan yang memberikan pelayanan kesehatan
              profesional, bermutu, islami, dan berorientasi pada keselamatan
              pasien.”
            </p>
          </div>
        </div>
      </section>

      {/* MISI */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-blue-100 p-4 rounded-2xl">
              <Target size={40} className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-800">Misi</h2>
              <p className="text-gray-500">
                Komitmen pelayanan yang dijalankan
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Memberikan pelayanan kesehatan yang cepat, tepat, aman, dan profesional.",
              "Mengutamakan keselamatan serta kenyamanan pasien dalam setiap pelayanan.",
              "Meningkatkan kualitas sumber daya manusia yang kompeten dan berintegritas.",
              "Mengembangkan fasilitas kesehatan berbasis teknologi modern.",
              "Menjalankan pelayanan kesehatan yang humanis dan islami.",
              "Meningkatkan kepuasan pasien melalui pelayanan prima.",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-green-300 hover:shadow-md transition-all duration-300"
              >
                <div className="bg-green-100 p-2 rounded-full mt-1">
                  <HeartHandshake
                    size={20}
                    className="text-green-600"
                  />
                </div>

                <p className="text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}