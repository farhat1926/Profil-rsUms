import React, { useState } from "react";
import Swal from "sweetalert2";
import { UploadCloud, Image as ImageIcon, X, Save } from "lucide-react";

export default function InputPromo({ onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    detail_description: "",
    link: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
    document.getElementById("image-upload-promo").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      Swal.fire({
        icon: "warning",
        title: "Gambar Kosong",
        text: "Silakan unggah poster/banner promo terlebih dahulu!",
        confirmButtonColor: "#0f2a4a",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("detail_description", form.detail_description);
    formData.append("link", form.link);
    formData.append("image", image);

    try {
      const res = await fetch(`${API_URL}/promo`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      Swal.fire({
        icon: "success",
        title: "Promo Aktif!",
        text: data.message || "Promo berhasil diterbitkan.",
        confirmButtonColor: "#0f2a4a",
      });

      setForm({ title: "", description: "", detail_description: "", link: "" });
      removeImage();

      if (onSuccess) onSuccess();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Gagal menyimpan data promo!",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 max-w-5xl mx-auto">
      <div className="border-b border-gray-100 pb-5 mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
          Buat Promosi Baru
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Buat kampanye promosi layanan rumah sakit agar muncul di halaman promo
          pengguna.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row gap-10"
      >
        {/* ================= KOLOM KIRI (Teks Konten) ================= */}
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Judul Promo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                placeholder="Misal: Paket MCU Dasar"
                className="w-full border border-gray-200 p-3.5 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Tautan (Link Pendaftaran)
              </label>
              <input
                type="url"
                name="link"
                value={form.link}
                placeholder="https://wa.me/..."
                className="w-full border border-gray-200 p-3.5 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none text-blue-600"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Deskripsi Singkat (List View){" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              placeholder="Tuliskan 1 kalimat menarik untuk memikat pengunjung..."
              className="w-full border border-gray-200 p-3.5 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none resize-none h-24"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Detail Deskripsi Lengkap <span className="text-red-500">*</span>
            </label>
            <textarea
              name="detail_description"
              value={form.detail_description}
              placeholder="Jelaskan syarat, ketentuan, harga, dan fasilitas yang didapatkan secara lengkap..."
              className="w-full border border-gray-200 p-3.5 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none h-56"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* ================= KOLOM KANAN (Gambar & Tombol) ================= */}
        <div className="lg:w-[350px] shrink-0 flex flex-col gap-6">
          <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Poster / Banner Promo <span className="text-red-500">*</span>
            </label>

            {/* Tampilan Area Upload / Pratinjau (Rasio 1:1 atau 4:5 menyesuaikan promo) */}
            <div className="relative group w-full aspect-square rounded-xl border-2 border-dashed border-gray-300 bg-white hover:bg-gray-50 transition-colors flex flex-col items-center justify-center overflow-hidden cursor-pointer">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-bold text-sm flex items-center gap-2">
                      <ImageIcon size={18} /> Ganti Poster
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-gray-400 p-4 text-center">
                  <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3">
                    <UploadCloud size={24} />
                  </div>
                  <p className="text-sm font-bold text-gray-600">
                    Unggah poster promo
                  </p>
                  <p className="text-xs mt-1">Format: JPG, PNG, WEBP</p>
                </div>
              )}

              <input
                id="image-upload-promo"
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
                <X size={16} /> Hapus Poster
              </button>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl sticky top-24">
            <h3 className="font-bold text-blue-900 mb-2">Sebarkan Promo!</h3>
            <p className="text-xs text-blue-700 mb-5 leading-relaxed">
              Promo ini akan langsung muncul di halaman website pengguna setelah
              diterbitkan.
            </p>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
            >
              <Save
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              Aktifkan Promo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
