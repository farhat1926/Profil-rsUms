import React, { useState } from "react";

export default function InputPromo() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    detail_description: "",
    link: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append(
      "detail_description",
      form.detail_description
    );
    formData.append("link", form.link);

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch(
      "http://localhost:3001/promo",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        Input Promosi
      </h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data"
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Judul Promo"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Deskripsi singkat (untuk PromoPage)"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <textarea
          name="detail_description"
          placeholder="Deskripsi lengkap (untuk detail promo)"
          className="w-full border p-3 rounded h-40"
          onChange={handleChange}
        />

        {/* <input
          type="text"
          name="link"
          placeholder="Link eksternal tujuan"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        /> */}

        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
          className="w-full border p-3 rounded"
        />

        <button className="bg-green-600 text-white px-6 py-3 rounded">
          Simpan Promo
        </button>
      </form>
    </div>
  );
}