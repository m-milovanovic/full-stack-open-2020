import React, { useState } from 'react'

const CreateForm = ({ handleCreate }) => {
    const [data, setData] = useState({ title: '', author: '', url: '' })
    const changeData = (name) => (e) => {
        const value = e.target.value
        setData({ ...data, [name]: value })
    }

    return (
        <div>
            <h1>create new</h1>
            title<input id='title' value={data.title} onChange={changeData('title')} /><br />
            author<input id='author' value={data.author} onChange={changeData('author')} /><br />
            url<input id='url' value={data.url} onChange={changeData('url')} /><br />
            <button id='create-blog' onClick={() => handleCreate(data)}>create</button>
        </div>
    )
}

export default CreateForm