import { useState, useEffect } from "react";
import { useParams} from 'react-router-dom'

export default function SingleArticle() {

    const {article_id} = useParams();
    const [article, setArticle] = useState({});


    useEffect(() => {
        fetch(`https://marklaz-nc-news.herokuapp.com/api/articles/${article_id}`)
            .then((res) => res.json())
            .then(({article}) => {
                setArticle(article);
            });
    }, [article_id]);


    return( 
        <article className="SingleArticle">
            <h2>{article.title}</h2>
            <p>Topic: {article.topic}</p>
            <p>{article.body}</p>
            <p>Author: {article.author}</p>
            <p>Votes: {article.votes}</p>
            <p>Comments: {article.comment_count}</p>
            <p>Posted: {article.created_at}</p>
        </article>
    )
}