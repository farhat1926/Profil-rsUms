import React, { useState } from "react";
import Swal from "sweetalert2";

export default function UpdateEvent({ data, onSuccess }) {
  // Format tanggal untuk input type="date"
  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toISOString().split("T")[0] : "";

  const [form, setForm] = useState({
    title: data.title || "",
    short_desc: data.short_desc || "",
    full_desc: data.full_desc || "",
    event_date: formatDate(data.event_date),
    image: data.image || "" // Path gambar lama
  });
  const [newImage, setNewImage] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("short_desc", form.short_desc);
    formData.append("full_desc", form.full_desc);
    formData.append("event_date", form.event_date);
    
    // Jika tidak ada gambar baru, kirim path gambar lama agar tidak null di DB
    if (newImage) formData.append("image", newImage);
    else formData.append("image", form.image);

    try {
      const response = await fetch(`${API_URL}/event/${data.id}`, {
        method: "PUT", // Gunakan metode PUT untuk update
        body: formData,
      });
      if (response.ok) {
        Swal.fire("Sukses!", "Event berhasil diperbarui.", "success");
        onSuccess(); // Kembali ke list
      } else {
        throw new Error("Gagal");
      }
    } catch (error) {
      Swal.fire("Error!", "Gagal mengupdate event.", "error");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
        <input name="title" value={form.title} placeholder="Judul Event" onChange={handleChange} className="w-full border p-3 rounded-lg bg-gray-50" required />
        <textarea name="short_desc" value={form.short_desc} placeholder="Deskripsi singkat" onChange={handleChange} className="w-full border p-3 rounded-lg bg-gray-50" required />
        <textarea name="full_desc" value={form.full_desc} placeholder="Deskripsi lengkap" onChange={handleChange} className="w-full border p-3 rounded-lg bg-gray-50 h-40" required />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Poster (Biarkan kosong jika tidak ingin ganti)</label>
          <input type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} className="w-full border p-3 rounded-lg bg-gray-50" />
        </div>
        <input type="date" name="event_date" value={form.event_date} onChange={handleChange} className="w-full border p-3 rounded-lg bg-gray-50" required />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors mt-4">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}