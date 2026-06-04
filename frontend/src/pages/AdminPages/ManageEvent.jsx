import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import InputEvent from "./InputEvent";
import UpdateEvent from "./UpdateEvent";

export default function ManageEvent() {
  const [view, setView] = useState("list");
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (view === "list") {
      fetch(`${API_URL}/event`)
        .then((res) => res.json())
        .then((data) => {
          setData(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error("Gagal mengambil event:", err);
        });
    }
  }, [view]);
  useEffect(() => {
    if (view === "list") {
      fetch(`${API_URL}/event`)
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  }, [view]);

  const handleEdit = (item) => {
    setEditData(item);
    setView("edit");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Event?",
      text: "Data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/event/${id}`, { method: "DELETE" })
          .then(() => {
            Swal.fire("Berhasil!", "Event telah dihapus.", "success");
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
            ? "Daftar Event"
            : view === "add"
              ? "Tambah Event Baru"
              : "Edit Event"}{" "}
        </h2>
        <button
          onClick={() => setView(view === "list" ? "add" : "list")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold transition"
        >
          {view === "list" ? "+ Tambah Event" : "Kembali ke Daftar"}
        </button>
      </div>

      {view === "list" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-700">
                  Judul Event
                </th>
                <th className="px-6 py-4 font-bold text-gray-700">Tanggal</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`${API_URL}${item.image}`}
                        className="w-12 h-10 rounded object-cover border"
                        alt=""
                      />
                      <span className="font-semibold text-gray-800">
                        {item.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {item.event_date}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-800 font-bold bg-blue-50 px-3 py-1 rounded-lg mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 font-bold bg-red-50 px-3 py-1 rounded-lg"
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

      {view === "add" && <InputEvent onSuccess={() => setView("list")} />}

      {view === "edit" && (
        <UpdateEvent data={editData} onSuccess={() => setView("list")} />
      )}
    </div>
  );
}
