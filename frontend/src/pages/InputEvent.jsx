import React, { useState } from "react";

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
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("short_desc", form.short_desc);
  formData.append("full_desc", form.full_desc);
  formData.append("event_date", form.event_date);

  if (image) {
    formData.append("image", image);
  }

  try {
    const response = await fetch("http://localhost:3001/event", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result);

    alert("Event berhasil ditambahkan");
  } catch (error) {
    console.error("Upload gagal:", error);
  }
};

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        Input Event
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="title"
          placeholder="Judul Event"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="short_desc"
          placeholder="Deskripsi singkat"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="full_desc"
          placeholder="Deskripsi lengkap"
          onChange={handleChange}
          className="w-full border p-3 rounded h-40"
        />

        {/* Upload file gambar */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="date"
          name="event_date"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button className="bg-green-500 text-white px-6 py-3 rounded">
          Simpan Event
        </button>
      </form>
    </div>
  );
}