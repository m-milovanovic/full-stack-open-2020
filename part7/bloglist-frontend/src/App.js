import React, { useRef, useEffect } from 'react'
import Login from './components/Login'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, getBlogs } from './reducers/blogsReducer'
import { Link, Route } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'

const App = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs.all.sort((a, b) => a.likes > b.likes ? -1 : 1))
    const user = useSelector(state => state.auth)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    useEffect(() => {
        dispatch(getBlogs())
    }, [dispatch])


    const onCreate = async (blog) => {
        try {
            dispatch(createBlog(blog))
            formRef.current.toggleVisibility()
            dispatch(setNotification({ content: `a new blog ${blog.title} by ${blog.author} added`, variant: 'success' }, 5))
        } catch (error) {
            dispatch(setNotification({ content: error.response.data.error, variant: 'error' }, 5))
        }
    }

    const formRef = useRef()

    return (
        <div>
            <Navigation />
            <Notification />
            {
                !user
                    ?
                    <div>
                        <Login />
                    </div>
                    :
                    <div className='container'>
                        <Route exact path='/(|blogs)'>
                            <Togglable ref={formRef} buttonLabel="new blog">
                                <CreateForm handleCreate={onCreate} />
                            </Togglable>
                            {blogs.map(blog => <div style={blogStyle} key={blog.id} ><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></div>)}
                        </Route>
                        <Route exact path='/users'>
                            <Users />
                        </Route>
                        <Route path='/users/:id'>
                            <User />
                        </Route>
                        <Route path='/blogs/:id'>
                            <Blog />
                        </Route>
                    </div>
            }
        </div>
    )
}

export default App