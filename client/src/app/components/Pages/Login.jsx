import React from 'react'
import '../../styles/Login.scss'

export default function Login() {
    return (
        <div className="login">

            <header className='header login-header'>Login</header>

            <form className='login--form'>
                <input className='input-text login--input' placeholder={'email'} />
                <input className='input-text login--input' placeholder={'password'} type='password' />
                <button className='btn login--button'>Login</button>
            </form>

        </div>
    )
}
