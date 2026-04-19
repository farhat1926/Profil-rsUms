import React, { useState } from "react";
import Swal from "sweetalert2";

export default function UpdateDokter({ data, onSuccess }) {
  const [namaDokter, setNamaDokter] = useState(data.nama || "");
  const [spesialis, setSpesialis] = useState(data.spesialis || "");
  const [deskripsi, setDeskripsi] = useState(data.deskripsi || "");
  const [image, setImage] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // Konversi object jadwal (cth: {"Senin": "08:00 - 10:00"}) kembali menjadi format form Array
  const defaultJadwal =
    Object.keys(data.jadwal || {}).length > 0
      ? Object.entries(data.jadwal).map(([hari, jam]) => {
          const splitJam = jam.split(" - ");
          return {
            hari,
            mulai: splitJam[0]?.trim() || "",
            selesai: splitJam[1]?.trim() || "",
          };
        })
      : [{ hari: "", mulai: "", selesai: "" }];

  const [jadwalList, setJadwalList] = useState(defaultJadwal);

  const handleJadwalChange = (index, field, value) => {
    const updated = [...jadwalList];
    updated[index][field] = value;
    setJadwalList(updated);
  };

  const tambahJadwal = () =>
    setJadwalList([...jadwalList, { hari: "", mulai: "", selesai: "" }]);
  const hapusJadwal = (index) =>
    setJadwalList(jadwalList.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("namaDokter", namaDokter); // Sesuai dengan controller backend yang baru di atas
    formData.append("spesialis", spesialis);
    formData.append("deskripsi", deskripsi);
    formData.append("jadwal", JSON.stringify(jadwalList));
    formData.append("image", data.rawImage); // Path gambar asli dari DB
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`${API_URL}/jadwal/${data.id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        Swal.fire("Berhasil", "Data dokter diupdate", "success");
        onSuccess();
      }
    } catch (err) {
      Swal.fire("Error", "Gagal menyimpan", "error");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6">Edit Data Dokter</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={namaDokter}
          onChange={(e) => setNamaDokter(e.target.value)}
          placeholder="Nama Dokter"
          className="w-full border p-3 rounded-lg bg-gray-50"
          required
        />
        <input
          type="text"
          value={spesialis}
          onChange={(e) => setSpesialis(e.target.value)}
          placeholder="Spesialis"
          className="w-full border p-3 rounded-lg bg-gray-50"
          required
        />
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Deskripsi"
          className="w-full border p-3 rounded-lg bg-gray-50 h-24"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-3 rounded-lg bg-gray-50"
        />

        <div className="pt-4 border-t border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-4">Jadwal Praktek</h3>
          {jadwalList.map((item, index) => (
            <div key={index} className="flex gap-3 mb-3 items-center">
              <select
                value={item.hari}
                onChange={(e) =>
                  handleJadwalChange(index, "hari", e.target.value)
                }
                className="border p-2 rounded-lg bg-white w-1/3"
              >
                <option value="">Pilih Hari</option>
                <option value="Senin">Senin</option>
                <option value="Selasa">Selasa</option>
                <option value="Rabu">Rabu</option>
                <option value="Kamis">Kamis</option>
                <option value="Jumat">Jumat</option>
                <option value="Sabtu">Sabtu</option>
                <option value="Minggu">Minggu</option>
              </select>
              <input
                type="time"
                value={item.mulai}
                onChange={(e) =>
                  handleJadwalChange(index, "mulai", e.target.value)
                }
                className="border p-2 rounded-lg bg-white"
              />
              <span>-</span>
              <input
                type="time"
                value={item.selesai}
                onChange={(e) =>
                  handleJadwalChange(index, "selesai", e.target.value)
                }
                className="border p-2 rounded-lg bg-white"
              />
              <button
                type="button"
                onClick={() => hapusJadwal(index)}
                className="text-red-500 font-bold ml-2"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={tambahJadwal}
            className="text-blue-600 font-bold text-sm mt-2"
          >
            + Tambah Jadwal
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl mt-6"
        >
          Update Data Dokter
        </button>
      </form>
    </div>
  );
}
