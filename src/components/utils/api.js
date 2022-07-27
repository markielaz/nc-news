import axios from "axios";
const dayjs = require("dayjs")

export const baseApi = axios.create({
    baseURL: `https://marklaz-nc-news.herokuapp.com/api`
})

export const getUsers = () => {
    return baseApi.get(`/users`).then(({data}) => {
        return data.users
    })
}

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

export const formatDate = (date) => {
    if (date) {
        return dayjs(date).$d.toString().substring(4, 15);
    }
}

export const getComments = (article_id) => {
    return baseApi.get(`/articles/${article_id}/comments`)
    .then(({data}) => {
        return data.comments
    })
}

export const postComment = (article_id, author, body) => {
    return baseApi.post(`/articles/${article_id}/comments`, {username: author, body: body})
    .then((res) => {
        return res.data.comment
    })

}
