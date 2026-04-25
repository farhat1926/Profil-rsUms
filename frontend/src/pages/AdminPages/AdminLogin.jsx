import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // Memanggil URL API dari file .env Vite
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      // Menggunakan API_URL secara dinamis
      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // Mengecek apakah respons dari backend berstatus sukses (HTTP 200-299)
      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
      } else {
        // Menampilkan pesan error dari backend jika ada, atau pesan bawaan
        setErrorMsg(data.message || "Login gagal, periksa kembali data Anda.");
      }
    } catch (err) {
      setErrorMsg("Koneksi ke server gagal. Pastikan server menyala.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border-t-4 border-green-600">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-500">RS UMS A.R. Fachrudin</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
