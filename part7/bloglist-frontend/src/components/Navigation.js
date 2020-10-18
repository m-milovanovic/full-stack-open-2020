import React from 'react'
import { logout } from '../reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navigation = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth)
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <div className="navbar navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
            <h2>Blog app</h2>
            <Link style={{ marginRight: 8 }} to='/blogs'>blogs</Link>
            <Link style={{ marginRight: 8 }} to='/users'>users</Link>
            <span>
                <span style={{ marginRight: 8 }}>{user.name} logged in</span><button className="btn btn-primary" id='logout' onClick={handleLogout}>logout</button>
            </span>
        </div>
    )
}

export default Navigation