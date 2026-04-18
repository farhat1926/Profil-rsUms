import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Phone, MapPin, Clock3 } from "lucide-react";
import logo from "/UMS.png";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [doctorDropdown, setDoctorDropdown] = useState(false);
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 20) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Beranda", path: "/" },
    { name: "Fasilitas", path: "/fasilitas" },
    { name: "Dokter", path: "/dokter" },
    { name: "Informasi", path: "/informasi" },
    { name: "Promo", path: "/promo" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 drop-shadow-sm">
      {/* HEADER PUTIH (LOGO & KONTAK) */}
      {/* <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isVisible ? "max-h-[150px] opacity-100" : "max-h-0 opacity-0"
        }`}
      ></div> */}
      <div className="bg-gradient-to-r from-green-50 via-white to-blue-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-80 h-20 object-contain" />
          </Link>

          {/* CONTACT INFO */}
          <div className="hidden lg:flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-50">
              <Phone size={18} className="text-green-600" />
              <span className="font-medium text-gray-700">0851-2997-2996</span>
            </div>

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-50">
              <MapPin size={18} className="text-blue-600" />
              <span className="font-medium text-gray-700">
                Jl. Adi Sucipto No.167, Surakarta
              </span>
            </div>

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-50">
              <Clock3 size={18} className="text-green-600" />
              <span className="font-medium text-gray-700">24 Jam</span>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* NAVBAR HIJAU (STICKY AT TOP-0 KETIKA HEADER PUTIH COLLAPSE) */}
      <nav
        className="text-white shadow-md relative z-50"
        style={{ backgroundImage: "radial-gradient(circle, #96d649, #8aba4d)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center justify-center w-full gap-25 py-4 font-bold">
            {menuItems.map((item) =>
              item.name === "Dokter" ? (
                <div key={item.path} className="relative">
                  <button
                    onClick={() => setDoctorDropdown(!doctorDropdown)}
                    className="hover:text-yellow-200 focus:outline-none transition-colors"
                  >
                    Dokter ▼
                  </button>

                  {doctorDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-52 bg-white text-black rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <Link
                        to="/meet-doctor"
                        className="block px-5 py-3 hover:bg-green-50 hover:text-green-600 font-medium transition-colors border-b border-gray-50"
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
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`hover:text-yellow-200 transition-colors ${
                    location.pathname === item.path
                      ? "text-yellow-300 drop-shadow-md"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>

          {/* MOBILE MENU */}
          {open && (
            <div className="lg:hidden flex flex-col py-4 gap-4 animate-in slide-in-from-top-4 duration-300">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex justify-between items-center border-b border-white/20 pb-3 font-medium"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                  <ChevronRight size={18} className="opacity-70" />
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
