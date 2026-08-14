import React, { useState } from "react";
import Swal from "sweetalert2";
import { UploadCloud, Image as ImageIcon, X, Save } from "lucide-react";

export default function InputInformasi({ onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    summary: "",
    content: "",
    author: "",
    date: "",
  });
  const [image, setImage] = useState(null);

  // State baru untuk menyimpan URL pratinjau gambar
  const [imagePreview, setImagePreview] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setImage(file); //[cite: 9]

      // Membuat URL lokal sementara untuk pratinjau gambar
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      } else {
        setImagePreview(null);
      }
    } else {
      setForm({ ...form, [name]: value }); //[cite: 9]
    }
  };

  // Fungsi untuk menghapus gambar yang sudah dipilih
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    // Reset nilai input file
    document.getElementById("image-upload").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //[cite: 9]

    // Validasi sederhana: Pastikan gambar wajib diisi
    if (!image) {
      Swal.fire({
        icon: "warning",
        title: "Gambar Kosong",
        text: "Silakan unggah gambar artikel terlebih dahulu!",
        confirmButtonColor: "#0f2a4a",
      });
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key])); //[cite: 9]
    if (image) formData.append("image", image); //[cite: 9]

    try {
      const res = await fetch(`${API_URL}/informasi`, {
        method: "POST",
        body: formData,
      }); //[cite: 9]
      const data = await res.json(); //[cite: 9]

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: data.message || "Artikel berhasil diterbitkan.",
        confirmButtonColor: "#0f2a4a",
      }); //[cite: 9]

      // Reset form
      setForm({
        title: "",
        category: "",
        summary: "",
        content: "",
        author: "",
        date: "",
      }); //[cite: 9]
      setImage(null); //[cite: 9]
      setImagePreview(null);

      // Kembali ke halaman daftar jika fungsi onSuccess tersedia dari ManageInformasi
      if (onSuccess) onSuccess();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menyimpan informasi/artikel!",
        confirmButtonColor: "#d33",
      }); //[cite: 9]
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 max-w-5xl mx-auto">
      <div className="border-b border-gray-100 pb-5 mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
          Tulis Artikel Baru
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Lengkapi form di bawah ini untuk menerbitkan berita atau informasi
          kesehatan terbaru.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row gap-10"
      >
        {/* ================= KOLOM KIRI (Teks Konten) ================= */}
        <div className="flex-1 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Judul Artikel <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title} //[cite: 9]
              onChange={handleChange} //[cite: 9]
              placeholder="Masukkan judul artikel yang menarik..."
              className="w-full border border-gray-200 p-3.5 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-medium text-gray-800"
              required //[cite: 9]
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Kategori <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="category"
                value={form.category} //[cite: 9]
                onChange={handleChange} //[cite: 9]
                placeholder="Misal: Kesehatan"
                className="w-full border border-gray-200 p-3.5 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                required //[cite: 9]
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Tanggal Terbit <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={form.date} //[cite: 9]
                onChange={handleChange} //[cite: 9]
                className="w-full border border-gray-200 p-3.5 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none text-gray-700"
                required //[cite: 9]
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Penulis <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="author"
              value={form.author} //[cite: 9]
              onChange={handleChange} //[cite: 9]
              placeholder="Nama penulis atau admin"
              className="w-full border border-gray-200 p-3.5 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              required //[cite: 9]
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Ringkasan (Summary) <span className="text-red-500">*</span>
            </label>
            <textarea
              name="summary"
              value={form.summary} //[cite: 9]
              onChange={handleChange} //[cite: 9]
              placeholder="Tuliskan 1-2 kalimat ringkasan yang akan muncul di halaman depan..."
              className="w-full border border-gray-200 p-3.5 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none resize-none h-24"
              required //[cite: 9]
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Isi Artikel Lengkap <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              value={form.content} //[cite: 9]
              onChange={handleChange} //[cite: 9]
              placeholder="Ketikkan isi artikel Anda di sini. Gunakan enter untuk memisahkan paragraf."
              className="w-full border border-gray-200 p-3.5 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none h-64"
              required //[cite: 9]
            />
          </div>
        </div>

        {/* ================= KOLOM KANAN (Gambar & Tombol) ================= */}
        <div className="lg:w-[350px] shrink-0 flex flex-col gap-6">
          <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Cover Artikel (16:9) <span className="text-red-500">*</span>
            </label>

            {/* Tampilan Area Upload / Pratinjau */}
            <div className="relative group w-full aspect-video rounded-xl border-2 border-dashed border-gray-300 bg-white hover:bg-gray-50 transition-colors flex flex-col items-center justify-center overflow-hidden cursor-pointer">
              {imagePreview ? (
                // Jika gambar sudah dipilih, tampilkan Preview
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-bold text-sm flex items-center gap-2">
                      <ImageIcon size={18} /> Ganti Gambar
                    </p>
                  </div>
                </>
              ) : (
                // Jika gambar belum dipilih, tampilkan Ikon Upload
                <div className="flex flex-col items-center text-gray-400 p-4 text-center">
                  <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3">
                    <UploadCloud size={24} />
                  </div>
                  <p className="text-sm font-bold text-gray-600">
                    Klik untuk unggah gambar
                  </p>
                  <p className="text-xs mt-1">Format: JPG, PNG, WEBP</p>
                </div>
              )}

              {/* Input file disembunyikan dan ditimpa di atas kotak agar bisa diklik */}
              <input
                id="image-upload"
                type="file"
                name="image"
                accept="image/*" //[cite: 9]
                onChange={handleChange} //[cite: 9]
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {/* Tombol Hapus Gambar (Hanya muncul jika gambar sudah dipilih) */}
            {imagePreview && (
              <button
                type="button"
                onClick={removeImage}
                className="w-full mt-3 flex items-center justify-center gap-2 text-red-500 hover:text-red-700 text-sm font-bold py-2 transition-colors"
              >
                <X size={16} /> Hapus Gambar
              </button>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl sticky top-24">
            <h3 className="font-bold text-blue-900 mb-2">Siap Diterbitkan?</h3>
            <p className="text-xs text-blue-700 mb-5 leading-relaxed">
              Pastikan semua data bertanda bintang merah (*) sudah terisi dengan
              benar sebelum menekan tombol simpan.
            </p>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
            >
              <Save
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              Terbitkan Artikel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
