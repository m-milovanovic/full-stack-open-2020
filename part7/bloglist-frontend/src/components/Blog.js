import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComment, get, likeBlog } from '../reducers/blogsReducer'

const Blog = () => {
    const blog = useSelector(state => state.blogs.single)
    const dispatch = useDispatch()

    const [comment, setComment] = useState('')

    const { id } = useParams()

    const handleLike = (blog) => {
        dispatch(likeBlog(blog))
    }

    const handleAddComment = (e) => {
        e.preventDefault()
        if (comment.length === 0) return
        dispatch(addComment(blog.id, comment))
        setComment('')
    }

    useEffect(() => {
        dispatch(get(id))
    }, [id, dispatch])

    return (
        <div className='blog'>
            {
                blog &&
                <div>
                    <h1 id='blog-title'>{blog.title} {blog.author}</h1>
                    <a href={blog.url}>{blog.url}</a><br />
                        likes {blog.likes} <button id='like-button' onClick={() => handleLike(blog)}>like</button><br />
                        added by {blog.user.name}
                    <h2>comments</h2>
                    <input value={comment} onChange={(e) => setComment(e.target.value)}></input><button onClick={handleAddComment}>add comment</button>
                    <ul>
                        {blog.comments.map((comment, i) => <li key={i}>{comment}</li>)}
                    </ul>
                </div>

            }
        </div>
    )
}

export default Blog
