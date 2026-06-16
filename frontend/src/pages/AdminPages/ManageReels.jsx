import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function ManageReels() {
  const [link, setLink] = useState("");
  const [reelsList, setReelsList] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchReels = async () => {
    try {
      const res = await fetch(`${API_URL}/reels`);
      const data = await res.json();
      setReelsList(data);
    } catch (err) {
      console.error("Gagal mengambil data reels:", err);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Otomatis memperbaiki link profil menjadi link embed
    let formattedLink = link.split("?")[0];
    if (!formattedLink.endsWith("embed") && !formattedLink.endsWith("embed/")) {
      formattedLink = formattedLink.endsWith("/")
        ? `${formattedLink}embed`
        : `${formattedLink}/embed`;
    }

    try {
      const res = await fetch(`${API_URL}/reels`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: formattedLink }),
      });
      const data = await res.json();

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: data.message,
        confirmButtonColor: "#0f2a4a",
      });

      setLink("");
      fetchReels();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menyimpan link Reels!",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Hapus Link?",
      text: "Reels ini tidak akan tayang lagi di Homepage.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`${API_URL}/reels/${id}`, { method: "DELETE" });
          Swal.fire("Terhapus!", "Link berhasil dihapus.", "success");
          fetchReels();
        } catch (err) {
          console.error(err);
        }
      }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Input Instagram Reels
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Masukkan URL dari postingan Reels Instagram Rumah Sakit yang ingin
          ditampilkan di Beranda.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
          <div>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Contoh: https://www.instagram.com/reel/C_NAME_VIDEO/"
              className="w-full border p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
            <p className="text-xs text-blue-600 mt-2 font-medium">
              *Tips: Buka video Reels di Instagram, klik Bagikan, lalu klik
              "Salin Tautan".
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0f2a4a] hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md mt-4"
          >
            Tambahkan ke Beranda
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          Daftar Reels yang Aktif
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reelsList.length > 0 ? (
            reelsList.map((reel) => (
              <div
                key={reel.id}
                className="relative bg-gray-50 p-2 rounded-xl border border-gray-200"
              >
                <button
                  onClick={() => handleDelete(reel.id)}
                  className="absolute -top-3 -right-3 z-10 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full shadow-md flex items-center justify-center font-bold transition-transform hover:scale-110 cursor-pointer"
                >
                  ✕
                </button>
                <iframe
                  src={reel.link}
                  width="100%"
                  height="380"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency="true"
                  className="rounded-lg bg-white pointer-events-none"
                ></iframe>
              </div>
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center py-6">
              Belum ada video Reels yang ditambahkan.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
