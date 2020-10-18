import userService from '../services/users'

const initialState = {
    single: null,
    all: []
}

const SET_USERS = 'SET_USERS'
const SET_SINGLE_USER = 'SET_SINGLE_USER'
const RESET_SINGLE_USER = 'RESET_SINGLE_USER'

export const getUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: SET_USERS,
            data: users
        })
    }
}

export const getUser = (id) => {
    return async dispatch => {
        const user = await userService.get(id)
        dispatch({
            type: SET_SINGLE_USER,
            data: user
        })
    }
}

export const removeUser = () => {
    return dispatch => {
        dispatch({ type: RESET_SINGLE_USER })
    }
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return { ...state, all: [...action.data] }
        case SET_SINGLE_USER:
            return { ...state, single: { ...action.data } }
        case RESET_SINGLE_USER:
            return { ...state, single: null }
        default:
            return state
    }
}

export default usersReducer