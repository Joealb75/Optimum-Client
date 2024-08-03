import { useState, useEffect } from "react";
import { getAllArticles, getAllTags } from "../../../data-services/article_data.js";
import { ArticleCard } from "./ArticleCard.jsx";

export const ViewAllArticles = () => {
    const [articles, setArticles] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      getAllArticles()
        .then((data) => {
          setArticles(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
  
      getAllTags()
        .then((data) => {
          setTags(data);
        })
        .catch((error) => {
          console.error("Error fetching tags:", error);
        });
    }, []);
  
    const handleTagFilterChange = (event) => {
      setSelectedTag(event.target.value);
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error loading articles: {error.message}</div>;
    }
  
    const filteredArticles = selectedTag === "All"
      ? articles
      : articles.filter(article => article.tags.includes(parseInt(selectedTag)));
  
    const sortedArticles = filteredArticles.sort(
      (article1, article2) =>
        new Date(article2.created_date) - new Date(article1.created_date)
    );
  
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">All Articles</h1>
          <select
            value={selectedTag}
            onChange={handleTagFilterChange}
            className="bg-gray-200 border rounded p-2"
          >
            <option value="All">All</option>
            {tags.map(tag => (
              <option key={tag.id} value={tag.id}>{tag.tag}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedArticles.length > 0 ? (
            sortedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <p>No articles available</p>
          )}
        </div>
      </div>
    );
  };