const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { blogToAddNoUrl, blogToAddNoTitle } = require('./test_helper')
const helper = require('./test_helper')

const api = supertest(app)

let token = ''

test('blogs are returned as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    });
})

test('successful blog add', async () => {
    let response = await api.post('/api/blogs').set('authorization', `Bearer ${token}`).send(helper.blogToAdd)
    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined()

    response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
})

test('successful blog add with null likes', async () => {
    let response = await api.post('/api/blogs').set('authorization', `Bearer ${token}`).send(helper.blogToAddNoLikes)
    expect(response.status).toBe(201)
    expect(response.body.id).toBeDefined()
    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)

    response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
})

test('fail blog add with missing url', async () => {
    let response = await api.post('/api/blogs').set('authorization', `Bearer ${token}`).send(blogToAddNoUrl)
    expect(response.status).toBe(400)
})

test('fail blog add with missing title', async () => {
    let response = await api.post('/api/blogs').set('authorization', `Bearer ${token}`).send(blogToAddNoTitle)
    expect(response.status).toBe(400)
})

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)    
})

beforeAll(async () => {
    await User.deleteMany({})
    const user = {
        username: 'test',
        password: 'test'
    }
    await api.post('/api/users').send(user)
    const response = await api.post('/api/login').send(user)
    token = response.body.token
})

afterAll(() => {
    mongoose.connection.close()
})