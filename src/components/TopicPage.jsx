import { useParams } from "react-router-dom";
import Articles from "./Articles";

export default function TopicPage() {
    const { topic } = useParams();
   return(
    <>
    <h2 className="topics-title">{topic} articles</h2>
    <Articles />
    </>
   ) 
}