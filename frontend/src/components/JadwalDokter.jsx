import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const [doctors, setDoctors] = useState([]); 
  const navigate = useNavigate();

  const handleUpdate = (doctor) => {
  navigate("/update-jadwal", {
    state: { doctor },
  });
};

    const handleDelete = async (id) => {
      const confirmDelete = window.confirm("Yakin ingin menghapus data?");
      if (!confirmDelete) return;

      try {
        await fetch(`http://localhost:3001/jadwal/${id}`, {
          method: "DELETE",
        });

        setDoctors((prev) => prev.filter((doc) => doc.id !== id));
      } catch (error) {
        console.error("Gagal delete:", error);
      }
    };

  const loadDoctors = () => {
  fetch("http://localhost:3001/jadwal")
    .then((res) => res.json())
    .then((data) => {
      const result = {};

      data.forEach((item) => {
        if (!result[item.id]) {
          result[item.id] = {
            id: item.id,
            name: item.nama_dokter,
            spesialis: item.spesialis?.trim() || "Tidak ada spesialis",
            image: item.image || "/default.jpg",
            jadwal: {
              senin: [],
              selasa: [],
              rabu: [],
              kamis: [],
              jumat: [],
              sabtu: [],
              minggu: [],
            },
          };
        }

        if (item.hari && item.jam) {
          result[item.id].jadwal[item.hari].push(item.jam);
        }
      });

      setDoctors(Object.values(result));
    });
};

useEffect(() => {
  loadDoctors();
}, []);

  const grouped = groupBySpesialis(doctors);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Jadwal Dokter RS UMS A.R. FACHRUDIN
      </h1>

      {Object.entries(grouped).map(([spesialis, list], index) => (
        <div key={index} className="mb-4 border rounded-lg overflow-hidden">

          <div
            onClick={() => setOpen(open === index ? null : index)}
            className="cursor-pointer bg-gray-100 px-4 py-4 font-semibold text-blue-700 flex justify-between items-center"
          >
            <span>Klinik {spesialis}</span>
            <span>{open === index ? "▲" : "▼"}</span>
          </div>

          {open === index && (
            <div className="bg-white p-4 space-y-4">
              {list.map((doc, i) => (
  <div key={i} className="border rounded-xl p-4 flex gap-4">
    <img
      src={`http://localhost:3001${doc.image}`}
      alt={doc.name}
      className="w-30 h-40 object-cover rounded-lg"
    />

    <div className="flex-1">
      <p className="font-semibold">{doc.name}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm">
        {Object.entries(doc.jadwal).map(([hari, jam]) => (
          <div key={hari} className="border rounded p-2">
            <p className="font-medium capitalize">{hari}</p>

            {jam.length > 0 ? (
              jam.map((j, idx) => <div key={idx}>{j}</div>)
            ) : (
              <p className="text-gray-400">-</p>
            )}
          </div>
        ))}
      </div>

      {/* tombol */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => handleUpdate(doc)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Update
        </button>

        <button
          onClick={() => handleDelete(doc.id)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Delete
        </button>
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