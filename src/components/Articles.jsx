import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";


export default function Articles() {

    const [articles, setArticles] = useState([]);
    const [articleLink, setArticleLink] = useState('');

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
                        <article className="article" key={article.article_id} data-link="https://www.google.com">
                            <h3>{article.title}</h3>
                            <p>Topic: {article.topic}</p>
                            {/* <p>{article.body}</p> */}
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