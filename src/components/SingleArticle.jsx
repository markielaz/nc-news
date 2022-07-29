import { useState, useEffect } from "react";
import { useParams} from 'react-router-dom';
import { upVote, downVote, formatDate } from "./utils/api";
import { useContext } from "react"
import { UserContext } from "../contexts/User"
import Comments from "./Comments";
import {AiOutlineHeart, AiFillHeart, AiOutlineComment} from 'react-icons/ai'
import { Error } from "./ErrorPage";

import cooking from "../images/cooking.webp"
import coding from "../images/coding.webp"
import football from "../images/football.webp"

export default function SingleArticle() {

    const {article_id} = useParams();
    const [article, setArticle] = useState({
        title: "",
        date: "",
        author: "",
        body: "",
        votes: "",
        comments: ""
    });
    const [votes, setVotes] = useState(0);
    const [voted, setVoted] = useState(false);
    const [loginPrompt, setLoginPrompt] = useState(null)
    const {isLoggedIn} = useContext(UserContext);
    const [error, setError] = useState(null)

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
                setArticle({
                    title: article.title,
                    author: article.author,
                    date: article.created_at,
                    topic: article.topic,
                    body: article.body.replaceAll('. ', '.\n\n'),
                    votes: article.votes,
                    comments: article.comment_count
                })
            })
            .catch((err)=>{
                setError({err})
            })
    }, [article, votes, article_id]);

    const topicImage = [
        coding,
        cooking,
        football
    ];

    if (error) {
        console.log(error)
        return <Error message={error} />
    } else

    return(
        <>
        <article className="SingleArticle">
            <h2>{article.title}</h2>
            <div className="article-info">
                <span className="date-published">
                    Date Published: <span className="date-published-date">{formatDate(article.date)}</span>
                </span>
                <span className="article-author">
                    - by <span className="author-name">{article.author}</span>
                </span>
            </div>            
            <div className="topicImageWrapper topicImageWrapper-single">
                <div className="topicHeading">
                    <h3>{article.topic}</h3>
                </div>
                <img className="topicImage" src={
                    article.topic === 'coding' ? topicImage[0]
                    : article.topic === 'cooking' ? topicImage[1]
                    : topicImage[2]
                }
                alt={
                    article.topic === 'coding' ? 'coding on a laptop'
                    : article.topic === 'cooking' ? 'cooking a recipe with diverse ingredients'
                    : 'football in focus with stadium blurred in the background'
                }
                />
            </div>
            <section className="article-body">
                <p>{article.body}</p>
            </section>
            <hr className="article-divider" />
            <section className="comments-and-votes">
                <div className='ArticleVotes'>{article.votes} Votes
                    {
                    voted 
                    ? <button id="upvoteButton" onClick={() => voteDown()}>{<AiFillHeart/>}</button> 
                    : <button id="downvoteButton" onClick={() => voteUp()}>{<AiOutlineHeart/>}</button>
                    }
                </div>
                <div className="ArticleComments">
                    <button id="commentButton"><a href="#comments-section">{<AiOutlineComment/>}</a></button>
                    {article.comments} Comments
                </div>
                <p className="prompt">{loginPrompt}</p>
            </section>
        </article>
        <Comments />
        </> 
    )
}