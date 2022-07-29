import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { formatDate, getArticles } from "./utils/api";
import cooking from "../images/cooking.webp"
import coding from "../images/coding.webp"
import football from "../images/football.webp"

export default function Articles({selected}) {

    const navigate = useNavigate();

    const [articles, setArticles] = useState([]);

    const clickArticle = (article_id) => {
        navigate(`/articles/${article_id}`)
    }

    const { topic } = useParams();

    useEffect(() => {
            getArticles(selected, topic)
            .then((articles) => {
                setArticles(articles)
            })
    }, [selected, topic])

    return (
        <section className="articles-section">
                {articles.map(article => {
                    const topicImage = [
                        coding,
                        cooking,
                        football
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