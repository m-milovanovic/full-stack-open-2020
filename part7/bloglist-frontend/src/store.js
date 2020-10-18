import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import authReducer from './reducers/authReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogsReducer,
    auth: authReducer,
    users: usersReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store