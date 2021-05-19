import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { rootStore } from '../../store/RootStore'
import '../../styles/Login.scss'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {loginUser} = rootStore.userStore

    const history = useHistory()

    const onSubmitHandler = (e) => {
        e.preventDefault()
        loginUser({username, password})
        history.push('/')
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

export default observer(Login)
