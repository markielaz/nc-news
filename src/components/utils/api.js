import axios from "axios";

export const baseApi = axios.create({
    baseURL: `https://marklaz-nc-news.herokuapp.com/api`
})

export const upVote = (article_id) => {
    return baseApi.patch(`/articles/${article_id}`, {inc_votes : 1})
    .then((res) => {
        return res.data.article
    })
}

export const downVote = (article_id) => {
    return baseApi.patch(`/articles/${article_id}`, {inc_votes: -1})
    .then((res) => {
        return res.data.article
    })
}