import React from 'react';
import cl from '../CardRand/CardRand.module.css'
import Input from '../Input/Input';
import Gamescss from '../../../styles/Games.css'
const CardRand = function ({ card,setInput, validate, index}) {
    let validateWord = 'hidden';

    if (validate[index]) validateWord = validate[index] + 'Color';

    return (
        <div className={[cl.cardRand]}>
            <div className='wordBlock'>
                <div className={['wordShared',validateWord].join(' ')}>{card.word}</div>
                <Input validClass={validate[index]} setInput={setInput}></Input>
            </div>
            <div className={cl.translateRand}>{card.translate}</div>
        </div>
    )
};
export default CardRand;