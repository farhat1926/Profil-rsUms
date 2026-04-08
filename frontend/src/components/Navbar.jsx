import React, { useState } from "react";
import {
  Phone,
  MapPin,
  Menu,
  X,
  Clock3,
  ChevronRight,
} from "lucide-react";
import logo from "/logo.png";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
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
      {/* TOP HEADER */}
      <div className="bg-gradient-to-r from-green-50 via-white to-blue-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              className="w-14 h-14 object-contain"
            />
            <div>
              <h1 className="text-green-700 font-bold text-xl leading-tight">
                Rumah Sakit
              </h1>
              <p className="text-blue-700 font-bold text-lg">
                UMS A.R. Fachrudin
              </p>
            </div>
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

      {/* MENU */}
      <nav className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="hidden lg:flex items-center gap-8 py-4 font-medium">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative hover:text-yellow-200 transition ${
                  location.pathname === item.path
                    ? "text-yellow-300"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* MOBILE MENU */}
          {open && (
            <div className="lg:hidden flex flex-col py-4 gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center justify-between border-b border-white/20 pb-2"
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