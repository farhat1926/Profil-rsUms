import React, { useState } from "react";
import { Link } from "react-router-dom";
import { categories, articles } from "../data/articles";

const InformasiPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredArticles =
    selectedCategory === "Semua"
      ? articles
      : articles.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <section className="px-8 py-12 bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-bold mb-8">Informasi</h1>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm ${
              selectedCategory === cat
                ? "bg-green-500 text-white"
                : "bg-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article List */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <Link
            to={`/informasi/${article.id}`}
            key={article.id}
            className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={article.image}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">
              <p className="text-sm text-green-600">
                {article.category}
              </p>

              <h2 className="text-xl font-bold mt-2">
                {article.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {article.summary}
              </p>

              <p className="text-sm mt-3">
                {article.author} • {article.date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default InformasiPage;