import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import EditPage from "./EditPage";
import UpdateDokter from "./UpdateDokter";

export default function ManageDokter() {
  const [view, setView] = useState("list");
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (view === "list") {
      fetch(`${API_URL}/jadwal`)
        .then((res) => res.json())
        .then((data) => {
          const groupedDokter = data.reduce((acc, item) => {
            const existing = acc.find((d) => d.id === item.id);

            if (existing) {
              if (item.hari) {
                existing.jadwal[item.hari] = item.jam;
              }
            } else {
              acc.push({
                id: item.id,
                nama: item.nama_dokter,
                spesialis: item.spesialis,
                deskripsi: item.deskripsi,
                rawImage: item.image,
                img: `${API_URL}${item.image}`,
                jadwal: item.hari ? { [item.hari]: item.jam } : {},
              });
            }
            return acc;
          }, []);

          setData(groupedDokter);
        })
        .catch((err) => {
          console.error("Gagal mengambil data dokter:", err);
        });
    }
  }, [view]);

  const handleEdit = (dokter) => {
    setEditData(dokter);
    setView("edit");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Dokter?",
      text: "Semua jadwal terkait dokter ini akan ikut terhapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/jadwal/${id}`, { method: "DELETE" })
          .then((res) => res.text())
          .then((msg) => {
            Swal.fire("Berhasil!", msg, "success");
            setView("");
            setTimeout(() => setView("list"), 10);
          })
          .catch(() => {
            Swal.fire("Gagal!", "Gagal menghapus data dari server.", "error");
          });
      }
    });
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {view === "list"
              ? "Manajemen Dokter"
              : view === "add"
                ? "Tambah Data Dokter"
                : "Edit Data Dokter"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {view === "list"
              ? "Kelola profil dan jadwal praktek dokter rumah sakit."
              : "Masukkan informasi lengkap dokter beserta jadwalnya."}
          </p>
        </div>

        <button
          onClick={() => setView(view === "list" ? "add" : "list")}
          className={`${
            view === "list"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-600 hover:bg-gray-700"
          } text-white px-6 py-2.5 rounded-xl font-bold shadow-md transition-all flex items-center gap-2`}
        >
          {view === "list" ? "+ Tambah Dokter" : "← Kembali ke Daftar"}
        </button>
      </div>
      {view === "list" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 font-bold text-gray-700">
                  Profil Dokter
                </th>
                <th className="px-6 py-4 font-bold text-gray-700">
                  Spesialisasi
                </th>
                <th className="px-6 py-4 font-bold text-gray-700">
                  Jadwal Praktek
                </th>
                <th className="px-6 py-4 font-bold text-gray-700 text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.length > 0 ? (
                data.map((dokter) => (
                  <tr
                    key={dokter.id}
                    className="hover:bg-gray-50/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={dokter.img}
                          alt={dokter.nama}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                          onError={(e) =>
                            (e.target.src = "/default-doctor.jpg")
                          }
                        />
                        <div>
                          <p className="font-bold text-gray-900">
                            {dokter.nama}
                          </p>
                          <p className="text-xs text-gray-400 line-clamp-1 max-w-[200px]">
                            {dokter.deskripsi || "Tidak ada deskripsi"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold uppercase tracking-wide">
                        {dokter.spesialis}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {Object.entries(dokter.jadwal).length > 0 ? (
                          Object.entries(dokter.jadwal).map(([hari, jam]) => (
                            <div
                              key={hari}
                              className="text-xs text-gray-600 flex gap-2"
                            >
                              <span className="font-bold w-12 text-gray-800">
                                {hari}
                              </span>
                              <span>: {jam}</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-xs italic text-gray-400">
                            Jadwal belum diatur
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(dokter)}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-lg transition-all font-bold text-xs border border-blue-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(dokter.id)}
                          className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 rounded-lg transition-all font-bold text-xs border border-red-100"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-20 text-center text-gray-400 italic"
                  >
                    Belum ada data dokter yang tersimpan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Kondisional Render Form Tambah & Edit */}
      {view === "add" && <EditPage onSuccess={() => setView("list")} />}
      {view === "edit" && (
        <UpdateDokter data={editData} onSuccess={() => setView("list")} />
      )}
    </div>
  );
}
