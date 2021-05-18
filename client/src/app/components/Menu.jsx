import React from 'react'
import { NavLink } from 'react-router-dom';

import '../styles/Menu.scss'
import logo from '../images/avatar-template.png'
import { rootStore } from '../store/RootStore';
import { observer } from 'mobx-react-lite';

function Menu() {

    const {user} = rootStore.userStore

    return (
        <menu className='main-menu'>

            {user
                ? <div className='buttons-container'>

                    <NavLink className='btn menu-btn profile-btn' activeClassName='active-btn' to='/profile'>Profile</NavLink>

                    <NavLink className='btn menu-btn game-btn' activeClassName='active-btn' to='/game'>Game</NavLink>

                    <NavLink className='btn menu-btn history-btn' activeClassName='active-btn' to='/history'>History</NavLink>

                </div>

                : <div className='buttons-container'>

                    <NavLink className='btn menu-btn register-btn' activeClassName='active-btn' to='/register'>Register</NavLink>

                    <NavLink className='btn menu-btn login-btn' activeClassName='active-btn' to='/login'>Login</NavLink>

                </div>
            }

            {user &&
                <div className='profile-thumbnail'>
                    <img src={logo} alt={"Avatar"}></img>
                    <h3>{user.first_name}</h3>
                    <h3>{user.last_name}</h3>
                    <h2>{user.balance}</h2>
                </div>
            }

        </menu>
    );
}

export default observer(Menu)