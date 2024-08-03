import { useState, useEffect } from "react";
import { getAllArticles, getAllTags } from "../../data-services/article_data.js";
import article_main_image from '/src/assets/article/article_main_image.svg';
import { TagsFilterBar } from "./tags/TagsFilterBar.jsx";
import { ArticlesList } from "./ArticlesList.jsx";
import { SiteNavBar } from "../homepage/siteNavBar.jsx";

export const ArticleHome = () => {
    const [articles, setArticles] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const fetchedArticles = await getAllArticles();
                const approvedArticles = fetchedArticles.filter(article => article.adminApproved); 
                const sortedArticles = approvedArticles.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
                setArticles(sortedArticles);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const fetchedTags = await getAllTags();
                setTags(fetchedTags);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchTags();
    }, []);

    const handleTagClick = async (tag) => {
        setSelectedTag(tag);
        if (tag === null) {
            const fetchedArticles = await getAllArticles();
            const approvedArticles = fetchedArticles.filter(article => article.adminApproved);
            const sortedArticles = approvedArticles.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
            setArticles(sortedArticles);
            return;
        }
        try {
            const fetchedArticles = await getAllArticles();
            const filteredArticles = fetchedArticles.filter(article => article.tags.includes(tag.id) && article.adminApproved);
            const sortedArticles = filteredArticles.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
            setArticles(sortedArticles);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    return (
        <>
            <SiteNavBar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="hero-image mb-8" style={{ backgroundImage: `url(${article_main_image})`, height: '400px', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <TagsFilterBar tags={tags} selectedTag={selectedTag} onTagClick={handleTagClick} />
                <hr className="border-t border-gray-300 my-4" />
                <ArticlesList articles={articles} />
            </div>
        </>
    );
};

