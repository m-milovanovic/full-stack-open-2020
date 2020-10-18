import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const get = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const create = async (blog) => {
    const options = {
        headers: {
            'authorization': `bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
    }
    const response = await axios.post(baseUrl, blog, options)
    return response.data
}

const addComment = async (id, comment) => {
    const options = {
        headers: {
            'authorization': `bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
    }
    console.log(comment)
    const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, options)
    return response.data
}

const update = async (id, data) => {
    const options = {
        headers: {
            'authorization': `bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
    }
    const response = await axios.put(`${baseUrl}/${id}`, data, options)
    return response.data
}

const deleteBlog = async (id) => {
    const options = {
        headers: {
            'authorization': `bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
    }
    const response = await axios.delete(`${baseUrl}/${id}`, options)
    return response.data
}

export default { getAll, get, addComment, create, update, deleteBlog }