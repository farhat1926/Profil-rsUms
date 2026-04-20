import React, { useState } from "react";
import Swal from "sweetalert2";

export default function EditPage() {
  const [namaDokter, setNamaDokter] = useState("");
  const [spesialis, setSpesialis] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState(null);
  const [jadwalList, setJadwalList] = useState([
    { hari: "", mulai: "", selesai: "" },
  ]);

  const tambahJadwal = () => {
    setJadwalList([...jadwalList, { hari: "", mulai: "", selesai: "" }]);
  };

  const handleJadwalChange = (index, field, value) => {
    const updated = [...jadwalList];
    updated[index][field] = value;
    setJadwalList(updated);
  };

  const hapusJadwal = (index) => {
    const updated = jadwalList.filter((_, i) => i !== index);
    setJadwalList(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("namaDokter", namaDokter);
    formData.append("spesialis", spesialis);
    formData.append("deskripsi", deskripsi);
    if (image) formData.append("image", image);
    formData.append("jadwal", JSON.stringify(jadwalList));

    try {
      const res = await fetch("http://localhost:3001/jadwal", {
        method: "POST",
        body: formData,
      });
      const result = await res.text();
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: result,
        confirmButtonColor: "#0f2a4a",
      });

      setNamaDokter("");
      setSpesialis("");
      setDeskripsi("");
      setImage(null);
      setJadwalList([{ hari: "", mulai: "", selesai: "" }]);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menyimpan data dokter!",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Input Data Dokter & Jadwal
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <input
          type="text"
          value={namaDokter}
          onChange={(e) => setNamaDokter(e.target.value)}
          placeholder="Nama Dokter (contoh: dr. Budi, Sp.A)"
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
          required
        />

        <input
          type="text"
          value={spesialis}
          onChange={(e) => setSpesialis(e.target.value)}
          placeholder="Spesialis (contoh: Spesialis Anak)"
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
          required
        />
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Deskripsi Dokter (Keahlian, Pengalaman, dll)"
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all h-32"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foto Dokter
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border p-3 rounded-lg bg-gray-50"
            accept="image/*"
          />
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-4">Jadwal Praktek</h3>
          {jadwalList.map((item, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 bg-gray-50/50 space-y-3 mb-4"
            >
              <select
                value={item.hari}
                onChange={(e) =>
                  handleJadwalChange(index, "hari", e.target.value)
                }
                className="w-full border p-3 rounded-lg bg-white"
                required
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

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="time"
                  value={item.mulai}
                  onChange={(e) =>
                    handleJadwalChange(index, "mulai", e.target.value)
                  }
                  className="border p-3 rounded-lg bg-white"
                  required
                />
                <input
                  type="time"
                  value={item.selesai}
                  onChange={(e) =>
                    handleJadwalChange(index, "selesai", e.target.value)
                  }
                  className="border p-3 rounded-lg bg-white"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => hapusJadwal(index)}
                className="bg-red-50 text-red-600 hover:bg-red-100 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Hapus Jadwal
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={tambahJadwal}
            className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
          >
            + Tambah Hari Jadwal
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#0f2a4a] hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl transition-colors mt-6"
        >
          Simpan Data Dokter
        </button>
      </form>
    </div>
  );
}
