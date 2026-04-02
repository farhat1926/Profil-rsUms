import React, { useState } from "react";
import { Phone, MessageCircle, ChevronDown, X } from "lucide-react";

const doctors = [
  {
    name: "dr. chaewon",
    specialty: "Spesialis THT",
    image: "/dokter.png",
    description:
      "Dokter spesialis THT berpengalaman lebih dari 10 tahun dalam menangani gangguan telinga, hidung, dan tenggorokan.",
    schedule: "Senin - Jumat, 08:00 - 15:00",
  },
  {
    name: "dr. chaewon",
    specialty: "Spesialis THT",
    image: "/dokter.png",
    description:
      "Ahli dalam konsultasi dan tindakan medis THT modern.",
    schedule: "Senin - Sabtu, 09:00 - 14:00",
  },
];

function DoctorPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-12">
      <h1 className="text-6xl font-bold mb-10">Dokter</h1>

      <div className="grid md:grid-cols-4 gap-6">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl overflow-hidden shadow-md group cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
          >
            {/* Doctor Image */}
            <div className="overflow-hidden">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Bottom Info */}
            <div className="bg-lime-400 px-5 py-4 flex justify-between items-center relative">
              {/* Profile Button */}
              <button
                onClick={() => setSelectedDoctor(doctor)}
                className="absolute -top-6 right-3 bg-lime-600 text-white text-xs px-4 py-2 rounded-t-2xl rounded-b-md flex items-center gap-1 hover:bg-lime-700 transition-all duration-300"
              >
                Lihat Profil <ChevronDown size={14} />
              </button>

              {/* Doctor Info */}
              <div>
                <h2 className="text-white font-bold text-2xl">
                  {doctor.name}
                </h2>
                <p className="text-white text-sm">
                  {doctor.specialty}
                </p>
              </div>

              {/* Icons */}
              <div className="flex gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-white hover:scale-110 transition-all duration-300">
                  <Phone size={18} />
                </div>

                <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-white hover:scale-110 transition-all duration-300">
                  <MessageCircle size={18} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl w-[500px] p-8 relative shadow-2xl animate-fadeIn">
            {/* Close */}
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <X size={24} />
            </button>

            <img
              src={selectedDoctor.image}
              alt={selectedDoctor.name}
              className="w-40 h-40 mx-auto rounded-full object-cover mb-5"
            />

            <h2 className="text-3xl font-bold text-center mb-2">
              {selectedDoctor.name}
            </h2>

            <p className="text-center text-lime-600 font-semibold mb-4">
              {selectedDoctor.specialty}
            </p>

            <p className="text-gray-600 text-center mb-4">
              {selectedDoctor.description}
            </p>

            <p className="text-center text-gray-500">
              <span className="font-semibold">Jadwal:</span>{" "}
              {selectedDoctor.schedule}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorPage;