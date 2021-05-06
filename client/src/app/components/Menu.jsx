import React from 'react'
import { Link } from 'react-router-dom';

import '../styles/Menu.scss'
import logo from '../images/256_16.png'

export default function Menu() {
    return (
        <menu className='main-menu'>
            <div className='buttons-container'>

                <Link className='nav-btn' to='/profile'>Profile</Link>

                <Link className='nav-btn' to='/game'>Game</Link>

                <Link className='nav-btn' to='/history'>History</Link>

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
