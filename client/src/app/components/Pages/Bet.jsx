import React, { useState, useRef } from 'react'
import '../../styles/Bet.scss'

export default function Bet() {

    const [inputsValues, setInputsValues] = useState({})
    const inputsRef = useRef([])

    const onChangeHandler = (target, idx) => {
        if (idx === 4 && target.textLength >= 3) return
        setInputsValues(state => ({ ...state, [idx]: target.value }))
    }

    const keyDownHandler = (event, idx) => {

        if (event.keyCode === 9) { // tab
            event.preventDefault()
            if (idx === 4) { // focus first on last tab
                inputsRef.current[0].focus()
                return
            }
            inputsRef.current[idx + 1].focus()
            return
        }

        if (event.keyCode === 8) { // backSpace
            if (event.target.textLength === 0) {
                if (idx === 0) return
                inputsRef.current[idx - 1].focus()
            }
            return
        }

        if (event.target.value.toString().length >= 2) { // on regular input
            if (idx === 4) return
            inputsRef.current[idx + 1].focus()
            return
        }
    }

    const submit = (event) => {
        event.preventDefault() //TODO
    }

    return (
        <div className='bet'>

            <header className="bet-header">Make a bet!</header>

            <div className="bet-price">5$<span className='bet-price-txt'>Bet</span></div>

            <form method="POST" onSubmit={submit}>

                <div className='bet-form-container'>
                    <input type="number" className="bet-input" tabIndex={1} autoComplete={"off"}
                        min={1}
                        max={36}
                        value={inputsValues[0]}
                        onChange={({ target }) => onChangeHandler(target, 0)}
                        ref={el => inputsRef.current[0] = el}
                        onKeyDown={event => keyDownHandler(event, 0)}
                    />
                    <input type="number" className="bet-input" tabIndex={2} autoComplete={"off"}
                        min={1}
                        max={36}
                        value={inputsValues[1]}
                        onChange={({ target }) => onChangeHandler(target, 1)}
                        ref={el => inputsRef.current[1] = el}
                        onKeyDown={event => keyDownHandler(event, 1)}
                    />
                    <input type="number" className="bet-input" tabIndex={3} autoComplete={"off"}
                        min={1}
                        max={36}
                        value={inputsValues[2]}
                        onChange={({ target }) => onChangeHandler(target, 2)}
                        ref={el => inputsRef.current[2] = el}
                        onKeyDown={event => keyDownHandler(event, 2)}
                    />
                    <input type="number" className="bet-input" tabIndex={4} autoComplete={"off"}
                        min={1}
                        max={36}
                        value={inputsValues[3]}
                        onChange={({ target }) => onChangeHandler(target, 3)}
                        ref={el => inputsRef.current[3] = el}
                        onKeyDown={event => keyDownHandler(event, 3)}
                    />
                    <input type="number" className="bet-input" tabIndex={5} autoComplete={"off"}
                        min={1}
                        max={36}
                        value={inputsValues[4]}
                        onChange={({ target }) => onChangeHandler(target, 4)}
                        ref={el => inputsRef.current[4] = el}
                        onKeyDown={event => keyDownHandler(event, 4)}
                    />
                </div>

                <input className='btn bet-submit' type="Submit" value="Bet" />
            </form>


        </div>
    )
}
