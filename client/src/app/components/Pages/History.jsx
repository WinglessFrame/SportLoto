import React from 'react'

import '../../styles/History.scss'

export default function History() {
    const seedData = {
        bets: [
            {
                betPrice: 5,
                time: "17:55",
                date: "06 May, 2021",
                winStatus: false
            },
            {
                betPrice: 1,
                time: "17:44",
                date: "20 April, 2021",
                winStatus: true
            },
            {
                betPrice: 3,
                time: "20:41",
                date: "08 May, 2021",
                winStatus: false
            },
            {
                betPrice: 2,
                time: "19:35",
                date: "02 May, 2021",
                winStatus: false
            },
            {
                betPrice: 4,
                time: "11:25",
                date: "10 December, 2021",
                winStatus: false
            },
            
        ]
    }

    return (
        <div className="history-page">
            <header className='header history-header'>Bet History</header>
        </div>
    )
}
