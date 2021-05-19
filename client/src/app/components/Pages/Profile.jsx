import React, { useState } from 'react'
import '../../styles/Profile.scss'
import uploadSVG from "../../images/photo-upload.svg"
import logOutSVG from "../../images/logout.svg"

import { rootStore } from '../../store/RootStore'
import { BASE_URL } from '../../context'
import { observer } from 'mobx-react-lite'
import { Link, useHistory } from 'react-router-dom'

function Profile() {
    const [first_name, setFirstName] = useState(rootStore.userStore.user.first_name)
    const [last_name, setLastName] = useState(rootStore.userStore.user.last_name)
    const [email, setEmail] = useState(rootStore.userStore.user.email)

    const history = useHistory()

    const updateUserInfoHandler = (event) => {
        event.preventDefault()
        rootStore.userStore.updateUserInfo({ first_name, last_name, email })
    }

    const addToBalance = event => {
        event.preventDefault()
        const adding = parseInt(prompt(`Enter value`))
        rootStore.userStore.addToBalance({ adding })
    }

    const logOutHandler = event => {
        history.push('/login')
        rootStore.userStore.logOut()
    }

    return (
        <div className='profile'>

            <header className="header profile--header">Profile</header>

            <form className='profile--info'>

                <div className='profile--info-part'>

                    <div className='profile--icon'>

                        <img src={`${BASE_URL}${rootStore.userStore.user.image}`} alt="Avatar" />

                        <button className='btn btn-svg profile--icon-upload'>
                            <img src={uploadSVG} alt={"upload icon"} />
                        </button>


                        <Link className='btn btn-svg profile--logout' onClick={logOutHandler} to={'/login'}>
                            <img src={logOutSVG} alt={"logout icon"} />
                        </Link>



                    </div>

                    <div className='profile--data'>

                        <input type='text' value={first_name} className='input-text profile--input' onChange={({ target }) => setFirstName(target.value)} />
                        <input type='text' value={last_name} className='input-text profile--input' onChange={({ target }) => setLastName(target.value)} />
                        <input type='email' value={email} className='input-text profile--input' onChange={({ target }) => setEmail(target.value)} />
                        <p className='profile--balance'> {rootStore.userStore.user.balance} $ </p>

                    </div>

                </div>

                <div className="profile--buttons">
                    <button className='btn profile--btn' onClick={event => updateUserInfoHandler(event)}>Save changes</button>
                    <button className='btn profile--btn' onClick={event => addToBalance(event)}>Add to balance</button>
                </div>

            </form>


        </div>
    )
}

export default observer(Profile)