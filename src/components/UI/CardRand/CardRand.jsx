import React from 'react';
import cl from '../CardRand/CardRand.module.css'
import Input from '../Input/Input';

const CardRand = function ({ card, input, setInput,validate,index}) {

    return (
        <div className={[cl.cardRand,validate[index]].join(' ')}>
            <Input  input={input} setInput={setInput}></Input>
            <div className={cl.translateRand}>{card.translate}</div>
        </div>
    )
};
export default CardRand;