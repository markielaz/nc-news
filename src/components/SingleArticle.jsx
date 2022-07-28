import { useState, useEffect } from "react";
import { useParams} from 'react-router-dom';
import { upVote, downVote, formatDate } from "./utils/api";
import { useContext } from "react"
import { UserContext } from "../contexts/User"
import Comments from "./Comments";
import {AiOutlineHeart, AiFillHeart, AiOutlineComment} from 'react-icons/ai'

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
    }, [article, votes, article_id]);

    const topicImage = [
        'https://images.pexels.com/photos/4974912/pexels-photo-4974912.jpeg',
        'https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg',
        'https://images.pexels.com/photos/47354/the-ball-stadion-football-the-pitch-47354.jpeg'
    ];

    return(
        <>
        <article className="SingleArticle">
            <h2>{article.title}</h2>
            <div className="article-info">
                <span className="date-published">
                    Date Published: {formatDate(article.date)}
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
                    <button id="upvoteButton" onClick={() => voteDown()}>{<AiOutlineComment/>}</button>
                    {article.comments} Comments
                </div>
                <p className="prompt">{loginPrompt}</p>
            </section>
        </article>
        <Comments />
        </> 
    )
}