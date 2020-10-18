import blogService from '../services/blogs'

export const getBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: INITIALIZE_BLOGS,
            data: blogs
        })
    }
}

export const get = (id) => {
    return async dispatch => {
        const blog = await blogService.get(id)
        dispatch({
            type: SET_SINGLE,
            data: blog
        })
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        await blogService.create(blog)
        dispatch(getBlogs())
    }
}

export const addComment = (id, comment) => {
    return async dispatch => {
        await blogService.addComment(id, comment)
        dispatch(get(id))
    }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        await blogService.deleteBlog(blog.id)
        dispatch(getBlogs())
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        blog.likes += 1
        blog.user = undefined
        await blogService.update(blog.id, blog)
        dispatch(get(blog.id))
    }
}

const SET_SINGLE = 'SET_SINGLE'
const INITIALIZE_BLOGS = 'INITIALIZE_BLOGS'
const NEW_BLOG = 'NEW_BLOG'
const UPDATE_BLOG = 'UPDATE_BLOG'

const initialState = {
    all: [],
    single: null
}

const blogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_BLOGS:
            return { ...state, all: [...action.data] }
        case NEW_BLOG:
            return { ...state, all: [...state.all, action.data] }
        case UPDATE_BLOG:
            return { ...state, all: [state.all.map((blog) => blog.id === action.data.id ? action.data : blog)] }
        case SET_SINGLE:
            return { ...state, single: { ...action.data } }
        default:
            return state
    }
}

export default blogsReducer