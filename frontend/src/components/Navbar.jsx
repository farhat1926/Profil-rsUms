import React, { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import logo from "/UMS.png";
import { Link, useLocation } from "react-router-dom";
import { Phone, MapPin, Clock3 } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [doctorDropdown, setDoctorDropdown] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Beranda", path: "/" },
    { name: "Fasilitas", path: "/fasilitas" },
    { name: "Dokter", path: "/dokter" },
    { name: "Hubungi Kami", path: "/contact" },
    { name: "Pengaduan", path: "/complaint" },
    { name: "Informasi", path: "/informasi" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">

      {/* HEADER LOGO SAJA (TANPA MENU) */}
    <div className="bg-gradient-to-r from-green-50 via-white to-blue-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              className="w-70 h-14 object-contain"
            />
          </Link>

          {/* CONTACT INFO */}
          <div className="hidden lg:flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Phone size={18} className="text-green-600" />
              <span>(62 - 0888 088 880)</span>
            </div>

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <MapPin size={18} className="text-blue-600" />
              <span>Jl. Adi Sucipto No.167, Surakarta</span>
            </div>

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Clock3 size={18} className="text-green-600" />
              <span>24 Jam</span>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* NAVBAR HIJAU (UTAMA) */}
      <nav className="bg-[#6DB23F] text-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8 py-4 font-medium">

            {menuItems.map((item) =>
              item.name === "Dokter" ? (
                <div key={item.path} className="relative">
                  <button
                    onClick={() => setDoctorDropdown(!doctorDropdown)}
                    className="hover:text-yellow-200"
                  >
                    Dokter ▼
                  </button>

                  {doctorDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-52 bg-white text-black rounded-lg shadow-lg">
                      <Link
                        to="/meet-the-doctor"
                        className="block px-4 py-3 hover:bg-gray-100"
                        onClick={() => setDoctorDropdown(false)}
                      >
                        Meet the Doctor
                      </Link>

                      <Link
                        to="/JadwalDokter"
                        className="block px-4 py-3 hover:bg-gray-100"
                        onClick={() => setDoctorDropdown(false)}
                      >
                        Jadwal Dokter
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`hover:text-yellow-200 ${
                    location.pathname === item.path
                      ? "text-yellow-300"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* MOBILE MENU */}
          {open && (
            <div className="lg:hidden flex flex-col py-4 gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex justify-between border-b border-white/20 pb-2"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                  <ChevronRight size={18} />
                </Link>
              ))}
            </div>
          )}

        </div>
      </nav>
    </header>
  );
}

export default Navbar;