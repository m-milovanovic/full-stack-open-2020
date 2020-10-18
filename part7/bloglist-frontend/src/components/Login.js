import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/authReducer'

const Login = () => {
    const [loginData, setLoginData] = useState({ username: '', password: '' })
    const dispatch = useDispatch()

    const changeLoginData = (name) => (e) => {
        const value = e.target.value
        setLoginData({ ...loginData, [name]: value })
    }

    const handleLogin = () => {
        dispatch(login(loginData.username, loginData.password))
        setLoginData({ username: '', password: '' })
    }

    return (
        <div>
            <h1>log in to application</h1>
            username<input id='username' value={loginData.username} onChange={changeLoginData('username')} /><br />
            password<input id='password' value={loginData.password} onChange={changeLoginData('password')} type='password' /><br />
            <button onClick={handleLogin}>login</button>
        </div>
    )
}

export default Login