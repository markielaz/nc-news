import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { formatDate } from "./utils/api";

export default function Articles() {

    const navigate = useNavigate();

    const [articles, setArticles] = useState([]);

    const clickArticle = (article_id) => {
        navigate(`/articles/${article_id}`)
    }

    const { topic } = useParams();

    useEffect(() => {
        if (topic) {
            fetch(`https://marklaz-nc-news.herokuapp.com/api/articles?topic=${topic}`)
            .then((res) => res.json())
            .then(({articles}) => {
                setArticles(articles);
            });
        } else {
        fetch('https://marklaz-nc-news.herokuapp.com/api/articles')
            .then((res) => res.json())
            .then(({articles}) => {
                setArticles(articles);
            });
        }
    }, [topic]);

    return (
        <section className="articles-section">
                {articles.map(article => {
                    const topicImage = [
                        'https://images.pexels.com/photos/4974912/pexels-photo-4974912.jpeg',
                        'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
                        'https://images.pexels.com/photos/47354/the-ball-stadion-football-the-pitch-47354.jpeg'
                    ];
                    return (
                        <article className="article" key={article.article_id} onClick={() => clickArticle(article.article_id)}>
                            <div className="topicImageWrapper">
                                <div className="topicHeading">
                                    <h3>{article.topic}</h3>
                                </div>
                                <img className="topicImage" src={
                                    article.topic === 'coding' ? topicImage[0]
                                    : article.topic === 'cooking' ? topicImage[1]
                                    : topicImage[2]
                                } alt={
                                    article.topic === 'coding' ? 'coding on a laptop'
                                    : article.topic === 'cooking' ? 'cooking a recipe with diverse ingredients'
                                    : 'football in focus with stadium blurred in the background'
                                }/>
                            </div>
                            <div className="article-under-image">
                                <div className="article-top">
                                <h3>{article.title}</h3>
                                <span>
                                    Author: {article.author}
                                </span>
                                <span>
                                    Posted: {formatDate(article.created_at)}
                                </span>
                                </div>
                                <div className="articles-comments-votes">
                                    <span>
                                        Votes: {article.votes}
                                    </span>
                                    <span>
                                        Comments: {article.comment_count}
                                    </span>
                                </div>
                            </div>
                        </article>
                    )
                })}
        </section>
    )
}