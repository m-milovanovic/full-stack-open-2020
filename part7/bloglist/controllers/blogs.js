const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { request } = require('express')

blogsRouter.get('', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const comment = request.body.comment
    const blog = await Blog.findById(request.params.id)
    blog.comments.push(comment)
    await blog.save()
    response.status(201).end()
})

blogsRouter.post('', async (request, response) => {
    const blog = new Blog(request.body)

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    blog.user = user.id
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    const user = await User.findById(decodedToken.id)

    if (blog.user.toString() !== user.id.toString())
        return response.status(403).json({ error: 'trying to delete a blog that user did not create' })

    await blog.deleteOne()

    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    let updated = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
        .populate('user', { username: 1, name: 1, id: 1 })
    response.json(updated)
})

module.exports = blogsRouter