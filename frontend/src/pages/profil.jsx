// VisiMisi.jsx

import React from "react";
import { Eye, Target, HeartHandshake } from "lucide-react";

export default function Profil() {
  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      {/* HERO */}

      <section className="relative w-full h-[160px] md:h-[220px] bg-[#5aa1db]/90 flex flex-col justify-center items-center text-center px-4 overflow-hidden shadow-inner">
        <img
          src="/images/banner-web.png"
          alt="Banner Promo"
          className="absolute inset-0 w-full h-full object-cover z-10 mix-blend-multiply opacity-20"
        />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 md:mb-3 drop-shadow-md">
            VISI & MISI RUMAH SAKIT
          </h1>
          <p className="text-white font-medium text-sm md:text-base max-w-2xl mx-auto drop-shadow-sm">
            Mewujudkan layanan kesehatan yang profesional, berfokus pada
            keselamatan pasien, dan berpegang teguh pada nilai-nilai Islami yang
            transparan.
          </p>
        </div>
      </section>

      {/* VISI */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-green-100 p-4 rounded-2xl">
              <Target size={40} className="text-green-600" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-800">Visi</h2>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-white border-l-4 border-green-500 p-6 rounded-2xl">
            <p className="text-lg leading-relaxed text-gray-700 font-medium">
              “Menjadi rumah sakit yang profesional, islami, berstandar
              nasional, dan berorientasi keselamatan pasien yang ramah
              keluarga.”
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
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Menyelenggarakan pelayanan kesehatan yang aman, bermutu, dan berfokus pada pasien.",
              "Menguatkan tata kelola Islami, transparansi, dan akuntabilitas.",
              "Membangun kemitraan strategis dengan jejaring layanan dan komunitas.",
              "Mengembangkan pendidikan interprofesional dan penelitian translasi yang relevan dengan umat.",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-green-300 hover:shadow-md transition-all duration-300"
              >
                <div className="bg-green-100 p-2 rounded-full mt-1">
                  <HeartHandshake size={20} className="text-green-600" />
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
