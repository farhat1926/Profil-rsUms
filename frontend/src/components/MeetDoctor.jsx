import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  CalendarDays,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const doctorList = [
  {
    id: 1,
    nama: "dr. Diah Kurnia Mirawati, Sp. S(K)",
    spesialis: "Spesialis Neurologi",
    image: "/dokter1.jpg",
    jadwal: {
      Senin: "08:00 - 12:00",
      Selasa: "09:00 - 13:00",
      Rabu: "08:00 - 11:00",
    },
  },
  {
    id: 2,
    nama: "dr. Erupsiana Fitri Indrihapsari, Sp.N",
    spesialis: "Spesialis Neurologi",
    image: "/dokter2.jpg",
    jadwal: {
      Senin: "10:00 - 14:00",
      Kamis: "08:00 - 12:00",
    },
  },
  {
    id: 3,
    nama: "dr. Naziya, Sp.M",
    spesialis: "Spesialis Mata",
    image: "/dokter3.jpg",
    jadwal: {
      Selasa: "08:00 - 12:00",
      Jumat: "09:00 - 13:00",
    },
  },
  {
    id: 4,
    nama: "drg. Astri Zuraida Jannati",
    spesialis: "Gigi",
    image: "/dokter4.jpg",
    jadwal: {
      Senin: "08:00 - 15:00",
    },
  },
  {
    id: 5,
    nama: "drg. Sri Indriyani, MM",
    spesialis: "Gigi",
    image: "/dokter5.jpg",
    jadwal: {
      Rabu: "09:00 - 14:00",
    },
  },
  {
    id: 6,
    nama: "drg. Andhita Permatasari",
    spesialis: "Gigi",
    image: "/dokter6.jpg",
    jadwal: {
      Kamis: "08:00 - 12:00",
    },
  },
];

export default function MeetDoctor() {
  const [openJadwal, setOpenJadwal] = useState(null);

  return (
    <section className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-10">
          Meet With Doctor
        </h1>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {doctorList.map((doctor, index) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              {/* seluruh atas card bisa diklik */}
              <Link
                to={`/doctor/${doctor.id}`}
                className="block p-6"
              >
                <div className="flex gap-5">
                  <img
                    src={doctor.image}
                    alt={doctor.nama}
                    className="w-44 h-44 object-cover rounded-2xl border"
                  />

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {doctor.nama}
                    </h2>

                    <p className="text-gray-500 mt-4 uppercase">
                      Speciality
                    </p>

                    <p className="text-green-700 font-bold text-xl">
                      {doctor.spesialis}
                    </p>

                    <div className="flex items-center gap-2 mt-6 text-green-700 font-semibold underline">
                      <span>Lihat Profil Selengkapnya</span>
                      <Eye size={18} />
                    </div>
                  </div>
                </div>
              </Link>

              {/* jadwal */}
              <div className="px-6 py-4 border-t">
                <button
                  onClick={() =>
                    setOpenJadwal(
                      openJadwal === index ? null : index
                    )
                  }
                  className="flex items-center gap-3 text-green-700 font-bold text-2xl"
                >
                  <CalendarDays size={24} />
                  Lihat Jadwal Praktek
                  {openJadwal === index ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>

                {openJadwal === index && (
                  <div className="mt-4 bg-gray-50 rounded-xl p-4 border">
                    {Object.entries(doctor.jadwal).map(
                      ([hari, jam]) => (
                        <div
                          key={hari}
                          className="flex justify-between py-2 border-b last:border-0"
                        >
                          <span>{hari}</span>
                          <span>{jam}</span>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* footer buttons */}
              <div className="grid grid-cols-2 gap-3 p-6 border-t">
                <button className="border rounded-xl py-4 flex justify-center items-center gap-2 text-green-700 font-bold hover:bg-green-50">
                  <Phone size={18} />
                  Book Appointment
                </button>

                <button className="border rounded-xl py-4 flex justify-center items-center gap-2 text-green-700 font-bold hover:bg-green-50">
                  <MessageCircle size={18} />
                  Kontak Cepat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}