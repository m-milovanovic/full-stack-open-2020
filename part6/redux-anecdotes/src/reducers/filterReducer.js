const initialState = ''

const SET_FILTER = 'SET_FILTER'
export const setFilter = (data) => {
    return {
        type: SET_FILTER,
        data: data
    }
}

const CLEAR_FILTER = 'CLEAR_FILTER'
export const clearFilter = () => {
    return {
        type: CLEAR_FILTER,
    }
}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILTER:
            return action.data
        case CLEAR_FILTER:
            return initialState
        default:
            return state
    }
}

export default filterReducer