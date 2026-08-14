import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  UploadCloud,
  Image as ImageIcon,
  X,
  Save,
  Plus,
  Trash2,
} from "lucide-react";

export default function EditPage({ onSuccess }) {
  const [namaDokter, setNamaDokter] = useState("");
  const [spesialis, setSpesialis] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [jadwalList, setJadwalList] = useState([
    { hari: "", mulai: "", selesai: "" },
  ]);

  const API_URL = import.meta.env.VITE_API_URL;

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    document.getElementById("image-upload-dokter").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      Swal.fire({
        icon: "warning",
        title: "Foto Kosong",
        text: "Silakan unggah foto dokter terlebih dahulu!",
        confirmButtonColor: "#0f2a4a",
      });
      return;
    }

    const formData = new FormData();
    formData.append("namaDokter", namaDokter);
    formData.append("spesialis", spesialis);
    formData.append("deskripsi", deskripsi);
    formData.append("image", image);
    formData.append("jadwal", JSON.stringify(jadwalList));

    try {
      const res = await fetch(`${API_URL}/jadwal`, {
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

      // Reset form
      setNamaDokter("");
      setSpesialis("");
      setDeskripsi("");
      removeImage();
      setJadwalList([{ hari: "", mulai: "", selesai: "" }]);

      if (onSuccess) onSuccess();
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
    <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 max-w-5xl mx-auto">
      <div className="border-b border-gray-100 pb-5 mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
          Input Data Dokter & Jadwal
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Masukkan informasi detail dokter beserta jadwal praktiknya di bawah
          ini.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row gap-10"
      >
        {/* ================= KOLOM KIRI (Data & Jadwal) ================= */}
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Nama Dokter <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={namaDokter}
                onChange={(e) => setNamaDokter(e.target.value)}
                placeholder="Misal: dr. Budi, Sp.A"
                className="w-full border border-gray-200 p-3.5 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Spesialis <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={spesialis}
                onChange={(e) => setSpesialis(e.target.value)}
                placeholder="Misal: Spesialis Anak"
                className="w-full border border-gray-200 p-3.5 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Deskripsi / Keahlian <span className="text-red-500">*</span>
            </label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Deskripsi profil dokter, pengalaman, atau keahlian khusus..."
              className="w-full border border-gray-200 p-3.5 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none h-32 resize-none"
              required
            />
          </div>

          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-bold text-gray-700">
                Jadwal Praktik <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={tambahJadwal}
                className="flex items-center gap-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors"
              >
                <Plus size={14} /> Tambah Jadwal
              </button>
            </div>

            <div className="space-y-3">
              {jadwalList.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3"
                >
                  <select
                    value={item.hari}
                    onChange={(e) =>
                      handleJadwalChange(index, "hari", e.target.value)
                    }
                    className="w-full sm:w-1/3 border border-gray-200 p-2.5 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
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

                  <div className="w-full sm:w-2/3 flex items-center gap-2">
                    <input
                      type="time"
                      value={item.mulai}
                      onChange={(e) =>
                        handleJadwalChange(index, "mulai", e.target.value)
                      }
                      className="w-full border border-gray-200 p-2.5 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      required
                    />
                    <span className="text-gray-400 font-medium">-</span>
                    <input
                      type="time"
                      value={item.selesai}
                      onChange={(e) =>
                        handleJadwalChange(index, "selesai", e.target.value)
                      }
                      className="w-full border border-gray-200 p-2.5 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      required
                    />
                    {jadwalList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => hapusJadwal(index)}
                        className="p-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors ml-1 shrink-0"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= KOLOM KANAN (Gambar & Submit) ================= */}
        <div className="lg:w-[320px] shrink-0 flex flex-col gap-6">
          <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Foto Dokter (Portrait) <span className="text-red-500">*</span>
            </label>

            <div className="relative group w-full aspect-[3/4] rounded-xl border-2 border-dashed border-gray-300 bg-white hover:bg-gray-50 transition-colors flex flex-col items-center justify-center overflow-hidden cursor-pointer">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-bold text-sm flex items-center gap-2">
                      <ImageIcon size={18} /> Ganti Foto
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-gray-400 p-4 text-center">
                  <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3">
                    <UploadCloud size={24} />
                  </div>
                  <p className="text-sm font-bold text-gray-600">
                    Klik untuk unggah
                  </p>
                  <p className="text-xs mt-1">Format: JPG, PNG</p>
                </div>
              )}
              <input
                id="image-upload-dokter"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {imagePreview && (
              <button
                type="button"
                onClick={removeImage}
                className="w-full mt-3 flex items-center justify-center gap-2 text-red-500 hover:text-red-700 text-sm font-bold py-2 transition-colors"
              >
                <X size={16} /> Hapus Foto
              </button>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl sticky top-24">
            <h3 className="font-bold text-blue-900 mb-2">Simpan Data?</h3>
            <p className="text-xs text-blue-700 mb-5 leading-relaxed">
              Pastikan foto dan jadwal sudah sesuai sebelum disimpan ke sistem.
            </p>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
            >
              <Save
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              Simpan Data Dokter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
