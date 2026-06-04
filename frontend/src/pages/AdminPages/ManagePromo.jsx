import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import InputPromo from "./InputPromo";
import UpdatePromo from "./UpdatePromo"; 

export default function ManagePromo() {
  const [view, setView] = useState("list"); 
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null); 
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (view === "list") {
      fetch(`${API_URL}/promo`)
        .then((res) => res.json())
        .then((data) => {
          setData(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error("Gagal mengambil promo:", err);
        });
    }
  }, [view]);

  const handleEdit = (item) => {
    setEditData(item);
    setView("edit");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Promo?",
      text: "Promo akan dihapus dari sistem!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/promo/${id}`, { method: "DELETE" })
          .then(() => {
            Swal.fire("Terhapus!", "Promo telah dihapus.", "success");
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
            ? "Daftar Promo Layanan"
            : view === "add"
              ? "Tambah Promo Baru"
              : "Edit Data Promo"}
        </h2>
        <button
          onClick={() => setView(view === "list" ? "add" : "list")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold transition"
        >
          {view === "list" ? "+ Tambah Promo" : "Kembali ke Daftar"}
        </button>
      </div>

      {view === "list" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={`${API_URL}${item.image}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt=""
                />
              </div>
              <div className="p-5 flex-1">
                <h3 className="font-bold text-gray-800 line-clamp-1 uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {item.description}
                </p>
              </div>
              <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:text-blue-800 font-bold text-sm px-2 py-1 rounded bg-blue-50/50 hover:bg-blue-100 transition-colors"
                >
                  Edit Promo
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 font-bold text-sm px-2 py-1 rounded bg-red-50/50 hover:bg-red-100 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Kondisional Render Form */}
      {view === "add" && <InputPromo onSuccess={() => setView("list")} />}
      {view === "edit" && (
        <UpdatePromo data={editData} onSuccess={() => setView("list")} />
      )}
    </div>
  );
}
