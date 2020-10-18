import { setNotification } from './notificationReducer'
import loginService from '../services/login'

const initialState = JSON.parse(localStorage.getItem('user'))

export const login = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login(username, password)
            dispatch({
                type: SET_USER,
                data: user
            })
        } catch (error) {
            const text = error.response.data.error
            dispatch(setNotification({ content: text, variant: 'error' }, 5))
        }
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch({ type: REMOVE_USER })
    }
}

const SET_USER = 'SET_USER'
const REMOVE_USER = 'REMOVE_USER'

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            localStorage.setItem('user', JSON.stringify(action.data))
            return action.data
        case REMOVE_USER:
            localStorage.removeItem('user')
            return initialState
        default:
            return state
    }
}

export default authReducer