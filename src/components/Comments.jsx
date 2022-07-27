import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatDate } from "./utils/api";

export default function Comments() {

    const { article_id } = useParams();

    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`https://marklaz-nc-news.herokuapp.com/api/articles/${article_id}/comments`)
            .then((res) => res.json())
            .then(({comments}) => {
                setComments(comments);
            });
    }, [comments, article_id]);

    useEffect(() => {
        fetch('https://marklaz-nc-news.herokuapp.com/api/users')
            .then((res) => res.json())
            .then(({users}) => {
                setUsers(users);
            });
    }, []);


    let lookupObj = {}

    users.forEach(user => {
        user.username = lookupObj.username;
    })




    return (
        <section className="comments-section">
            <h3>Comments ({comments.length})</h3>
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