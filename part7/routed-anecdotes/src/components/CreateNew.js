import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        history.push('/')
        props.setNotification(`a new anecdote ${content} created!`)
        setTimeout(() => {
            props.setNotification('')
        }, 10000);
    }

    const handleReset = (e) => {
        e.preventDefault()
        content.reset()
        author.reset()
        info.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input { ...content} reset={undefined}/>
                </div>
                <div>
                    author
                    <input {...author} reset={undefined}/>
                </div>
                <div>
                    url for more info
                    <input {...info} reset={undefined}/>
                </div>
                <button>create</button>
                <button onClick={handleReset}>reset</button>
            </form>
        </div>
    )
}

export default CreateNew