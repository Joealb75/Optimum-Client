import { useState, useEffect } from "react";
import { getAllArticles } from "../../data-services/article_data.js";
import { ArticleCard } from "./ArticleCard.jsx";

export const LatestArticleHome = () => {
  const [latestArticle, setLatestArticle] = useState(null);

  useEffect(() => {
    const fetchLatestArticle = async () => {
      try {
        const fetchedArticles = await getAllArticles();
        const approvedArticles = fetchedArticles.filter(article => article.adminApproved); 
        const sortedArticles = approvedArticles.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
        if (sortedArticles.length > 0) {
          setLatestArticle(sortedArticles[0]);
        }
      } catch (error) {
        console.error('Error fetching latest article:', error);
      }
    };

    fetchLatestArticle();
  }, []);

  return (
    <>
        <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Our Latest Article</h2>
        {latestArticle ? (
            <ArticleCard article={latestArticle} />
        ) : (
            <p>No latest article available</p>
        )}
        </div>
    </>
  );
};
