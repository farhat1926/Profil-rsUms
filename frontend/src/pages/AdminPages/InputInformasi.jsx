import React, { useState } from "react";
import Swal from "sweetalert2";

export default function InputInformasi() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    summary: "",
    content: "",
    author: "",
    date: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setImage(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://localhost:3001/informasi", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: data.message,
        confirmButtonColor: "#0f2a4a",
      });

      setForm({
        title: "",
        category: "",
        summary: "",
        content: "",
        author: "",
        date: "",
      });
      setImage(null);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menyimpan informasi/artikel!",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Input Informasi / Artikel
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Judul artikel"
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Kategori (Misal: Kesehatan, Pengumuman)"
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white"
          required
        />
        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          placeholder="Ringkasan"
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Isi artikel lengkap"
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white h-40"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Nama penulis"
            className="border p-3 rounded-lg bg-gray-50 focus:bg-white"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border p-3 rounded-lg bg-gray-50 focus:bg-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gambar Artikel
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg bg-gray-50"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#0f2a4a] hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl transition-colors mt-4"
        >
          Simpan Artikel
        </button>
      </form>
    </div>
  );
}
