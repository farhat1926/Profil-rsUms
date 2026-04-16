import React from "react";
import { Link } from "react-router-dom";
import { HeartPulse, User, Lock, Mail } from "lucide-react";

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50">

      {/* CARD REGISTER */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="bg-green-100 p-3 rounded-full">
              <HeartPulse className="text-green-600" size={28} />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Daftar Akun Pasien
          </h1>
          <p className="text-sm text-gray-500">
            Silakan isi data untuk membuat akun
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-4">

          {/* NAMA */}
          <div>
            <label className="text-sm text-gray-600">Nama Lengkap</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
              <User size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                className="w-full outline-none px-2"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                placeholder="Masukkan email"
                className="w-full outline-none px-2"
              />
            </div>
          </div>

          {/* USERNAME */}
          <div>
            <label className="text-sm text-gray-600">Username</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
              <User size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Buat username"
                className="w-full outline-none px-2"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
              <Lock size={18} className="text-gray-400" />
              <input
                type="password"
                placeholder="Buat password"
                className="w-full outline-none px-2"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Daftar
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;