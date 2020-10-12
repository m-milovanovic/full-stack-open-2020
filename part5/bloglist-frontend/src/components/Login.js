import React from 'react'

const Login = ({ login, setLogin, handleLogin }) => {
    return (
        <div>
            <h1>log in to application</h1>
            username<input id='username' value={login.username} onChange={setLogin('username')}/><br />
            password<input id='password' value={login.password} onChange={setLogin('password')} type='password' /><br />
            <button onClick={handleLogin}>login</button>
        </div>
    )
}

export default Login