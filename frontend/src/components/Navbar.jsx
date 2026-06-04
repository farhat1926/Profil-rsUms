import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight, Phone, MapPin, Clock3 } from "lucide-react";
import logo from "/UMS.png";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  const [doctorDropdown, setDoctorDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  // 1. Menyiapkan 'ref' untuk mendeteksi klik di menu Dokter dan Profil
  const doctorRef = useRef(null);
  const profileRef = useRef(null);

  // 2. Logika untuk menutup dropdown jika klik di luar area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (doctorRef.current && !doctorRef.current.contains(event.target)) {
        setDoctorDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };

    // Menambahkan pendengar (listener) ke seluruh layar
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logika Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(false);
      } else if (window.scrollY < 50) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
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
    <header className="w-full sticky top-0 z-50 drop-shadow-sm">
      {/* HEADER PUTIH */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isVisible ? "max-h-[150px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-r from-green-50 via-white to-blue-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="logo" className="w-80 h-20 object-contain" />
            </Link>

            {/* CONTACT INFO */}
            <div className="hidden lg:flex items-center gap-5 text-sm">
              {/* IGD */}
              <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full shadow-sm border border-red-100 animate-pulse">
                <Phone size={18} className="text-red-600" />
                <div className="flex flex-col leading-tight">
                  <span className="text-[11px] font-bold text-red-600">
                    IGD 24 JAM
                  </span>
                  <span className="font-bold text-gray-700">085113055755</span>
                </div>
              </div>

              {/* ALAMAT */}
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-50">
                <MapPin size={18} className="text-blue-600" />
                <span className="font-medium text-gray-700">
                  Jl. Adi Sucipto No.167, Surakarta
                </span>
              </div>

              {/* JAM */}
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-50">
                <Clock3 size={18} className="text-green-600" />
                <span className="font-medium text-gray-700">24 Jam</span>
              </div>
            </div>

            {/* MOBILE BUTTON */}
            <button
              className="lg:hidden text-gray-700 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="bg-[#175e97] border-b-5 border-[#96d649] text-white shadow-md relative z-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center justify-center w-full gap-8 py-3 font-bold">
            {menuItems.map((item) =>
              item.name === "Dokter" ? (
                // Tambahkan 'ref' kesini
                <div key={item.path} className="relative" ref={doctorRef}>
                  <button
                    onClick={() => setDoctorDropdown(!doctorDropdown)}
                    // 3. Efek Hover Blok Hijau (#96d649)
                    className={`px-4 py-2 rounded-lg focus:outline-none transition-colors cursor-pointer flex items-center ${
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
                // Tambahkan 'ref' kesini
                <div key={item.path} className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    // Efek Hover Blok
                    className={`px-4 py-2 rounded-lg focus:outline-none transition-colors cursor-pointer flex items-center ${
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
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  // Efek Hover Blok untuk menu biasa
                  className={`px-5 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-[#96d649] text-white shadow-inner" // Warna blok aktif jika sedang di halaman tersebut
                      : "hover:bg-[#96d649] hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>

          {/* MOBILE MENU (Dibiarkan tetap sama sesuai struktur Anda) */}
          {open && (
            <div className="lg:hidden flex flex-col py-4 gap-4">
              {/* INFO MOBILE */}
              <div className="flex flex-col gap-3 border-b border-white/20 pb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={16} />
                  <span>0851-2997-2996</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-red-200 font-bold">
                  <Phone size={16} />
                  <span>IGD 24 JAM : 085113055755</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={16} />
                  <span>Jl. Adi Sucipto No.167, Surakarta</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock3 size={16} />
                  <span>24 Jam</span>
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
                        className="pl-4 text-sm text-yellow-100 hover:text-white"
                        onClick={() => {
                          setOpen(false);
                          setProfileDropdown(false);
                        }}
                      >
                        Visi & Misi
                      </Link>
                      <Link
                        to="/struktur-organisasi"
                        className="pl-4 text-sm text-yellow-100 hover:text-white"
                        onClick={() => {
                          setOpen(false);
                          setProfileDropdown(false);
                        }}
                      >
                        Struktur Organisasi
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
                        className="pl-4 text-sm text-yellow-100 hover:text-white"
                        onClick={() => {
                          setOpen(false);
                          setDoctorDropdown(false);
                        }}
                      >
                        Profil Dokter
                      </Link>
                      <Link
                        to="/JadwalDokter"
                        className="pl-4 text-sm text-yellow-100 hover:text-white"
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
    </header>
  );
}

export default Navbar;
