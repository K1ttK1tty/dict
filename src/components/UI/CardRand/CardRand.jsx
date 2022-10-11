import React from 'react';
import cl from '../CardRand/CardRand.module.css'
import Input from '../Input/Input';
import Gamescss from '../../../styles/Games.css'
const CardRand = function ({ card, input, setInput, validate, index}) {
    let validateWord = 'hidden';

    if (validate[index]) {
        if (validate[index] == 'trueWord') validateWord = 'wordTrue';

        if (validate[index] == 'almost') validateWord = 'wordAlmost';

        if (validate[index] == 'falseWord') validateWord = 'wordFalse';
    }

    return (
        <div className={[cl.cardRand]}>

            <div className='wordBlock'>
                <div className={validateWord}>{card.word}</div>
                <Input validClass={validate[index]} input={input} setInput={setInput}></Input>
            </div>

            <div className={cl.translateRand}>{card.translate}</div>
        </div>
    )
};
export default CardRand;