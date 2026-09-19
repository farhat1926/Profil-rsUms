import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ArticleDetail = () => {
  const { id: slugParam } = useParams();

  const [article, setArticle] = useState(null);
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const buatSlug = (teks) => {
    if (!teks) return "";
    return teks
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadDetail = async () => {
      try {
        const res = await fetch(`${API_URL}/informasi`);
        const allArticles = await res.json();

        const data = allArticles.find(
          (item) => buatSlug(item.title) === slugParam,
        );

        if (data) {
          setArticle(data);

          const recommendations = allArticles
            .filter(
              (item) => item.category === data.category && item.id !== data.id,
            )
            .slice(0, 4);

          const latest = allArticles
            .filter((item) => item.id !== data.id)
            .slice(0, 4);

          setRecommendedArticles(recommendations);
          setLatestArticles(latest);

          const viewedKey = `viewed_article_${data.id}`;
          if (!sessionStorage.getItem(viewedKey)) {
            fetch(`${API_URL}/informasi/${data.id}/views`, { method: "PATCH" })
              .then(() => sessionStorage.setItem(viewedKey, "true"))
              .catch((err) => console.error("Gagal mencatat tayangan:", err));
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (slugParam) {
      loadDetail();
    }
  }, [slugParam, API_URL]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!article) {
    return (
      <div className="p-10 text-center font-medium text-gray-500 min-h-screen flex items-center justify-center">
        Memuat artikel atau artikel tidak ditemukan...
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

  const shareUrl = window.location.href;
  const shareTitle = article.title;

  return (
    <>
      <Helmet>
        <title>{article.title} - RS UMS A.R. Fachrudin</title>
        <meta name="description" content={article.summary} />
        <meta property="og:title" content={`${article.title} - RS UMS`} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:image" content={`${API_URL}${article.image}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

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

          {/* ================= BAGIAN SHARE SOSIAL MEDIA (DENGAN NAMA) ================= */}
          <div className="mt-12 py-8 border-y border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <span className="text-gray-700 font-bold text-lg whitespace-nowrap">
              Bagikan artikel ini:
            </span>
            {/* Ditambahkan flex-wrap agar rapi di HP */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Tombol WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + "\n\nBaca selengkapnya di: " + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-green-50 text-green-600 hover:bg-green-500 hover:text-white rounded-full transition-all duration-300 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span className="text-sm font-semibold">WhatsApp</span>
              </a>

              {/* Tombol Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full transition-all duration-300 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="text-sm font-semibold">Facebook</span>
              </a>

              {/* Tombol Twitter/X */}
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-sky-50 text-sky-500 hover:bg-sky-500 hover:text-white rounded-full transition-all duration-300 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="text-sm font-semibold">Twitter</span>
              </a>

              {/* Tombol Telegram */}
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-full transition-all duration-300 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                <span className="text-sm font-semibold">Telegram</span>
              </a>

              {/* Tombol Salin Tautan */}
              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 shadow-sm cursor-pointer ${
                  isCopied
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-600 hover:text-white"
                }`}
              >
                {isCopied ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                )}
                <span className="text-sm font-semibold">
                  {isCopied ? "Tersalin!" : "Salin Link"}
                </span>
              </button>
            </div>
          </div>
          {/* ============================================================= */}

          <div className="mt-12 pt-10 flex flex-col gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-7 bg-green-500 rounded-full"></span>
                Artikel Terkait
              </h3>
              {recommendedArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendedArticles.map((item) => (
                    <Link
                      to={`/artikel/${buatSlug(item.title)}`}
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

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-7 bg-blue-500 rounded-full"></span>
                Artikel Terbaru
              </h3>
              {latestArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {latestArticles.map((item) => (
                    <Link
                      to={`/artikel/${buatSlug(item.title)}`}
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
