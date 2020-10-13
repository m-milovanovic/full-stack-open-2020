import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const create = async (e) => {
        e.preventDefault()
        const content = e.target.content.value
        e.target.content.value = ''
        props.newAnecdote(content)
        props.setNotification(`You have created new anecdote: ${content}`, 5)
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name='content' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    newAnecdote,
    setNotification
}

const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
