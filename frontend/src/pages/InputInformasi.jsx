import React, { useState } from "react";

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
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch("http://localhost:3001/informasi", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      alert(data.message);

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
      console.error(err);
      alert("Gagal upload informasi");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        Input Informasi Artikel
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Judul artikel"
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Kategori"
          className="w-full border p-3 rounded"
        />

        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          placeholder="Ringkasan"
          className="w-full border p-3 rounded"
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Isi artikel lengkap"
          className="w-full border p-3 rounded h-40"
        />

        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Nama penulis"
          className="w-full border p-3 rounded"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button className="bg-green-500 text-white px-6 py-3 rounded">
          Simpan Informasi
        </button>
      </form>
    </div>
  );
}