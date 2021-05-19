import React, { useState } from 'react'
import '../../styles/Register.scss'
import { rootStore } from '../../store/RootStore';
import { observer } from 'mobx-react-lite';

function Register() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')



    const RegisterSubmitHandler = (event) => {
        event.preventDefault()
        rootStore.userStore.registerUser({
            email,
            username,
            password1,
            password2
        })        
    }

    return (
        <div className="register" onSubmit={RegisterSubmitHandler}>
            <header className='header register-header'>Register</header>

            <form className='register--form'>
                <input className='input-text register--input' placeholder={'email'}
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                />
                <input className='input-text register--input' placeholder={'login'}
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
                <input className='input-text register--input' placeholder={'password'} type='password'
                    value={password1}
                    onChange={({ target }) => setPassword1(target.value)}
                />
                <input className='input-text register--input' placeholder={'repeat password'} type='password'
                    value={password2}
                    onChange={({ target }) => setPassword2(target.value)}
                />
                <button className='btn register--button' formAction={'Submit'}>Register</button>
            </form>
        </div>
    )
}

export default observer(Register)