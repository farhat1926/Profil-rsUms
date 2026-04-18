import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white px-8 py-12">
      <div className="grid md:grid-cols-4 gap-8">
        {/* Logo & Deskripsi */}
        <div>
          <h2 className="text-xl font-bold mb-3">RS UMS A.R. Fachrudin</h2>
          <p className="text-sm text-gray-200">
            Memberikan pelayanan kesehatan terbaik dengan fasilitas modern dan
            tenaga medis profesional.
          </p>
        </div>

        {/* Menu */}
        <div>
          <h3 className="font-semibold mb-3">Menu</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              <a href="#">Beranda</a>
            </li>
            <li>
              <a href="#">Profil</a>
            </li>
            <li>
              <a href="#">Fasilitas</a>
            </li>
            <li>
              <a href="#">Dokter</a>
            </li>
          </ul>
        </div>

        {/* Layanan */}
        <div>
          <h3 className="font-semibold mb-3">Layanan</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>IGD 24 Jam</li>
            <li>Rawat Inap</li>
            <li>Laboratorium</li>
            <li>Apotek</li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="font-semibold mb-3">Kontak</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>📍 Surakarta, Jawa Tengah</li>
            <li>📞 0851-2997-2996</li>
            <li>✉️ humas.rsumsarfachrudin@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-green-700 mt-8 pt-4 text-center text-sm text-gray-300">
        © 2025 RS UMS A.R. Fachrudin. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
