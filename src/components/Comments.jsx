import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getComments, postComment, formatDate } from "./utils/api";
import { UserContext } from "../contexts/User";

export default function Comments() {

    const { article_id } = useParams();

    const [comments, setComments] = useState([]);
    const [commentBody, setCommentBody] = useState('');
    const {loggedInUser, isLoggedIn} = useContext(UserContext)


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

    useEffect(() => {
        getComments(article_id)
        .then((comments) => {
            setComments([...comments])
        })
    }, [comments, article_id])

    return (
        <section className="comments-section">
            <h3>Comments ({comments.length})</h3>
            <div>
            <p>add a comment</p>
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
                                <p>Votes: {comment.votes}</p>
                            </div>
                        </article>
                    )
                })}
        </section>
    )
}