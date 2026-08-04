import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ArticleSection = () => {
  const [articleList, setArticleList] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "";
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    fetch(`${API_URL}/informasi`)
      .then((res) => res.json())
      .then((data) => {
        setArticleList(data.slice(0, 3));
      })
      .catch((err) => console.error("Gagal mengambil artikel:", err));
  }, []);

  return (
    <section
      id="artikel-terbaru"
      className="w-full py-16 bg-gray-50 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-green-600 mb-2">
            Artikel Terbaru RS UMS A.R Fachrudin{" "}
          </h2>
          <p className="text-base text-gray-600 w-full">
            Dapatkan informasi kesehatan terkini, tips medis, dan berita terbaru
            seputar pelayanan RS UMS A.R. Fachrudin.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {articleList.map((article) => (
            <Link
              to={`/informasi/${article.id}`}
              key={article.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full border border-gray-100 group"
            >
              <div className="w-full aspect-video bg-gray-100 overflow-hidden border-b border-gray-100">
                <img
                  src={`${API_URL}${article.image}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={article.title}
                  loading="lazy"
                  decoding="async"
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

        <div className="mt-12 flex justify-center">
          <Link
            to="/informasi"
            className="text-sm font-bold bg-white text-green-600 hover:text-white hover:bg-green-500 border border-green-500 px-8 py-3 rounded-full transition-colors shadow-sm"
          >
            Lihat Semua Artikel →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticleSection;
