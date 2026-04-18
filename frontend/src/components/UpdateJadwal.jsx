import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateJadwal() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const doctor = state?.doctor;
  
  
  const [name, setName] = useState(doctor?.name || "");
  const [spesialis, setSpesialis] = useState(doctor?.spesialis || "");
  const [jadwal, setJadwal] = useState(
    doctor?.jadwal || {
      senin: [],
      selasa: [],
      rabu: [],
      kamis: [],
      jumat: [],
      sabtu: [],
      minggu: [],
    }
  );
  const [image, setImage] = useState(null);

  const hariList = [
    "senin",
    "selasa",
    "rabu",
    "kamis",
    "jumat",
    "sabtu",
    "minggu",
  ];

  const handleChangeJadwal = (hari, value) => {
    setJadwal({
      ...jadwal,
      [hari]: value
        .split(",")
        .map((j) => j.trim())
        .filter((j) => j !== ""),
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    for (const hari of hariList) {
      const jam = jadwal[hari]?.[0] || "";

      const formData = new FormData();
      formData.append("nama_dokter", name);
      formData.append("spesialis", spesialis);
      formData.append("hari", hari);
      formData.append("jam", jam);

      if (image) {
        formData.append("image", image);
      }
      const API_URL = import.meta.env.VITE_API_URL;
      await fetch(`${API_URL}/jadwal/${doctor.id}`, {
        method: "PUT",
        body: formData,
      });
    }

    alert("Data berhasil diupdate");

    navigate("/jadwal-dokter", { replace: true });

    setTimeout(() => {
      window.location.reload();
    }, 100);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
  }
};

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Update Jadwal Dokter</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded-lg"
          placeholder="Nama dokter"
        />

        <input
          type="text"
          value={spesialis}
          onChange={(e) => setSpesialis(e.target.value)}
          className="w-full border p-3 rounded-lg"
          placeholder="Spesialis"
        />
        <div>
  <label className="block mb-2 font-medium">
    Foto Dokter
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
    className="w-full border p-3 rounded-lg"
  />
</div>

        {/* FORM JADWAL SEMUA HARI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {hariList.map((hari) => (
    <div key={hari} className="border rounded-lg p-3">
      <label className="block mb-2 font-medium capitalize">
        {hari}
      </label>

      <div className="flex gap-2">
        <input
          type="time"
          value={jadwal[hari]?.[0]?.split(" - ")[0] || ""}
          onChange={(e) => {
            const endTime =
              jadwal[hari]?.[0]?.split(" - ")[1] || "";
            setJadwal({
              ...jadwal,
              [hari]: [`${e.target.value} - ${endTime}`],
            });
          }}
          className="w-full border p-2 rounded-lg"
        />

        <input
          type="time"
          value={jadwal[hari]?.[0]?.split(" - ")[1] || ""}
          onChange={(e) => {
            const startTime =
              jadwal[hari]?.[0]?.split(" - ")[0] || "";
            setJadwal({
              ...jadwal,
              [hari]: [`${startTime} - ${e.target.value}`],
            });
          }}
          className="w-full border p-2 rounded-lg"
        />
      </div>
    </div>
  ))}
</div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}

export default UpdateJadwal;