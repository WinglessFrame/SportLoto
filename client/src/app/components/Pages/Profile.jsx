import React, { } from 'react'
import '../../styles/Profile.scss'
import logo from "../../images/avatar-template.png"
import uploadSVG from "../../images/photo-upload.svg"
import logOutSVG from "../../images/logout.svg"

import { rootStore } from '../../store/RootStore'

export default function Profile() {
    return (
        <div className='profile'>

            <header className="header profile--header">Profile</header>

            <form className='profile--info'>

                <div className='profile--info-part'>

                    <div className='profile--icon'>
                        <img src={logo} alt="Avatar" />
                        <button className='btn btn-svg profile--icon-upload'>
                            <img src={uploadSVG} alt={"upload icon"} />
                        </button>
                    </div>

                    <div className='profile--data'>

                        <input type='text' value={'Darth'} className='input-text profile--input' />  {/* TODO data from API */}
                        <input type='text' value={'Maul'} className='input-text profile--input' />
                        <input type='text' value={'darkSide@zv.com'} className='input-text profile--input' />
                        <p className='profile--balance'> {322} $ </p>
                        <p className='profile--timestamp'> {"12 December 2002"} </p>

                    </div>



                </div>

                <button className='btn btn-svg profile--logout' onClick={rootStore.userStore.logOut}>  {/* //TODO logout button */}
                    <img src={logOutSVG} alt={"logout icon"} />
                </button>

                <div className="profile--buttons">
                    <button className='btn profile--btn'>Save changes</button>
                    <button className='btn profile--btn'>Add to balance</button>
                </div>

            </form>


        </div>
    )
}
