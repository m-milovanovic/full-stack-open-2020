import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUser } from '../reducers/usersReducer'

const User = () => {
    const user = useSelector(state => state.users.single)
    const dispatch = useDispatch()

    const { id } = useParams()

    useEffect(() => {
        dispatch(getUser(id))
    }, [id, dispatch])

    return (
        user &&
        <div>
            <h1>{user.name}</h1>
            <h2>added blogs</h2>
            <ul>
                {
                    user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
                }
            </ul>
        </div>
    )
}

export default User