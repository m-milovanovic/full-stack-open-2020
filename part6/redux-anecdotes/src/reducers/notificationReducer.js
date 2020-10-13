const initialState = {
    id: null,
    content: null
}

const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const setNotification = (data, seconds) => {
    return dispatch => {
        dispatch({
            type: SET_NOTIFICATION,
            data: data
        })
        const id = setTimeout(() => {
            dispatch({ type: REMOVE_NOTIFICATION })
        }, seconds * 1000)
        dispatch({
            type: SET_ID,
            data: id
        })
    }
}

const SET_ID = 'SET_ID'
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATION:
            clearTimeout(state.id)
            return { ...state, content: action.data }
        case REMOVE_NOTIFICATION:
            return initialState
        case SET_ID:
            return { ...state, id: action.data }
        default:
            return state
    }
}

export default notificationReducer