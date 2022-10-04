import React from 'react';
import cl from '../CardRand/CardRand.module.css'
import Input from '../Input/Input';
const CardRand = function ({ card, input, setInput,}) {
    // console.log(card)


    return (
        <div className={cl.cardRand}>
            <Input input={input} setInput={setInput}></Input>
            <div className={cl.translateRand}>{card.translate}</div>
        </div>
    )
};
export default CardRand;