import React, { useState, useEffect } from 'react'
import BetPrice from '../shared/BetPrice'

import '../../styles/History.scss'
import axios from 'axios'
import { BASE_URL } from '../../context'
import { rootStore } from '../../store/RootStore'

export default function History() {

    const [history, setHistory] = useState([])
    
    const fetchHistory = () => {
        const historyUrl = `${BASE_URL}/api/history/`
        try{
            axios.get(historyUrl, {
                headers: {
                    Authorization : `JWT ${rootStore.userStore.user['token']}`
                }
            })
            .then(response => setHistory(response.data))
            
        } catch (er) {
            console.log(er)
        }  
    }

    useEffect(() => {
        fetchHistory()
    }, [])

    const betResult = (result) => {
        result = result ? 'win' : 'lose'
        return `history-item-${result}`
    } 

    return (
        <div className="history">
            <header className='header history-header'>Bet History</header>

            {history.map(record => {
                return (
                    <div className={`history-item ${betResult(record.result)}`} key={record.pk}>

                        <BetPrice initialPrice={record.bet_price} isEditable={false}/>

                        {record.result && 
                            <div className='history-item--content win-info'>
                                <p>Match : {record.matches}</p>
                                <p>Win: {record.win_value}</p>
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
