import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navigation() {

    const [topics, setTopics] = useState([]);

    useEffect(() => {
        fetch(`https://marklaz-nc-news.herokuapp.com/api/topics`)
        .then((res) => res.json())
        .then(({topics}) => {
            setTopics(topics)
        })
    }, [])


    return (
        <nav className="MainNav">
            <ul className="Topics">
                <li className="topic">
                    <Link  className="TopicLink" to={`/`}>all topics</Link>
                </li>
                {topics.map(topic => {
                    return (
                        <li className="topic" key={topic.slug}>
                        <Link  className="TopicLink" to={`/topics/${topic.slug}`}>{topic.slug}</Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}