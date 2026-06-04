import React, { useState } from "react";
import Swal from "sweetalert2";

export default function UpdatePromo({ data, onSuccess }) {
  const API_URL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    title: data.title || "",
    description: data.description || "",
    detail_description: data.detail_description || "",
    link: data.link || "",
    image: data.image || "", // Path gambar lama
  });

  const [newImage, setNewImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("detail_description", form.detail_description);
    formData.append("link", form.link);

    if (newImage) {
      formData.append("image", newImage);
    } else {
      formData.append("image", form.image);
    }

    fetch(`${API_URL}/promo/${data.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Promo Diperbarui!",
          text: result.message,
          confirmButtonColor: "#0f2a4a",
        });
        onSuccess();
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Gagal memperbarui promo.", "error");
      });
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Promosi</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Judul Promo"
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Deskripsi singkat promo"
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <textarea
          name="detail_description"
          value={form.detail_description}
          onChange={handleChange}
          placeholder="Detail lengkap promo"
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none h-40"
          required
        />
        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Link (Opsional)"
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Poster Promo (Biarkan kosong jika tetap)
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
          Update Data Promo
        </button>
      </form>
    </div>
  );
}
