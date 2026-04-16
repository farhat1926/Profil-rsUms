export const fetchArticles = async () => {
  const res = await fetch("http://localhost:3001/informasi");

  if (!res.ok) {
    throw new Error("Gagal mengambil data artikel");
  }

  return await res.json();
};

export const fetchArticleById = async (id) => {
  const res = await fetch(
    `http://localhost:3001/informasi/${id}`
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