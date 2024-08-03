import { useState, useEffect } from "react";
import { getAllTags } from "../../../data-services/article_data.js";
import { getUserByID } from "../../../data-services/user_data.js";

export const ArticleCard = ({ article }) => {
  const [user, setUser] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await getUserByID(article.user);
        setUser(userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUser();
  }, [article.user]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await getAllTags();
        const articleTags = fetchedTags.filter(tag => article.tags.includes(tag.id));
        setTags(articleTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, [article.tags]);

  const shortenedContent = `${article.article_content.substring(0, 75)}...`;

  const getStatusBubble = () => {
    if (article.adminApproved === true) {
      return <span className="px-2 py-1 ml-1 mb-1 bg-green-500 text-white rounded-full text-sm">Approved</span>;
    } else if (article.adminApproved === "Pending") {
      return <span className="px-2 py-1 ml-1 mb-1 bg-yellow-500 text-white rounded-full text-sm">Pending</span>;
    } else {
      return <span className="px-2 py-1 ml-1 mb-1 bg-red-500 text-white rounded-full text-sm">Not Approved</span>;
    }
  };

  return (
    <a
      href={`/articles/${article.id}/edit`}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white border rounded-lg p-4 mb-4 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex justify-between mb-2">
        <span>
          Date: {new Date(article.created_date).toLocaleDateString()}
        </span>
      </div>
      <div className="mb-2">
        <strong>Title:</strong> {article.title}
      </div>
      <div className="mb-2">
        <strong>Author:</strong> {user ? `${user.first_name} ${user.last_name}` : "Unknown"}
      </div>
      <div className="mb-2">
        <strong>Content:</strong>
        <p dangerouslySetInnerHTML={{ __html: shortenedContent }} />
      </div>
      <div className="mb-2">
        <div className="flex flex-wrap mt-2">
          <strong>Status:</strong> {getStatusBubble()}
        </div>
      </div>
      <div className="flex flex-wrap mt-2">
        {tags.map(tag => (
          <span key={tag.id} className="px-2 py-1 ml-1 mb-1 bg-gray-200 text-gray-700 rounded-full text-sm">
            {tag.tag}
          </span>
        ))}
      </div>
    </a>
  );
};
