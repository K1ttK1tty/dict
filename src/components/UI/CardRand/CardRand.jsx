import React from 'react';
import cl from '../CardRand/CardRand.module.css'
import Input from '../Input/Input';
import Gamescss from '../../../styles/Games.css'
const CardRand = function ({ card, input, setInput,validate,index}) {
    // console.log(card)


    return (
        <div className={[cl.cardRand,validate[index]].join(' ')}>
            <Input  input={input} setInput={setInput}></Input>
            <div className={cl.translateRand}>{card.translate}</div>
        </div>
    )
};
export default CardRand;