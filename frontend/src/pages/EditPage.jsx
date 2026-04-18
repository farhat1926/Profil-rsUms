import React, { useState } from "react";

function EditPage() {
  const [spesialis, setSpesialis] = useState("");
  const [image, setImage] = useState(null);
  const [namaDokter, setNamaDokter] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const [jadwalList, setJadwalList] = useState([
    {
      hari: "",
      mulai: "",
      selesai: "",
    },
  ]);

  const tambahJadwal = () => {
    setJadwalList([
      ...jadwalList,
      {
        hari: "",
        mulai: "",
        selesai: "",
      },
    ]);
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

    if (image) {
      formData.append("image", image);
    }

    formData.append("jadwal", JSON.stringify(jadwalList));

    try {
      const res = await fetch(`${API_URL}/jadwal`, {
        method: "POST",
        body: formData,
      });

      const result = await res.text();
      alert(result);
    } catch (err) {
      alert("Gagal upload");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-green-600 mb-6">
          Form Input Jadwal Dokter
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={namaDokter}
            onChange={(e) => setNamaDokter(e.target.value)}
            placeholder="Nama Dokter"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            value={spesialis}
            onChange={(e) => setSpesialis(e.target.value)}
            placeholder="Spesialis"
            className="w-full border p-3 rounded-lg"
          />
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Deskripsi Dokter"
            className="w-full border p-3 rounded-lg"
            rows="4"
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border p-3 rounded-lg"
          />

          {/* INPUT JADWAL */}
          {jadwalList.map((item, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 bg-gray-50 space-y-3"
            >
              <select
                value={item.hari}
                onChange={(e) =>
                  handleJadwalChange(index, "hari", e.target.value)
                }
                className="w-full border p-3 rounded-lg"
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
                  className="border p-3 rounded-lg"
                />

                <input
                  type="time"
                  value={item.selesai}
                  onChange={(e) =>
                    handleJadwalChange(index, "selesai", e.target.value)
                  }
                  className="border p-3 rounded-lg"
                />
              </div>

              <button
                type="button"
                onClick={() => hapusJadwal(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Hapus Jadwal
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={tambahJadwal}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            + Tambah Jadwal
          </button>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Simpan Jadwal
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPage;