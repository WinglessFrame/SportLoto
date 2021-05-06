import React from 'react'
import '../styles/Menu.scss'
import logo from '../images/256_16.png'

export default function Menu() {
    return (
        <menu className='main-menu'>
            <div className='buttons-container'>
                <button className='btn'>Profile</button>
                <button className='btn'>Game</button>
                <button className='btn'>History</button>
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
