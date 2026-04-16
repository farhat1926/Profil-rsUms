import React, { useState } from "react";

function EditPage() {
  const [spesialis, setSpesialis] = useState("");
  const [image, setImage] = useState("null");
  const [namaDokter, setNamaDokter] = useState("");
  const [jadwal, setJadwal] = useState({
    senin: "",
    selasa: "",
    rabu: "",
    kamis: "",
    jumat: "",
    sabtu: "",
    minggu: "",
  });

  const handleChange = (hari, value) => {
    setJadwal({ ...jadwal, [hari]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("namaDokter", namaDokter);
  formData.append("spesialis", spesialis);
  formData.append("image", image);

  // kirim jadwal satu-satu
  Object.keys(jadwal).forEach((hari) => {
    formData.append(`jadwal[${hari}]`, jadwal[hari]);
  });

  try {
    const res = await fetch("http://localhost:3001/jadwal", {
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
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 border">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-green-600 mb-6">
          Form Input / Edit Jadwal Dokter
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAMA DOKTER */}
          <div>
            <label className="text-sm font-medium">Nama Dokter</label>
            <input
              type="text"
              value={namaDokter}
              onChange={(e) => setNamaDokter(e.target.value)}
              placeholder="Contoh: dr. Shinta SpA"
              className="w-full border p-3 rounded-lg mt-1"
            />
          </div>

          {/* GRID JADWAL */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {Object.keys(jadwal).map((hari) => {
    const startTime = jadwal[hari]?.split(" - ")[0] || "";
    const endTime = jadwal[hari]?.split(" - ")[1] || "";

    return (
      <div
        key={hari}
        className="border rounded-lg p-4 bg-gray-50"
      >
        <h2 className="font-semibold capitalize text-green-700 mb-3">
          {hari}
        </h2>

        <div className="space-y-2">
          <div>
            <label className="text-sm block mb-1">
              Jam Mulai
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) =>
                handleChange(
                  hari,
                  `${e.target.value} - ${endTime}`
                )
              }
              className="w-full border p-2 rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">
              Jam Selesai
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) =>
                handleChange(
                  hari,
                  `${startTime} - ${e.target.value}`
                )
              }
              className="w-full border p-2 rounded-lg"
            />
          </div>
        </div>
      </div>
    );
  })}
</div>
          <div>
  <label className="text-sm font-medium">Spesialis</label>
  <input
    type="text"
    value={spesialis}
    onChange={(e) => setSpesialis(e.target.value)}
    placeholder="Contoh: Spesialis Anak"
    className="w-full border p-3 rounded-lg mt-1"
  />
</div>

<div>
  <label className="text-sm font-medium">Upload Gambar</label>
  <input
    type="file"
    onChange={(e) => setImage(e.target.files[0])}
    className="w-full border p-3 rounded-lg mt-1"
  />
</div>

          {/* BUTTON */}
          <div className="flex justify-end gap-3">
            <button
              type="reset"
              onClick={() =>
                setJadwal({
                  senin: "",
                  selasa: "",
                  rabu: "",
                  kamis: "",
                  jumat: "",
                  sabtu: "",
                  minggu: "",
                })
              }
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              Reset
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Simpan Jadwal
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditPage;