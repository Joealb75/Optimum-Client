import { useState, useEffect } from "react";
import { getAllArticles, getAllTags } from "../../../data-services/article_data.js";
import { ArticleCard } from "./ArticleCard.jsx";
import { useCurrentUser } from "../../../TSQ_hooks/useCurrentUser.js";
import { UseGetOfficeUserById } from "../../../TSQ_hooks/useGetOfficeUserById.js";

export const LatestArticles = () => {
  const { currentUser } = useCurrentUser();
  const { data: officeUser, isLoading: officeUserLoading } = UseGetOfficeUserById(currentUser);

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

  if (loading || officeUserLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading articles: {error.message}</div>;
  }

  const filteredArticles = selectedTag === "All"
    ? articles
    : articles.filter(article => article.tags.includes(parseInt(selectedTag)));

  const userFilteredArticles = officeUser?.isAdmin
    ? filteredArticles
    : filteredArticles.filter(article => article.user === currentUser.id);

  const sortedArticles = userFilteredArticles.sort(
    (article1, article2) =>
      new Date(article2.created_date) - new Date(article1.created_date)
  );

  return (
    <section className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {officeUser?.isAdmin ? "Latest Articles" : "My Articles"}
        </h1>
        <div className="flex items-center space-x-4">
        <a
            className="inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-[#228B22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#228B22]"
            href="/article-new"
          >
            New Article
          </a>
          <a
            className="inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-[#228B22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#228B22]"
            href="/articles-all"
          >
            View All
          </a>
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
      </div>
      <div className="flex overflow-x-auto space-x-4">
        {sortedArticles && sortedArticles.length > 0 ? (
          sortedArticles.map((article) => (
            <div key={article.id} className="min-w-[300px]">
              <ArticleCard article={article} />
            </div>
          ))
        ) : (
          <p>No articles available</p>
        )}
      </div>
    </section>
  );
};
