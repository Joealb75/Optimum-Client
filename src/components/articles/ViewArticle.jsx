import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleByID } from "../../data-services/article_data.js";
import { getUserByID, getAllOfficeUsers_noToken } from "../../data-services/user_data.js";
import { SiteNavBar } from "../homepage/siteNavBar.jsx";
import { ArticleUserCard } from "./ArticleUserCard.jsx";

export const ViewArticle = () => {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [user, setUser] = useState(null);
    const [officeUser, setOfficeUser] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const fetchedArticle = await getArticleByID(articleId);
                setArticle(fetchedArticle);

                const userInfo = await getUserByID(fetchedArticle.user);
                setUser(userInfo);

                const officeUsers = await getAllOfficeUsers_noToken();
                const matchedOfficeUser = officeUsers.find(officeUser => officeUser.user === userInfo.id);
                setOfficeUser(matchedOfficeUser);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle();
    }, [articleId]);

    if (!article || !user || !officeUser) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <SiteNavBar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {article.image && (
                    <div className="flex justify-center mb-8">
                        <img src={article.image} alt={article.title} className="w-full max-w-4xl object-cover rounded-lg shadow-md py-6" />
                    </div>
                )}
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{article.title}</h1>
                <div className="mb-4">
                    <ArticleUserCard user={user} officeUser={officeUser} />
                </div>
                <div>
                    <div className="text-lg text-gray-700" dangerouslySetInnerHTML={{ __html: article.article_content }} />
                </div>
            </div>
        </>
    );
};

