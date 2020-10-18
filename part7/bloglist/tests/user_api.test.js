const e = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('when creating a user', () => {
    test('everything is correct', async () => {
        const user = {
            username: 'test',
            password: 'test'
        }
        const response = await api.post('/api/users').send(user)
        expect(response.status).toBe(201)
        expect(response.body.id).toBeDefined()
    })

    test('missing username', async () => {
        const user = {
            password: 'test'
        }
        const response = await api.post('/api/users').send(user)
        expect(response.status).toBe(400)
        expect(response.body.error).toBeDefined()
    })

    test('short username', async () => {
        const user = {
            username: 't',
            password: 'test'
        }
        const response = await api.post('/api/users').send(user)
        expect(response.status).toBe(400)
        expect(response.body.error).toBeDefined()
    })

    test('not unique username', async () => {
        const user = {
            username: 'unique',
            password: 'test'
        }
        const response = await api.post('/api/users').send(user)
        expect(response.status).toBe(400)
        expect(response.body.error).toBeDefined()
    })

    test('missing password', async () => {
        const user = {
            username: 'test',
        }
        const response = await api.post('/api/users').send(user)
        expect(response.status).toBe(400)
        expect(response.body.error).toBeDefined()
        expect(response.body.error).toBe('password must be provided')
    })

    test('short password', async () => {
        const user = {
            username: 'test',
            password: 't'
        }
        const response = await api.post('/api/users').send(user)
        expect(response.status).toBe(400)
        expect(response.body.error).toBeDefined()
        expect(response.body.error).toBe('password must be at least 3 characters long')
    })


    beforeEach(async () => {
        await User.deleteMany({})

        const user = new User({
            username: 'unique',
            name: 'name',
            passwordHash: '12345',
        })

        await user.save()
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})