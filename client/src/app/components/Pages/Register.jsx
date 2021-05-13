import React from 'react'
import '../../styles/Register.scss'

export default function Register() {
    return (
        <div className="register">
            <header className='header register-header'>Register</header>

            <form className='register--form'>
                <input className='input-text register--input' placeholder={'email'}/>
                <input className='input-text register--input' placeholder={'password'} type='password'/>
                <input className='input-text register--input' placeholder={'repeat password'} type='password'/>
                <button className='btn register--button'>Register</button>
            </form>
        </div>
    )
}
