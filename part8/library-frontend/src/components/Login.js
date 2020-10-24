import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { LOGIN } from '../helpers/mutations'

const Login = ({ show }) => {
    const [login] = useMutation(LOGIN)
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    if (!show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()
        try {
            const response = await login({variables: {username: user, password: pass}})
            localStorage.setItem('userToken', response.data.login.value)
            window.location.reload()
        } catch (error) {
            console.log(error.message) 
        }  
        setUser('')
        setPass('')
    }

    return (
        <form onSubmit={submit}>
            <div>
                username
                <input value={user} onChange={(e) => setUser(e.target.value)} />
            </div>
            <div>
                password
                <input type='password' value={pass} onChange={(e) => setPass(e.target.value)} />
            </div>
            <button type='submit'>Login</button>
        </form>
    )
}

export default Login