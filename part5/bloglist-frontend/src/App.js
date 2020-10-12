import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])

    const getBlogs = async () => {
        let data = await blogService.getAll()
        data.sort((a, b) => a.likes > b.likes ? -1 : 1)
        setBlogs(data)
    }

    useEffect(() => {
        getBlogs()
    }, [])

    const [login, setLogin] = useState({ username: '', password: '' })

    const changeLogin = (name) => (e) => {
        const value = e.target.value
        setLogin({ ...login, [name]: value })
    }

    const handleLogin = async () => {
        try {
            const user = await loginService.login(login.username, login.password)
            localStorage.setItem('user', JSON.stringify(user))
            setLogin({ username: '', password: '' })
        } catch (error) {
            const text = error.response.data.error
            setMessage({ text, variant: 'error' })
            resetMessage()
        }
    }

    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }

    const [message, setMessage] = useState(null)
    const resetMessage = () => {
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    const onCreate = async (blog) => {
        try {
            const data = await blogService.create(blog)
            formRef.current.toggleVisibility()
            setBlogs(blogs.concat(data))
            setMessage({ text: `a new blog ${data.title} by ${data.author} added`, variant: 'success' })
            resetMessage()
        } catch (error) {
            setMessage({ text: error.response.data.error, variant: 'error' })
            resetMessage()
        }
    }

    const handleLike = async (blog) => {
        const dataToPut = {
            likes: blog.likes + 1
        }
        await blogService.update(blog.id, dataToPut)
        getBlogs()
    }

    const handleRemove = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                await blogService.deleteBlog(blog.id)
                getBlogs()
            } catch (error) {
                setMessage({ text: error.response.data.error, variant: 'error' })
                resetMessage()
            }
        }
    }

    const formRef = useRef()

    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <div>
            {
                !user
                    ?
                    <div>
                        <Notification message={message} />
                        <Login login={login} setLogin={changeLogin} handleLogin={handleLogin} />
                    </div>
                    :
                    <div>
                        <Notification message={message} />
                        <h2>blogs</h2>
                        <p>{user.name} logged in<button id='logout' onClick={handleLogout}>logout</button></p>
                        <Togglable ref={formRef} buttonLabel="new blog">
                            <CreateForm handleCreate={onCreate} />
                        </Togglable>
                        {blogs.map(blog =>
                            <Blog
                                key={blog.id}
                                blog={blog}
                                handleLike={handleLike}
                                handleRemove={handleRemove}
                            />
                        )}
                    </div>
            }
        </div>
    )
}

export default App