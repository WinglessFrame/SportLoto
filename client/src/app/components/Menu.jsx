import React from 'react'
import { Nav, NavLink } from 'react-router-dom';

import '../styles/Menu.scss'
import logo from '../images/256_16.png'

export default function Menu() {
    return (
        <menu className='main-menu'>
            <div className='buttons-container'>

                <NavLink className='btn profile-btn' activeClassName='active-btn' to='/profile'>Profile</NavLink>

                <NavLink className='btn game-btn' activeClassName='active-btn' to='/game'>Game</NavLink>

                <NavLink className='btn history-btn' activeClassName='active-btn' to='/history'>History</NavLink>

            </div>
            <div className='profile-thumbnail'>
                <img src={logo} alt={"Avatar"}></img>
                <h3>Darth</h3>
                <h3>Maul</h3>
                <h2>322$</h2>
            </div>
        </menu>
    );
}
