
import React, { useState } from "react";
const doctors = [
  {
    name: "dr. Aji Prabowo, SpB",
    spesialis: "Spesialis Bedah Umum",
    image: "/dr. Aji Prabowo, SpB.jpg",
    jadwal: {
      senin: ["12:00-14:00", "18:30-20:00"],
      selasa: ["18:30-20:00"],
      rabu: ["12:00-14:00", "18:30-20:00"],
      kamis: ["18:30-20:00"],
      jumat: ["18:30-20:00"],
      sabtu: ["08:00-12:00", "08:00-14:00"],
      minggu: [],
    },
  },
  {
    name: "Dr. dr. Flora Ramona Sigit Prakoeswa, M.Kes, Sp.DVE, Dipl. STD-HIV/AIDS, FINSDV, FAADV",
    spesialis: "Spesialis Dermatologi, Venereologi, dan Estetika (Sp.DVE)",
    image: "/Dr flora ramona.jpg",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  {
    name: "dr Shinta SpA",
    spesialis: "Spesialis Anak",
    image: "/dr Shinta SpA.jpg",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  {
    name: "dr. A. Prima Diana, SpOG",
    spesialis: "Spesialis Obstetri dan Ginekologi (SpOG)",
    image: "/dr. A. Prima Diana, SpOG.JPG",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  {
    name: "dr. Abdurahman Ama, Sp.KJ., M.Kes.",
    spesialis: "Spesialis Kedokteran Jiwa",
    image: "/dr. Abdurahman Ama, Sp.KJ., M.Kes..JPG",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  {
    name: "Dr. dr. Aria Wibawa, SpOG (K) FM",
    spesialis: "Spesialis Obstetri dan Ginekologi (SpOG)",
    image: "/Dr. dr. Aria Wibawa, SpOG (K) FM.png",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  {
    name: "dr. Asep Santoso, Sp.OT, SubSpPL(K),M.Kes",
    spesialis: "Spesialis Ortopedi dan Traumatologi (Sp.OT)",
    image: "/dr. Asep Santoso, Sp.OT, SubSpPL(K),M.Kes.JPG",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  {
    name: "dr. Deni Setiawan",
    spesialis: "Dokter Umum",
    image: "/dr. Deni Setiawan.jpg",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  {
    name: "Dr. dr. Adriesti Herdaetha, Sp.KJ, M.H",
    spesialis: "Spesialis Kedokteran Jiwa",
    image: "/Dr. dr. Adriesti Herdaetha, Sp.KJ, M.H.JPG",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  {
    name: "Dr. dr. Siswarni Sp KFR (K)",
    spesialis: "Spesialis Kedokteran Fisik dan Rehabilitasi",
    image: "/Dr. dr. Siswarni Sp KFR (K).JPG",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  {
    name: "dr. FINALISTIANI",
    spesialis: "Dokter Umum",
    image: "/dr. FINALISTIANI.jpg",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  {
    name: "dr. Hendra Cahya Kumara, Sp. OT (K) Subsp, A (K)",
    spesialis: "Spesialis Ortopedi dan Traumatologi (Sp.OT)",
    image: "/dr. Hendra Cahya Kumara, Sp. OT (K) Subsp, A (K).jpg",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  {
    name: "dr. Hitaputra Agung Wardhana, SpB ., FINACS",
    spesialis: "Spesialis Bedah Umum",
    image: "/dr. Hitaputra Agung Wardhana, SpB ., FINACS.jpg",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  {
    name: "dr. Medita Prasetyo, SpA",
    spesialis: "Spesialis Anak",
    image: "/dr. Medita Prasetyo, SpA.jpg",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  {
    name: "dr. Miftakhul Ulum Mahfud, MMR., SpRad",
    spesialis: "Spesialis Radiologi",
    image: "/dr. Miftakhul Ulum Mahfud, MMR., SpRad.jpg",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  {
    name: "dr. Restu Triwulandani Tolibin, SpA",
    spesialis: "Spesialis Anak",
    image: "/dr. Restu Triwulandani Tolibin, SpA.jpg",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  {
    name: "dr. Sulistyani, SpN",
    spesialis: "Spesialis Neurologi",
    image: "/dr. Sulistyani, SpN.jpg",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  {
    name: "dr. Yuni Prastyo Kurniati, M.M., Sp.PA",
    spesialis: "Spesialis Patologi Anatomi",
    image: "/dr. Yuni Prastyo Kurniati, M.M., Sp.PA.jpg",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  {
    name: "dr.Cyntia Arum Budi Rustiawati",
    spesialis: "Dokter Umum",
    image: "/dr.Cyntia Arum Budi Rustiawati.JPG",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  {
    name: "Drg. Suryasti Putri",
    spesialis: "Dokter Gigi",
    image: "/Drg. Suryasti Putri.jpg",
    jadwal: {
      senin: [],
      selasa: ["08:00-11:00", "16:00-18:00"],
      rabu: [],
      kamis: ["08:00-14:00", "16:00-18:00","18:30-20:00"],
      jumat: ["07:00-12:00", "18:00-19:00"],
      sabtu: [],
      minggu: [],
    },
  },
  
];

// function group
const groupBySpesialis = (data) => {
  return data.reduce((acc, curr) => {
    const key = curr.spesialis;
    if (!acc[key]) acc[key] = [];
    acc[key].push(curr);
    return acc;
  }, {});
};

function JadwalDokter() {
  const [open, setOpen] = useState(null);

  const grouped = groupBySpesialis(doctors);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Jadwal Dokter RS UMS A.R. FACHRUDIN
      </h1>

      {Object.entries(grouped).map(([spesialis, list], index) => (
        <div key={index} className="mb-4 border rounded-lg overflow-hidden">

          {/* HEADER */}
          <div
            onClick={() => setOpen(open === index ? null : index)}
            className="cursor-pointer bg-gray-100 px-4 py-4 font-semibold text-blue-700 flex justify-between items-center"
          >
            <span>Klinik {spesialis}</span>
            <span>{open === index ? "▲" : "▼"}</span>
          </div>

          {/* CONTENT */}
          {open === index && (
            <div className="bg-white p-4 space-y-4">

              {list.map((doc, i) => (
                <div
                  key={i}
                  className="border rounded-xl p-4 flex gap-4"
                >
                  {/* FOTO */}
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  {/* INFO */}
                  <div className="flex-1">
                    <p className="font-semibold">{doc.name}</p>

                    {/* JADWAL */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm">
                      {Object.entries(doc.jadwal).map(([hari, jam]) => (
                        <div key={hari} className="border rounded p-2">
                          <p className="font-medium capitalize">{hari}</p>

                          {jam.length > 0 ? (
                            jam.map((j, idx) => (
                              <div
                                key={idx}
                                className={`${
                                  idx !== jam.length - 1
                                    ? "border-b"
                                    : ""
                                }`}
                              >
                                {j}
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-400">-</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default JadwalDokter;