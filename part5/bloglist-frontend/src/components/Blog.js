import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [details, setDetails] = useState(false)

    const toggle = () => setDetails(prev => !prev)

    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <div style={blogStyle} className='blog'>
            {
                details ?
                    <div>
                        <span id='blog-title'>{blog.title}</span> <button onClick={toggle}> hide</button><br />
                        {blog.url}<br />
                        likes {blog.likes} <button id='like-button' onClick={() => handleLike(blog)}>like</button><br />
                        {blog.author}<br />
                        {user && blog.user && blog.user.id === user.id && <button onClick={() => handleRemove(blog)}>remove</button>}
                    </div>
                    :
                    <div>
                        <span id='blog-title'>{blog.title}</span> <button onClick={toggle}>view</button>
                    </div>
            }
        </div>
    )
}

export default Blog
