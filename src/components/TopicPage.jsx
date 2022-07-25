import { useParams } from "react-router-dom";
import Articles from "./Articles";

export default function TopicPage() {
    const { topic } = useParams();
   return(
    <>
    <h2>{topic}</h2>
    <Articles />
    </>
   ) 
}