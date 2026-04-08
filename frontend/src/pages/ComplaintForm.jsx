import React, { useState } from "react";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    nama: "",
    layanan: "",
    keluhan: "",
    harapan: "",
    lokasi: "",
    email: "",
    telepon: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.nama.trim()) {
      newErrors.nama = "Nama wajib diisi";
    }

    if (!formData.layanan.trim()) {
      newErrors.layanan = "Jenis layanan wajib diisi";
    }

    if (!formData.keluhan.trim()) {
      newErrors.keluhan = "Keluhan wajib diisi";
    }

    if (formData.keluhan.length < 20) {
      newErrors.keluhan = "Keluhan minimal 20 karakter";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Komplain berhasil dikirim");
      console.log(formData);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Form Komplain Pasien
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nama */}
          <div>
            <input
              type="text"
              name="nama"
              placeholder="Nama Pasien"
              value={formData.nama}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
            {errors.nama && (
              <p className="text-red-500 text-sm mt-1">{errors.nama}</p>
            )}
          </div>

          {/* Layanan */}
          <div>
            <input
              type="text"
              name="layanan"
              placeholder="Layanan yang dikomplain (IGD / Rawat Inap / Dokter)"
              value={formData.layanan}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
            {errors.layanan && (
              <p className="text-red-500 text-sm mt-1">{errors.layanan}</p>
            )}
          </div>

          {/* Keluhan */}
          <div>
            <textarea
              name="keluhan"
              rows="5"
              placeholder="Jelaskan keluhan secara lengkap..."
              value={formData.keluhan}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            ></textarea>
            {errors.keluhan && (
              <p className="text-red-500 text-sm mt-1">{errors.keluhan}</p>
            )}
          </div>

          {/* Harapan */}
          <div>
            <textarea
              name="harapan"
              rows="4"
              placeholder="Solusi / harapan dari pasien"
              value={formData.harapan}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            ></textarea>
          </div>

          {/* Lokasi */}
          <div>
            <select
              name="lokasi"
              value={formData.lokasi}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Pilih Lokasi Layanan</option>
              <option>IGD</option>
              <option>Rawat Inap</option>
              <option>Poliklinik</option>
              <option>Laboratorium</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email (opsional)"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Telepon */}
          <div>
            <input
              type="text"
              name="telepon"
              placeholder="No Telepon"
              value={formData.telepon}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600"
          >
            SUBMIT KOMPLAIN
          </button>
        </form>
      </div>
    </section>
  );
};

export default ComplaintForm;