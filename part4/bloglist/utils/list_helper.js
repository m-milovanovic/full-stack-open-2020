const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((a, b) => a + b.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((a, b) => a.likes > b.likes ? a : b, 0)
}

const mostBlogs = (blogs) => {
    return _.chain(_.map(blogs, 'author')).countBy().toPairs().max(_.last).head().value()
}

const mostLikes = (blogs) => {
    return _(blogs)
        .groupBy('author')
        .map((blogs, author) => ({
            author: author,
            likes: _.sumBy(blogs, 'likes')
        }))
        .orderBy('likes', 'desc')
        .first()
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}