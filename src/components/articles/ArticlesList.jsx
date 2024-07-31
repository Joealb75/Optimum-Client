import { ArticleCard } from "./ArticleCard.jsx";

export const ArticlesList = ({ articles }) => {
    return (
        <div className="container mx-auto p-4">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
};
