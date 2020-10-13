import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
    const vote = async (anecdote) => {
        await props.voteAnecdote(anecdote)
        props.setNotification(`You voted for ${anecdote.content}`, 5)
    }
    return (
        <div>
            {props.anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapDispatchToProps = {
    voteAnecdote,
    setNotification
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())),
        filter: state.filter
    }
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList