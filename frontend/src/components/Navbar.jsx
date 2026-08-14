import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight, Phone, MapPin, Clock3 } from "lucide-react";
import logo from "/logo_rs.png";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  const [infoDropdown, setInfoDropdown] = useState(false);
  const [doctorDropdown, setDoctorDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const location = useLocation();

  // Menyiapkan 'ref' untuk mendeteksi klik di menu dropdown
  const infoRef = useRef(null);
  const doctorRef = useRef(null);
  const profileRef = useRef(null);

  // Logika untuk menutup dropdown jika klik di luar area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (doctorRef.current && !doctorRef.current.contains(event.target)) {
        setDoctorDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
      if (infoRef.current && !infoRef.current.contains(event.target)) {
        setInfoDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { name: "Beranda", path: "/" },
    { name: "Profil", path: "/profil" },
    { name: "Fasilitas", path: "/fasilitas" },
    { name: "Dokter", path: "/dokter" },
    { name: "Informasi", path: "/informasi" },
    { name: "Promo", path: "/promo" },
  ];

  return (
    <nav className="w-full sticky top-0 z-50 bg-[#175e97] border-b-4 border-[#96d649] text-white shadow-lg">
      {/* max-w-[1440px] digunakan agar navbar membentang lebih lebar dan logo makin ke pojok kiri */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        {/* py-2 digunakan agar tinggi navbar tetap slim (tidak gemuk) */}
        <div className="flex justify-between items-center py-2">
          {/* ================= 1. LOGO ================= */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            {/* Background putih dihapus. Efek scale-125 & origin-left membuat logo besar tanpa mendorong tinggi navbar */}
            <img
              src={logo}
              alt="logo"
              className="h-9 md:h-11 object-contain scale-110 md:scale-125 origin-left drop-shadow-md"
            />
          </Link>

          {/* ================= 2. DESKTOP MENU ================= */}
          <div className="hidden lg:flex items-center justify-center gap-2 xl:gap-6 font-bold text-sm xl:text-base">
            {menuItems.map((item) =>
              item.name === "Dokter" ? (
                <div key={item.path} className="relative" ref={doctorRef}>
                  <button
                    onClick={() => setDoctorDropdown(!doctorDropdown)}
                    className={`px-3 xl:px-4 py-2 rounded-lg focus:outline-none transition-colors cursor-pointer flex items-center ${
                      doctorDropdown
                        ? "bg-[#96d649] text-white shadow-inner"
                        : "hover:bg-[#96d649] hover:text-white"
                    }`}
                  >
                    Dokter ▼
                  </button>
                  {doctorDropdown && (
                    <div className="absolute top-full left-0 mt-3 w-52 bg-white text-black rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                      <Link
                        to="/meet-doctor"
                        className="block px-5 py-3 hover:bg-green-50 hover:text-green-600 font-medium transition-colors"
                        onClick={() => setDoctorDropdown(false)}
                      >
                        Profil Dokter
                      </Link>
                      <Link
                        to="/JadwalDokter"
                        className="block px-5 py-3 hover:bg-green-50 hover:text-green-600 font-medium transition-colors"
                        onClick={() => setDoctorDropdown(false)}
                      >
                        Jadwal Dokter
                      </Link>
                    </div>
                  )}
                </div>
              ) : item.name === "Profil" ? (
                <div key={item.path} className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className={`px-3 xl:px-4 py-2 rounded-lg focus:outline-none transition-colors cursor-pointer flex items-center ${
                      profileDropdown
                        ? "bg-[#96d649] text-white shadow-inner"
                        : "hover:bg-[#96d649] hover:text-white"
                    }`}
                  >
                    Profil ▼
                  </button>
                  {profileDropdown && (
                    <div className="absolute top-full left-0 mt-3 w-56 bg-white text-black rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                      <Link
                        to="/profil"
                        className="block px-5 py-3 hover:bg-green-50 hover:text-green-600 font-medium transition-colors"
                        onClick={() => setProfileDropdown(false)}
                      >
                        Visi & Misi
                      </Link>
                      <Link
                        to="/struktur-organisasi"
                        className="block px-5 py-3 hover:bg-green-50 hover:text-green-600 font-medium transition-colors"
                        onClick={() => setProfileDropdown(false)}
                      >
                        Struktur Organisasi
                      </Link>
                    </div>
                  )}
                </div>
              ) : item.name === "Informasi" ? (
                <div key={item.path} className="relative" ref={infoRef}>
                  <button
                    onClick={() => setInfoDropdown(!infoDropdown)}
                    className={`px-3 xl:px-4 py-2 rounded-lg focus:outline-none transition-colors cursor-pointer flex items-center ${
                      infoDropdown
                        ? "bg-[#96d649] text-white shadow-inner"
                        : "hover:bg-[#96d649] hover:text-white"
                    }`}
                  >
                    Informasi ▼
                  </button>
                  {infoDropdown && (
                    <div className="absolute top-full left-0 mt-3 w-52 bg-white text-black rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                      <Link
                        to="/bed"
                        className="block px-5 py-3 hover:bg-green-50 hover:text-green-600 font-medium transition-colors"
                        onClick={() => setInfoDropdown(false)}
                      >
                        Bed
                      </Link>
                      <Link
                        to="/artikel"
                        className="block px-5 py-3 hover:bg-green-50 hover:text-green-600 font-medium transition-colors"
                        onClick={() => setInfoDropdown(false)}
                      >
                        Artikel
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 xl:px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-[#96d649] text-white shadow-inner"
                      : "hover:bg-[#96d649] hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>

          {/* ================= 3. IGD & MOBILE BUTTON ================= */}
          <div className="flex items-center gap-4">
            {/* Tombol IGD (Terlihat di layar agak besar/desktop) */}
            <div className="hidden sm:flex items-center gap-2 bg-red-500 px-4 py-2 rounded-full shadow-md border-2 border-red-500 animate-pulse">
              <Phone size={18} className="text-white" />
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-bold text-red-100">
                  IGD 24 JAM
                </span>
                <span className="font-bold text-white text-xs xl:text-sm tracking-wide">
                  085113055755
                </span>
              </div>
            </div>

            {/* Tombol Menu Mobile */}
            <button
              className="lg:hidden text-white cursor-pointer hover:text-gray-200 transition-colors"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU DROPDOWN ================= */}
        {open && (
          <div className="lg:hidden flex flex-col py-4 gap-4 border-t border-[#96d649]/30 mt-2">
            {/* Info Mobile Sederhana */}
            <div className="flex flex-col gap-3 border-b border-white/20 pb-4">
              <div className="flex items-center gap-2 text-sm text-red-300 font-bold">
                <Phone size={16} />
                <span>IGD 24 JAM : 085113055755</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-200">
                <MapPin size={16} />
                <span>Jl. Adi Sucipto No.167, Surakarta</span>
              </div>
            </div>

            {menuItems.map((item) =>
              item.name === "Profil" ? (
                <div
                  key={item.path}
                  className="border-b border-white/20 pb-3 font-medium flex flex-col"
                >
                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className="flex justify-between items-center w-full cursor-pointer hover:text-yellow-200"
                  >
                    Profil
                    <ChevronRight
                      size={18}
                      className={`transition-transform ${profileDropdown ? "rotate-90" : ""}`}
                    />
                  </button>
                  <div
                    className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ${profileDropdown ? "max-h-52 mt-3 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <Link
                      to="/profil"
                      className="pl-4 text-sm text-gray-300 hover:text-white"
                      onClick={() => {
                        setOpen(false);
                        setProfileDropdown(false);
                      }}
                    >
                      Visi & Misi
                    </Link>
                    <Link
                      to="/struktur-organisasi"
                      className="pl-4 text-sm text-gray-300 hover:text-white"
                      onClick={() => {
                        setOpen(false);
                        setProfileDropdown(false);
                      }}
                    >
                      Struktur Organisasi
                    </Link>
                  </div>
                </div>
              ) : item.name === "Informasi" ? (
                <div
                  key={item.path}
                  className="border-b border-white/20 pb-3 font-medium flex flex-col"
                >
                  <button
                    onClick={() => setInfoDropdown(!infoDropdown)}
                    className="flex justify-between items-center w-full cursor-pointer hover:text-yellow-200"
                  >
                    Informasi
                    <ChevronRight
                      size={18}
                      className={`transition-transform ${infoDropdown ? "rotate-90" : ""}`}
                    />
                  </button>
                  <div
                    className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ${infoDropdown ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <Link
                      to="/bed"
                      className="pl-4 text-sm text-gray-300 hover:text-white"
                      onClick={() => {
                        setOpen(false);
                        setInfoDropdown(false);
                      }}
                    >
                      Bed
                    </Link>
                    <Link
                      to="/informasi"
                      className="pl-4 text-sm text-gray-300 hover:text-white"
                      onClick={() => {
                        setOpen(false);
                        setInfoDropdown(false);
                      }}
                    >
                      Artikel
                    </Link>
                  </div>
                </div>
              ) : item.name === "Dokter" ? (
                <div
                  key={item.path}
                  className="border-b border-white/20 pb-3 font-medium flex flex-col"
                >
                  <button
                    onClick={() => setDoctorDropdown(!doctorDropdown)}
                    className="flex justify-between items-center w-full cursor-pointer hover:text-yellow-200"
                  >
                    Dokter
                    <ChevronRight
                      size={18}
                      className={`transition-transform ${doctorDropdown ? "rotate-90" : ""}`}
                    />
                  </button>
                  <div
                    className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ${doctorDropdown ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <Link
                      to="/meet-doctor"
                      className="pl-4 text-sm text-gray-300 hover:text-white"
                      onClick={() => {
                        setOpen(false);
                        setDoctorDropdown(false);
                      }}
                    >
                      Profil Dokter
                    </Link>
                    <Link
                      to="/JadwalDokter"
                      className="pl-4 text-sm text-gray-300 hover:text-white"
                      onClick={() => {
                        setOpen(false);
                        setDoctorDropdown(false);
                      }}
                    >
                      Jadwal Dokter
                    </Link>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex justify-between items-center border-b border-white/20 pb-3 font-medium hover:text-yellow-200"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                  <ChevronRight size={18} className="opacity-70" />
                </Link>
              ),
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
