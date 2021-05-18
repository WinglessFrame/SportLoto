import React, { useState } from 'react'
import { rootStore } from '../../store/RootStore'
import '../../styles/Login.scss'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {loginUser} = rootStore.userStore

    const onSubmitHandler = (e) => {
        e.preventDefault()

        loginUser({username, password})
    }

    return (
        <div className="login">

            <header className='header login-header'>Login</header>

            <form className='login--form' onSubmit={onSubmitHandler}>
                <input className='input-text login--input' placeholder={'username'} value={username} onChange={e => setUsername(e.target.value)}/>
                <input className='input-text login--input' placeholder={'password'} value={password} type='password' onChange={e => setPassword(e.target.value)}/>
                <button className='btn login--button'>Login</button>
            </form>

        </div>
    )
}
