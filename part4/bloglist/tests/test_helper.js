const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]

const blogToAdd = {
    title: "New Title",
    author: "Robert C. Martin",
    url: "url",
    likes: 7,
}

const blogToAddNoLikes = {
    title: "New Title",
    author: "Robert C. Martin",
    url: "url",
}

const blogToAddNoUrl = {
    title: "New Title",
    author: "Robert C. Martin",
    likes: 7,
}

const blogToAddNoTitle = {
    author: "Robert C. Martin",
    url: "url",
    likes: 7,
}

module.exports = {
    initialBlogs,
    blogToAdd,
    blogToAddNoLikes,
    blogToAddNoUrl,
    blogToAddNoTitle
}