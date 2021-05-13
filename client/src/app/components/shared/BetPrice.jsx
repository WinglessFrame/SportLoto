import React, { useState, useEffect } from 'react'
import '../../styles/BetPrice.scss'


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

    return (
        <div className={`bet-price bet-price-color-${stylePicker(price)}`}>
            { !isEditable
                ? `${price}`
                : <input type='number' className="input-text bet-price--input"
                    value={price}
                    onChange={({target}) => onChangeHandler(target)}
                    min={1}
                    max={5}
                />  
            }
            $
            <span className='bet-price-txt'>Bet</span>
        </div>
    )
}
