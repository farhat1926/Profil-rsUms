import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Search } from "lucide-react"; // Import ikon search
import EditPage from "./EditPage";
import UpdateDokter from "./UpdateDokter";

export default function ManageDokter() {
  const [view, setView] = useState("list");
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);

  // State untuk pencarian
  const [searchQuery, setSearchQuery] = useState("");

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

  // ==================== LOGIKA FILTER & PENGELOMPOKAN ====================
  // 1. Filter data berdasarkan pencarian (nama atau spesialis)
  const filteredData = data.filter(
    (dokter) =>
      dokter.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dokter.spesialis.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 2. Kelompokkan data yang sudah difilter berdasarkan spesialis
  const groupedBySpesialis = filteredData.reduce((acc, dokter) => {
    const spesialis = dokter.spesialis || "Spesialis Lainnya";
    if (!acc[spesialis]) {
      acc[spesialis] = [];
    }
    acc[spesialis].push(dokter);
    return acc;
  }, {});
  // =======================================================================

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
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
        <>
          {/* ================= KOTAK PENCARIAN ================= */}
          <div className="mb-6 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari nama dokter atau spesialis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/2 pl-12 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
            />
          </div>

          {/* ================= TABEL BERDASARKAN SPESIALIS ================= */}
          {Object.keys(groupedBySpesialis).length > 0 ? (
            <div className="space-y-8">
              {Object.entries(groupedBySpesialis).map(
                ([spesialis, dokters]) => (
                  <div
                    key={spesialis}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    {/* Header Spesialis */}
                    <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center gap-3">
                      <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                      <h3 className="font-extrabold text-gray-800 text-lg uppercase tracking-wide">
                        {spesialis}
                      </h3>
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md ml-2">
                        {dokters.length} Dokter
                      </span>
                    </div>

                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white border-b border-gray-100">
                          <th className="px-6 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider w-[40%]">
                            Profil Dokter
                          </th>
                          <th className="px-6 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider w-[40%]">
                            Jadwal Praktek
                          </th>
                          <th className="px-6 py-3 font-bold text-gray-500 text-xs uppercase tracking-wider text-center w-[20%]">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {dokters.map((dokter) => (
                          <tr
                            key={dokter.id}
                            className="hover:bg-blue-50/20 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <img
                                  src={dokter.img}
                                  alt={dokter.nama}
                                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm shrink-0"
                                  onError={(e) =>
                                    (e.target.src = "/default-doctor.jpg")
                                  }
                                />
                                <div>
                                  <p className="font-bold text-gray-900 leading-tight">
                                    {dokter.nama}
                                  </p>
                                  <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                                    {dokter.deskripsi || "Tidak ada deskripsi"}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                {Object.entries(dokter.jadwal).length > 0 ? (
                                  Object.entries(dokter.jadwal).map(
                                    ([hari, jam]) => (
                                      <div
                                        key={hari}
                                        className="text-xs flex items-center gap-2"
                                      >
                                        <span className="font-bold text-gray-700 w-10 uppercase tracking-wide">
                                          {hari}
                                        </span>
                                        <span className="text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded">
                                          {jam}
                                        </span>
                                      </div>
                                    ),
                                  )
                                ) : (
                                  <span className="text-xs italic text-red-400 bg-red-50 px-2 py-1 rounded">
                                    Jadwal belum diatur
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex justify-center gap-2">
                                <button
                                  onClick={() => handleEdit(dokter)}
                                  className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg transition-all font-bold text-xs border border-blue-200 shadow-sm"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(dokter.id)}
                                  className="bg-white text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition-all font-bold text-xs border border-red-200 shadow-sm"
                                >
                                  Hapus
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ),
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-gray-400" size={24} />
              </div>
              <p className="text-gray-500 font-medium">
                {searchQuery
                  ? `Tidak ada dokter dengan nama atau spesialis "${searchQuery}"`
                  : "Belum ada data dokter yang tersimpan."}
              </p>
            </div>
          )}
        </>
      )}

      {/* Kondisional Render Form Tambah & Edit */}
      {view === "add" && <EditPage onSuccess={() => setView("list")} />}
      {view === "edit" && (
        <UpdateDokter data={editData} onSuccess={() => setView("list")} />
      )}
    </div>
  );
}
