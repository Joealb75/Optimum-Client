import { SiteNavBar } from "../homepage/siteNavBar.jsx";
import article_main_image from '/src/assets/article/article_main_image.svg';


const articles = [
    {
        id: 1,
        title: "Men's Health Month – Most Common Health Concerns",
        image: "https://www.afcurgentcare.com/wp-content/uploads/2024/05/Screenshot-2024-05-29-203331.png",
        content: "Men's Health Month focuses on raising awareness about the most common health concerns affecting men. Key issues include cardiovascular diseases, which are the leading cause of death among men, and prostate cancer, which is one of the most prevalent cancers in men. Mental health is also a significant concern, with men often being less likely to seek help for conditions like depression and anxiety. Additionally, diabetes and obesity are growing health challenges that can lead to severe complications if not managed properly."
    },
    {
        id: 2,
        title: "Understanding the Benefits of Regular Exercise",
        image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*g6S1zi7I0DTwpuARipkqkw.jpeg",
        content: "Regular exercise is essential for maintaining good health. It helps in reducing the risk of chronic diseases, improving mental health, and enhancing overall quality of life. This article delves into the various benefits of incorporating regular exercise into your daily routine."
    },

];

export const ArticleHome = () => {

    return (
        <>
            <SiteNavBar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="hero-image mb-8" style={{ backgroundImage: `url(${article_main_image})`, height: '400px', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <hr className="border-t border-gray-300 my-4" />
                <div className="container mx-auto p-4">
                    {articles.map((article) => (
                        <div key={article.id} className="mb-8">
                            <a href={`/articles/${article.title}`} target="_blank" className="block hover:bg-gray-100 p-4 rounded-lg">
                                <div className="flex items-start">
                                    <img src={article.image} alt={article.title} className="w-24 h-24 object-cover mr-4 rounded-lg shadow-md" />
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 hover:text-[#B87333]">
                                            {article.title}
                                        </h2>
                                        <p className="mt-2 text-gray-700">{article.content.substring(0, 250)}...</p>
                                    </div>
                                </div>
                            </a>
                            <hr className="border-t border-gray-300 my-4" />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};



