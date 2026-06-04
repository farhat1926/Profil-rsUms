import React, { useState } from "react";
import Swal from "sweetalert2";

export default function UpdateInformasi({ data, onSuccess }) {
  const API_URL = import.meta.env.VITE_API_URL;

  // Format tanggal agar sesuai dengan input type="date" (YYYY-MM-DD)
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };

  const [form, setForm] = useState({
    title: data.title || "",
    category: data.category || "",
    summary: data.summary || "",
    content: data.content || "",
    author: data.author || "",
    date: formatDate(data.date),
    image: data.image || "", // Simpan path gambar lama
  });

  const [newImage, setNewImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("summary", form.summary);
    formData.append("content", form.content);
    formData.append("author", form.author);
    formData.append("date", form.date);

    // Jika ada file baru, masukkan file. Jika tidak, masukkan path gambar lama.
    if (newImage) {
      formData.append("image", newImage);
    } else {
      formData.append("image", form.image);
    }

    fetch(`${API_URL}/informasi/${data.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal update");
        return res.text();
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Informasi berhasil diperbarui.",
          confirmButtonColor: "#0f2a4a",
        });
        onSuccess(); // Kembali ke tampilan tabel
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Gagal memperbarui informasi.", "error");
      });
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Informasi / Artikel
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Judul Artikel"
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Kategori (Kesehatan, Layanan, dll)"
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          placeholder="Ringkasan singkat"
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Isi artikel lengkap"
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none h-48"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Penulis"
            className="border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gambar (Kosongkan jika tidak ingin mengubah)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewImage(e.target.files[0])}
            className="w-full border p-3 rounded-lg bg-gray-50"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#0f2a4a] hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg"
        >
          Simpan Perubahan Artikel
        </button>
      </form>
    </div>
  );
}
