const API_URL = import.meta.env.VITE_API_URL;
export const fetchArticles = async () => {
  const res = await fetch(`${API_URL}/informasi`);

  if (!res.ok) {
    throw new Error("Gagal mengambil data artikel");
  }

  return await res.json();
};
export const fetchArticleById = async (id) => {
  const res = await fetch(
    `${API_URL}/informasi/${id}`
  );

  if (!res.ok) {
    throw new Error("Artikel tidak ditemukan");
  }

  return await res.json();
};

export const fetchCategories = async () => {
  const articles = await fetchArticles();

  return [
    "Semua",
    ...new Set(articles.map((item) => item.category)),
  ];
};