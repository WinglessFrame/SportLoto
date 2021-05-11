import React, { useState } from 'react'
import '../../styles/Bet.scss'

export default function Bet() {

    const [inputsValues, setInputsValues] = useState({})

    const onChangeHandler = (target, idx) => {
        console.log(idx, target)
        setInputsValues(state => ({ ...state, [idx]: target.value }))
    }


    const submit = (event) => {
        event.preventDefault()
        console.log(inputsValues)
    }

    return (
        <div className='bet'>

            <header className="bet-header">Make a bet!</header>

            <div className="bet-price">5$<span className='bet-price-txt'>Bet</span></div>

            <form method="POST" onSubmit={submit}>

                <div className='bet-form-container'>
                    <input type="text" className="bet-input" id="input-1" tabIndex={1} value={inputsValues[0]} onChange={({ target }) => onChangeHandler(target, 0)}/>
                    <input type="text" className="bet-input" id="input-2" tabIndex={2} value={inputsValues[1]} onChange={({ target }) => onChangeHandler(target, 1)}/>
                    <input type="text" className="bet-input" id="input-3" tabIndex={3} value={inputsValues[2]} onChange={({ target }) => onChangeHandler(target, 2)}/>
                    <input type="text" className="bet-input" id="input-4" tabIndex={4} value={inputsValues[3]} onChange={({ target }) => onChangeHandler(target, 3)}/>
                    <input type="text" className="bet-input" id="input-5" tabIndex={5} value={inputsValues[4]} onChange={({ target }) => onChangeHandler(target, 4)}/>
                </div>

                <input className='btn bet-submit' type="Submit" value="Bet" />
            </form>


        </div>
    )
}
