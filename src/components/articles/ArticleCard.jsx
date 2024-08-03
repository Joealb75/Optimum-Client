import { useState, useEffect } from "react";
import { getUserByID } from "../../data-services/user_data.js";
import { getAllTags } from "../../data-services/article_data.js"; 

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

    const shortContent = `${article.article_content.substring(0, 75)}...`;

    return (
        <div className="mb-8">
            <a href={`/articles/${article.id}`} target="_blank" className="block hover:bg-gray-100 p-4 rounded-lg">
                <div className="flex items-start">
                    <img src={article.image} alt={article.title} className="w-24 h-24 object-cover mr-4 rounded-lg shadow-md" />
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 hover:text-[#B87333] flex items-center">
                            {article.title}
                            <div className="flex ml-2">
                                {tags.map(tag => (
                                    <span key={tag.id} className="px-2 py-1 ml-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                                        {tag.tag}
                                    </span>
                                ))}
                            </div>
                        </h2>
                        <p className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: shortContent }} />
                        {user && (
                            <p className="mt-2 text-gray-500">
                                Writer: {user.first_name} {user.last_name}
                            </p>
                        )}
                    </div>
                </div>
            </a>
            <hr className="border-t border-gray-300 my-4" />
        </div>
    );
};


