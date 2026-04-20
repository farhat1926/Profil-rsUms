import React, { useState } from "react";
import Swal from "sweetalert2";

export default function InputEvent() {
  const [form, setForm] = useState({
    title: "",
    short_desc: "",
    full_desc: "",
    event_date: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setImage(e.target.files[0]);
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("short_desc", form.short_desc);
    formData.append("full_desc", form.full_desc);
    formData.append("event_date", form.event_date);
    if (image) formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3001/event", {
        method: "POST",
        body: formData,
      });
      await response.json();
      Swal.fire({
        icon: "success",
        title: "Tersimpan!",
        text: "Event berhasil ditambahkan ke database.",
        confirmButtonColor: "#0f2a4a",
      });

      setForm({ title: "", short_desc: "", full_desc: "", event_date: "" });
      setImage(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat mengupload event.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Input Kegiatan / Event
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
        <input
          name="title"
          value={form.title}
          placeholder="Judul Event"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white"
          required
        />
        <textarea
          name="short_desc"
          value={form.short_desc}
          placeholder="Deskripsi singkat"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white"
          required
        />
        <textarea
          name="full_desc"
          value={form.full_desc}
          placeholder="Deskripsi lengkap"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white h-40"
          required
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Poster / Banner Event
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tanggal Pelaksanaan
          </label>
          <input
            type="date"
            name="event_date"
            value={form.event_date}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg bg-gray-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#0f2a4a] hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl transition-colors mt-4"
        >
          Simpan Event
        </button>
      </form>
    </div>
  );
}
