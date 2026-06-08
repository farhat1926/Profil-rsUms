import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchArticleById } from "../data/articles";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const data = await fetchArticleById(id);
        setArticle(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadDetail();
  }, [id]);

  if (!article) {
    return <div className="p-10 text-center">Memuat artikel...</div>;
  }

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
    <div className="min-h-screen bg-white py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/informasi"
          className="inline-block mb-6 text-green-600 hover:text-green-700 hover:underline font-medium transition-colors cursor-pointer"
        >
          &larr; Kembali ke halaman informasi
        </Link>

        {/* ================= BAGIAN GAMBAR 16:9 CINEMATIC ================= */}
        <div className="relative w-full aspect-video rounded-2xl shadow-lg overflow-hidden border border-gray-100 bg-gray-900 flex items-center justify-center">
          {/* 1. Gambar Background Blur (Mengisi ruang yang kosong) */}
          <img
            src={`${API_URL}${article.image}`}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-60 scale-110"
          />

          {/* 2. Gambar Utama (Pas 100% tanpa terpotong) */}
          <img
            src={`${API_URL}${article.image}`}
            alt={article.title}
            className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
        {/* ================================================================ */}

        <h1 className="text-4xl font-bold mt-8 text-green-600">
          {article.title}
        </h1>

        <p className="text-sm text-gray-500 mt-3 border-b border-gray-100 pb-4">
          <span className="font-semibold text-gray-600">{article.author}</span>{" "}
          • {formatTanggal(article.date)}
        </p>

        <p className="text-gray-600 mt-5 text-lg font-medium">
          {article.summary}
        </p>

        {/* Pemecah paragraf dan penerapan rata kanan-kiri (text-justify) */}
        <div className="mt-6 text-gray-700 leading-8 text-lg text-justify space-y-5">
          {article.content
            ?.split("\n")
            .map((paragraf, index) =>
              paragraf.trim() !== "" ? <p key={index}>{paragraf}</p> : null,
            )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
