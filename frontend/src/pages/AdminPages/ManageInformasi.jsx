import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import InputInformasi from "./InputInformasi";
import UpdateInformasi from "./UpdateInformasi";

export default function ManageInformasi() {
  const [view, setView] = useState("list");
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (view === "list") {
      fetch(`${API_URL}/informasi`)
        .then((res) => res.json())
        .then((data) => {
          setData(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error("Gagal mengambil informasi:", err);
        });
    }
  }, [view]);

  const handleEdit = (item) => {
    setEditData(item);
    setView("edit");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Artikel?",
      text: "Data akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/informasi/${id}`, { method: "DELETE" })
          .then(() => {
            Swal.fire("Terhapus!", "Artikel berhasil dihapus.", "success");
            setView("");
            setTimeout(() => setView("list"), 10);
          })
          .catch(() => Swal.fire("Gagal!", "Gagal menghapus data.", "error"));
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {view === "list"
            ? "Daftar Informasi & Artikel"
            : view === "add"
              ? "Tulis Artikel Baru"
              : "Edit Artikel"}
        </h2>
        <button
          onClick={() => setView(view === "list" ? "add" : "list")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold transition"
        >
          {view === "list" ? "+ Tulis Artikel" : "Kembali ke Daftar"}
        </button>
      </div>

      {view === "list" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-700">
                  Judul Artikel
                </th>
                <th className="px-6 py-4 font-bold text-gray-700">Kategori</th>
                <th className="px-6 py-4 font-bold text-gray-700">Penulis</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-bold text-gray-800">
                    {item.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm italic">
                    {item.author}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 font-bold bg-blue-50 hover:bg-blue-100 hover:text-blue-800 px-3 py-1 rounded-lg mr-2 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 font-bold bg-red-50 hover:bg-red-100 hover:text-red-700 px-3 py-1 rounded-lg transition-colors"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Kondisional Render Form */}
      {view === "add" && <InputInformasi onSuccess={() => setView("list")} />}
      {view === "edit" && (
        <UpdateInformasi data={editData} onSuccess={() => setView("list")} />
      )}
    </div>
  );
}
