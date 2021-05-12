import React from 'react'
import '../../styles/BetPrice.scss'

export default function BetPrice({ price }) {

    const stylePicker = (price) => {
        const colorNumber = price <= 5 && price > 0 ? price.toString() : 'default'
        return colorNumber
    }


    return (
        <div className={`bet-price bet-price-color-${stylePicker(price)}`}>
            {price}$
            <span className='bet-price-txt'>Bet</span>
        </div>
    )
}
