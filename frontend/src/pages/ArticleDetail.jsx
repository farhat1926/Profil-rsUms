import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchArticleById } from "../data/articles";
import { Helmet } from "react-helmet-async"; // 1. IMPORT HELMET

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  // Efek memuat data artikel
  useEffect(() => {
    window.scrollTo(0, 0);

    const loadDetail = async () => {
      try {
        const data = await fetchArticleById(id);
        setArticle(data);

        const res = await fetch(`${API_URL}/informasi`);
        const allArticles = await res.json();

        const recommendations = allArticles
          .filter(
            (item) =>
              item.category === data.category && String(item.id) !== String(id),
          )
          .slice(0, 4);

        const latest = allArticles
          .filter((item) => String(item.id) !== String(id))
          .slice(0, 4);

        setRecommendedArticles(recommendations);
        setLatestArticles(latest);
      } catch (err) {
        console.error(err);
      }
    };

    loadDetail();
  }, [id, API_URL]);

  // Efek mencatat tayangan (views)
  useEffect(() => {
    const recordView = async () => {
      const viewedKey = `viewed_article_${id}`;
      if (!sessionStorage.getItem(viewedKey)) {
        try {
          await fetch(`${API_URL}/informasi/${id}/views`, { method: "PATCH" });
          sessionStorage.setItem(viewedKey, "true");
        } catch (error) {
          console.error("Gagal mencatat tayangan:", error);
        }
      }
    };

    if (id) recordView();
  }, [id, API_URL]);

  if (!article) {
    return (
      <div className="p-10 text-center font-medium text-gray-500">
        Memuat artikel...
      </div>
    );
  }

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "";
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      {/* ================= BAGIAN SEO / META TAGS DINAMIS ================= */}
      <Helmet>
        {/* Title Tab Browser & Google */}
        <title>{article.title} - RS UMS A.R. Fachrudin</title>

        {/* Meta Deskripsi Google */}
        <meta name="description" content={article.summary} />

        {/* Open Graph (Untuk share di WhatsApp, Facebook, LinkedIn, dll) */}
        <meta property="og:title" content={`${article.title} - RS UMS`} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:image" content={`${API_URL}${article.image}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      {/* ================================================================== */}

      <div className="min-h-screen bg-white py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/artikel"
            className="inline-block mb-6 text-green-600 hover:text-green-700 hover:underline font-medium transition-colors cursor-pointer"
          >
            &larr; Kembali ke halaman informasi
          </Link>

          <div className="relative w-full aspect-video rounded-2xl shadow-lg overflow-hidden border border-gray-100 bg-gray-900 flex items-center justify-center">
            <img
              src={`${API_URL}${article.image}`}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-60 scale-110"
            />
            <img
              src={`${API_URL}${article.image}`}
              alt={article.title}
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          <h1 className="text-4xl font-bold mt-8 text-green-600">
            {article.title}
          </h1>

          <p className="text-sm text-gray-500 mt-3 border-b border-gray-100 pb-4">
            <span className="font-semibold text-gray-600">
              {article.author}
            </span>{" "}
            • {formatTanggal(article.date)}
          </p>

          <p className="text-gray-600 mt-5 text-lg font-medium">
            {article.summary}
          </p>

          <div className="mt-6 text-gray-700 leading-8 text-lg text-justify space-y-5">
            {article.content
              ?.split("\n")
              .map((paragraf, index) =>
                paragraf.trim() !== "" ? <p key={index}>{paragraf}</p> : null,
              )}
          </div>

          {/* ================= BAGIAN BAWAH: REKOMENDASI & TERBARU ================= */}
          <div className="mt-20 pt-10 border-t-2 border-gray-100 flex flex-col gap-12">
            {/* --- ARTIKEL TERKAIT --- */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-7 bg-green-500 rounded-full"></span>
                Artikel Terkait
              </h3>
              {recommendedArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendedArticles.map((item) => (
                    <Link
                      to={`/artikel/${item.id}`}
                      key={item.id}
                      className="group flex flex-col sm:flex-row gap-5 bg-white p-5 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-full sm:w-36 md:w-40 h-48 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={`${API_URL}${item.image}`}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-center h-full w-full">
                        <p className="text-[11px] font-bold text-green-600 uppercase tracking-wider mb-1.5">
                          {item.category}
                        </p>
                        <h4 className="text-base lg:text-lg font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-green-600 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-400 mt-2 font-medium">
                          {formatTanggal(item.date)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  Belum ada artikel terkait di kategori ini.
                </p>
              )}
            </div>

            {/* --- ARTIKEL TERBARU --- */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-7 bg-blue-500 rounded-full"></span>
                Artikel Terbaru
              </h3>
              {latestArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {latestArticles.map((item) => (
                    <Link
                      to={`/artikel/${item.id}`}
                      key={item.id}
                      className="group flex flex-col sm:flex-row gap-5 bg-white p-5 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-full sm:w-36 md:w-40 h-48 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={`${API_URL}${item.image}`}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-center h-full w-full">
                        <p className="text-[11px] font-bold text-blue-500 uppercase tracking-wider mb-1.5">
                          {item.category}
                        </p>
                        <h4 className="text-base lg:text-lg font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-400 mt-2 font-medium">
                          {formatTanggal(item.date)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  Belum ada artikel terbaru.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
