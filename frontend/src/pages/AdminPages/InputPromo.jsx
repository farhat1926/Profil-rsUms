import React, { useState } from "react";
import Swal from "sweetalert2";

export default function InputPromo() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    detail_description: "",
    link: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("detail_description", form.detail_description);
    formData.append("link", form.link);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://localhost:3001/promo", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      Swal.fire({
        icon: "success",
        title: "Promo Aktif!",
        text: data.message,
        confirmButtonColor: "#0f2a4a",
      });

      setForm({ title: "", description: "", detail_description: "", link: "" });
      setImage(null);
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
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Input Promosi Rumah Sakit
      </h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4 max-w-3xl"
      >
        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Judul Promo"
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={form.description}
          placeholder="Deskripsi singkat (tampil di list)"
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white"
          onChange={handleChange}
          required
        />
        <textarea
          name="detail_description"
          value={form.detail_description}
          placeholder="Deskripsi lengkap (tampil di detail)"
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white h-40"
          onChange={handleChange}
          required
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Banner / Poster Promo
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border p-3 rounded-lg bg-gray-50"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#0f2a4a] hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl transition-colors mt-4"
        >
          Simpan Promo
        </button>
      </form>
    </div>
  );
}
