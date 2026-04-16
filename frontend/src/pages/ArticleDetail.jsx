import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../data/articles";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

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
    return (
      <div className="p-10 text-center">
        Memuat artikel...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <img
          src={`http://localhost:3001${article.image}`}
          alt={article.title}
          className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
        />

        <h1 className="text-4xl font-bold mt-8 text-green-600">
          {article.title}
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          {article.author} • {article.date}
        </p>

        <p className="text-gray-600 mt-4 text-lg">
          {article.summary}
        </p>

        <div className="mt-6 text-gray-700 leading-8 text-lg whitespace-pre-line">
          {article.content}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;