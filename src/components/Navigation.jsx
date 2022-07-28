import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "./utils/api";

export default function Navigation({selected, setSelected}) {

    const [topics, setTopics] = useState([]);

    const options = [
        { value: 'created_at', label: 'date posted' },
        { value: 'votes', label: 'most popular' },
        { value: 'comment_count', label: 'most comments' },
    ]
    
    useEffect(() => {
        getTopics()
        .then((topics) => {
            setTopics([...topics])
        })
    }, [])

    const handleChange = (event) => {
        setSelected(event.target.value)
    }

    return (
        <nav className="MainNav">
            <div className="innerNav">
                <div className="sortbyWrapper">
                <label htmlFor="sortby">Sort articles by:</label>
                <select name="sortby" value={selected} onChange={handleChange}>
                    {options.map((option) => {
                        return(
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ) 
                    })}
                </select>
                </div>
                <ul className="Topics">
                    {topics.map(topic => {
                        return (
                            <li className="topic" key={topic.slug}>
                                <Link className="TopicLink" to={`/topics/${topic.slug}`}>{topic.slug}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
}