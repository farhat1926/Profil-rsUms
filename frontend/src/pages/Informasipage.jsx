import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const InformasiPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState(["Semua"]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/informasi`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        const uniqueCategories = [
          "Semua",
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      });
  }, []);

  const filteredArticles =
    selectedCategory === "Semua"
      ? articles
      : articles.filter((item) => item.category === selectedCategory);

  // Fungsi untuk memformat tanggal ke format Indonesia
  const formatTanggal = (tanggal) => {
    if (!tanggal) return "";
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      {/* ================= HERO HEADER SECTION ================= */}
      <section className="relative w-full h-[160px] md:h-[220px] bg-[#5aa1db]/90 flex flex-col justify-center items-center text-center px-4 overflow-hidden shadow-inner">
        <img
          src="/images/banner-web.png"
          alt="Banner Informasi"
          className="absolute inset-0 w-full h-full object-cover z-10 mix-blend-multiply opacity-20"
        />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 md:mb-3 drop-shadow-md">
            Informasi & Artikel
          </h1>
          <p className="text-white font-medium text-sm md:text-base max-w-2xl mx-auto drop-shadow-sm">
            Dapatkan berita terbaru, tips kesehatan terkini, dan informasi
            kegiatan di RS UMS A.R. Fachrudin.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium transition ${
                selectedCategory === cat
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 shadow-sm hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid ditambahkan items-stretch agar tinggi card sama rata */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredArticles.map((article) => (
            <Link
              to={`/informasi/${article.id}`}
              key={article.id}
              // Tambahkan h-full agar card memenuhi tinggi grid
              className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full"
            >
              {/* Box Gambar Terkunci Rasio 16:9 */}
              <div className="w-full aspect-video bg-gray-100 overflow-hidden border-b border-gray-100">
                <img
                  src={`${API_URL}${article.image}`}
                  // object-cover memastikan gambar memenuhi box 16:9 secara penuh
                  className="w-full h-full object-cover"
                  alt={article.title}
                />
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">
                  {article.category}
                </p>
                <h2 className="text-xl font-bold text-gray-800 leading-tight line-clamp-2">
                  {article.title}
                </h2>

                <p className="text-gray-600 mt-3 line-clamp-3 text-justify text-sm">
                  {article.summary}
                </p>

                {/* mt-auto memastikan bagian tanggal/penulis selalu terdorong ke paling bawah card */}
                <p className="text-xs text-gray-400 mt-auto pt-4 flex items-center gap-2 border-t border-gray-50">
                  <span className="font-medium text-gray-600">
                    {article.author}
                  </span>{" "}
                  • <span>{formatTanggal(article.date)}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InformasiPage;
