import React, { useState } from 'react'
import '../../styles/BetPrice.scss'
import arrowSVG from '../../images/down-chevron.svg'


export default function BetPrice({ initialPrice, isEditable }) {

    const [price, setPrice] = useState(initialPrice)

    const stylePicker = (price) => {
        const colorNumber = price <= 5 && price > 0 ? price.toString() : 'default'
        return colorNumber
    }

    const onChangeHandler = (target) => {
        if (target.value >= 1 && target.value <= 5) {
            setPrice(target.value)
        }
    }

    const arrowDownPressed = () => {
        if (price > 1) {
            setPrice(old => old - 1)
        }
    }

    const arrowUpPressed = () => {
        if (price < 5) {
            setPrice(old => old + 1)
        }
    }

    return (
        <div className={`bet-price bet-price-color-${stylePicker(price)}`}>
            {!isEditable
                ? `${price}`
                : <div className="input-wrapper">
                    <input type='number' className="bet-price--input"
                        value={price}
                        onChange={({ target }) => onChangeHandler(target)}
                        min={1}
                        max={5}
                    />
                    <div className="price-buttons">
                        <button className="price-btn price-btn-up" onClick={arrowUpPressed}>
                            <img src={arrowSVG} alt="arrow up" />
                        </button>
                        <button className="price-btn price-btn-down" onClick={arrowDownPressed}>
                            <img src={arrowSVG} alt="arrow up" />
                        </button>
                    </div>
                </div>
            }
            $
            <span className='bet-price-txt'>Bet</span>
        </div>
    )
}
