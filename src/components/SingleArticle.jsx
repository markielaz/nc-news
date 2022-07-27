import { useState, useEffect } from "react";
import { useParams} from 'react-router-dom';
import { upVote, downVote, formatDate } from "./utils/api";
import { useContext } from "react"
import { UserContext } from "../contexts/User"
import Comments from "./Comments";

export default function SingleArticle() {

    const {article_id} = useParams();
    const [article, setArticle] = useState({});
    const [votes, setVotes] = useState(0);
    const [voted, setVoted] = useState(false);
    const [loginPrompt, setLoginPrompt] = useState(null)

    const {isLoggedIn} = useContext(UserContext);

    const voteUp = () => {
        if (isLoggedIn) {
            setVotes((currentVotes) => currentVotes + 1)
            upVote(article_id)
            setVoted(true)
        } else {
            setLoginPrompt('Please log in to vote!')
        }
        
    }

    const voteDown = () => {
        if (isLoggedIn) {
            setVotes((currentVotes) => currentVotes - 1)
            downVote(article_id)
            setVoted(false)
        }
    }

    useEffect(() => {
        fetch(`https://marklaz-nc-news.herokuapp.com/api/articles/${article_id}`)
            .then((res) => res.json())
            .then(({article}) => {
                setArticle(article);
            });
    }, [article, votes, article_id]);


    return(
        <>
        <article className="SingleArticle">
            <h2>{article.title}</h2>
            <p>Topic: {article.topic}</p>
            <p>{article.body}</p>
            <p>Author: {article.author}</p>
            <p>Votes: {article.votes}</p>
            <p>Comments: {article.comment_count}</p>
            <p>Posted: {formatDate(article.created_at)}</p>

            <div className='ArticleVotes'>
                {
                voted 
                ? <button id="upvoteButton" onClick={() => voteDown()}>Toggle Vote Down</button> 
                : <button id="downvoteButton" onClick={() => voteUp()}>Toggle Vote Up</button>
                }
            </div>
            <p className="prompt">{loginPrompt}</p>
        </article>
        <Comments />
        </> 
    )
}