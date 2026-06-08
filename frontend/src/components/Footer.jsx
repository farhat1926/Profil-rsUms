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
          <div>
            <p className="font-semibold text-white tracking-wider mb-1 mt-2">
              C.A.R.E
            </p>
            <p className="text-sm text-gray-300">
              Compassion • Accuracy • Responsibility • Empathy
            </p>
          </div>
        </div>

        {/* Menu */}
        <div>
          <h3 className="font-semibold mb-3">Menu</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>
              <a href="/">Beranda</a>
            </li>
            <li>
              <a href="/profil">Profil</a>
            </li>
            <li>
              <a href="/fasilitas">Fasilitas</a>
            </li>
            <li>
              <a href="/dokter">Dokter</a>
            </li>
            <li>
              <a href="/informasi">Informasi</a>
            </li>
            <li>
              <a href="/promo">Promo</a>
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
            <li>
              📍 Jl. Adi Sucipto No.167, Karangasem, Kec. Laweyan, Kota
              Surakarta, Jawa Tengah 57145
            </li>
            <li>📞 +62 851-6979-9799</li>
            <li>✉️ humas@rs.ums.id</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-green-700 mt-5 pt-4 text-center text-sm text-gray-300 space-y-2">
        <p>© 2025 RS UMS A.R. Fachrudin. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
