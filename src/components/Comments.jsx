import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getComments, postComment, deleteComment, formatDate } from "./utils/api";
import { UserContext } from "../contexts/User";
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'


export default function Comments() {

    const { article_id, comment_id } = useParams();

    const [comments, setComments] = useState([]);
    const [commentBody, setCommentBody] = useState('');
    const {loggedInUser, isLoggedIn} = useContext(UserContext)
    const [deleting, setDeleting] = useState(false)

    const [loginPrompt, setLoginPrompt] = useState(null)


    const handleTextChange = (event) => {
        setCommentBody(event.target.value)
        }

    const postSubmitHandler = (event) => {
        if(isLoggedIn) {
            event.preventDefault();
            setCommentBody('')
            postComment(article_id, loggedInUser.username, commentBody)
            alert('Thanks for your comment!')

        } else {
            event.preventDefault();
            setCommentBody('')
            alert('Please login to comment!')
        } 
    }

    const deleteHandler = (value) => {
        setDeleting(true)
        deleteComment(value)
        setTimeout(() => {
            setDeleting(false)
        }, 2000)
    }

    useEffect(() => {
        getComments(article_id)
        .then((comments) => {
            setComments([...comments])
        })
    }, [comments, article_id, deleting])

    return (
        <section className="comments-section" id="comments-section">
            <h3>Comments ({comments.length})</h3>
            <div>
                {
                    isLoggedIn
                    ? <p>add a comment</p>
                    : <p>Please login to add a comment</p>
                }
            <form id="commentForm" onSubmit={postSubmitHandler}>
                <textarea placeholder="Write a comment..." onChange={handleTextChange} row='4' cols='50' value={commentBody} required/>
                <button>Post Comment</button>
            </form>
        </div>
                {comments.map(comment => {
                    return (
                        <article className="comment-card" key={comment.comment_id}>
                            <div className="comment-author">
                                <p className="comment-author-name">{comment.author}</p>
                                <p className="comment-author-date">{formatDate(comment.created_at)}</p>
                            </div>
                            <div className="comment-body">
                                <p>{comment.body}</p>
                            </div>
                            <div className="comment-votes">
                            {
                                loggedInUser.username === comment.author
                                ? <button className="deleteComment" onClick={() => deleteHandler(comment.comment_id)}>Delete</button> 
                                : <button className="comment-votes-icon">{<AiFillHeart/>}<span className="comment-votes-count">{comment.votes}</span></button>
                            }
                                </div>
                        </article>
                    )
                })}
        </section>
    )
}