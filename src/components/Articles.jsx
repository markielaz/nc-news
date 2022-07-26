import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

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
                    return (
                        <article className="article" key={article.article_id} onClick={() => clickArticle(article.article_id)}>
                            <h3>{article.title}</h3>
                            <p>Topic: {article.topic}</p>
                            <p>Author: {article.author}</p>
                            <p>Votes: {article.votes}</p>
                            <p>Comments: {article.comment_count}</p>
                            <p>Posted: {article.created_at}</p>
                        </article>
                    )
                })}
        </section>
    )
}