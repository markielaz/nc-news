import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { formatDate, getArticles } from "./utils/api";
import {AiFillHeart, AiOutlineComment} from 'react-icons/ai'
import { Error } from "./ErrorPage";


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

    const [error, setError] = useState(false);

    useEffect(() => {
            getArticles(selected, topic)
            .then((articles) => {
                setArticles(articles)
            })
            .catch((err) =>{
                setError({err})
            })
    }, [selected, topic])

    if (error) {
        console.log(error)
        return <Error message={error} />
    } else

    return (
        <section className="articles-section">
                {articles.map(article => {
                    const topicImage = [
                        coding,
                        cooking,
                        football
                    ];
                    return (
                        <>
                        <article className="article" key={article.article_id} onClick={() => clickArticle(article.article_id)}>
                            <div className="topicImageWrapper">
                                <div className="topicHeading">
                                    <span>{article.topic}</span>
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
                                <div className="article-details">
                                    <span className="article-author">
                                        By: <span>{article.author}</span>
                                    </span>
                                    <span className="article-posted">
                                        Posted: <span>{formatDate(article.created_at)}</span>
                                    </span>
                                </div>
                                </div>
                                <div className="articles-comments-votes">
                                    <span className="articles-votes">
                                        {article.votes} Votes {<AiFillHeart/>}
                                    </span>
                                    <span className="articles-comments">
                                    {<AiOutlineComment/>} {article.comment_count} Comments
                                    </span>
                                </div>
                            </div>
                        </article>
                            </>
                    )
                })}
        </section>
    )
}