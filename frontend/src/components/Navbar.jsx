import React, { useState } from "react";
import { Phone, MapPin, ChevronDown, Menu, X } from "lucide-react";
import logo from "/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full shadow-sm">
      {/* Top Header */}
      <div className="bg-green-50 px-4 md:px-8 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} className="w-12 h-12 md:w-14 md:h-14" />
          <div>
            <h1 className="text-green-700 font-bold text-sm md:text-xl">
              Rumah Sakit
            </h1>
            <p className="text-blue-700 font-bold text-xs md:text-lg">
              UMS A.R. Fachrudin
            </p>
          </div>
        </div>

        {/* Desktop Contact */}
        <div className="hidden md:flex items-center gap-10 text-sm">
          <div className="flex items-center gap-2">
            <Phone size={18} className="text-green-600" />
            <span>(62 - 0888 088 880)</span>
          </div>

          <div className="flex items-center gap-2 max-w-sm">
            <MapPin size={18} className="text-green-600" />
            <span className="text-xs">
              Jl. Adi Sucipto No.167, Surakarta
            </span>
          </div>
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          {open ? (
            <X onClick={() => setOpen(false)} />
          ) : (
            <Menu onClick={() => setOpen(true)} />
          )}
        </div>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex bg-white px-8 py-5 gap-10 font-medium">
        <a href="/">Beranda</a>
        <Link to="/fasilitas">Fasilitas</Link>
        <Link to="/dokter">Dokter</Link>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-6 py-4 flex flex-col gap-4">
          <a href="/">Beranda</a>
          <Link to="/fasilitas">Fasilitas</Link>
          <Link to="/dokter">Dokter</Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;