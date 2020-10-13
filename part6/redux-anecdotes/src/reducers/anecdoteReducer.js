import anecdoteService from "../services/anecdoteService"

const VOTE = 'VOTE'
export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: VOTE,
      data: anecdote.id
    })
  }
}

const NEW = 'NEW'
export const newAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(data)
    dispatch({
      type: NEW,
      data: newAnecdote
    })
  }
}

const INIT = 'INIT'
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: INIT,
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case VOTE:
      return state.map(item => item.id === action.data ? { ...item, votes: item.votes + 1 } : item).sort((a, b) => b.votes - a.votes)
    case NEW:
      return [...state, action.data]
    case INIT:
      return [...action.data]
    default:
      return state
  }
}

export default anecdoteReducer