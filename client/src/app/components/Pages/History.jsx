import React from 'react'
import BetPrice from '../shared/BetPrice'

import '../../styles/History.scss'

export default function History() {
    const seedData = { // TODO get data from API
        'bets': [
            {
                pk: 25,
                price: 5,
                time: "17:55",
                date: "06 May, 2021",
                result: false
            },
            {
                pk: 24,
                price: 1,
                time: "17:44",
                date: "20 April, 2021",
                result: true,
                matchesCount: 4,
                winPrice: 8
            },
            {
                pk: 23,
                price: 3,
                time: "20:41",
                date: "08 May, 2021",
                result: false
            },
            {
                pk: 22,
                price: 2,
                time: "19:35",
                date: "02 May, 2021",
                result: true,
                matchesCount: 3,
                winPrice: 6
            },
            {
                pk: 11,
                price: 4,
                time: "11:25",
                date: "10 December, 2021",
                result: false
            },

        ]
    }

    const betResult = (result) => {
        result = result ? 'win' : 'lose'
        return `history-item-${result}`
    } 

    return (
        <div className="history">
            <header className='header history-header'>Bet History</header>

            {seedData['bets'].map(record => {
                return (
                    <div className={`history-item ${betResult(record.result)}`} key={record.pk}>

                        <BetPrice price={record.price}/>

                        {record.result && 
                            <div className='history-item--content win-info'>
                                <p>Match : {record.matchesCount}</p>
                                <p>Win: {record.winPrice}</p>
                            </div>
                        }

                        <div className='history-item--content timestamp'>
                            <p>{record.time}</p>
                            <p>{record.date}</p>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}
