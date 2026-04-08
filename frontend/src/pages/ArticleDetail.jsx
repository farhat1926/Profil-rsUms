import React from "react";
import { useParams } from "react-router-dom";
import { articles } from "../data/articles";

const ArticleDetail = () => {
  const { id } = useParams();

  const article = articles.find(
    (item) => item.id === Number(id)
  );

  if (!article) {
    return <h1>Artikel tidak ditemukan</h1>;
  }

  return (
    <section className="px-8 py-12 max-w-4xl mx-auto">
      <img
        src={article.image}
        className="w-full h-96 object-cover rounded-2xl"
      />

      <p className="text-green-600 mt-6">
        {article.category}
      </p>

      <h1 className="text-4xl font-bold mt-3">
        {article.title}
      </h1>

      <p className="text-gray-500 mt-2">
        {article.author} • {article.date}
      </p>

      <div className="mt-8 text-lg leading-8 text-gray-700">
        {article.content}
      </div>
    </section>
  );
};

export default ArticleDetail;