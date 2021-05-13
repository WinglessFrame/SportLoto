import React from 'react'
import { NavLink } from 'react-router-dom';

import '../styles/Menu.scss'
import logo from '../images/avatar-template.png'

const IsuserAuthenticated = false // TODO  dev version

export default function Menu() {
    return (
        <menu className='main-menu'>

            {IsuserAuthenticated
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

            {IsuserAuthenticated &&
                <div className='profile-thumbnail'>
                    <img src={logo} alt={"Avatar"}></img>
                    <h3>Darth</h3>
                    <h3>Maul</h3>
                    <h2>322$</h2>
                </div>
            }

        </menu>
    );
}
