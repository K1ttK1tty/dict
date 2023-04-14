import React from 'react';
import cl from '../CardRand/CardRand.module.css'
import Input from '../Input/Input';
import '../../../styles/Games.css'
//redux
import { useSelector } from 'react-redux';
const CardRand = function ({ card, index }) {
    const validateArr = useSelector(state => state.GamesSlice.validateArr)
    let validateWord = 'hidden';
    if (validateArr[index]) validateWord = validateArr[index] + 'Color';

    return (
        <div className={[cl.cardRand]}>
            <div className='wordBlock'>
                <div className={['wordShared', validateWord].join(' ')}>{card.word}</div>
                <Input validClass={validateArr[index]} />
            </div>
            <div className={cl.translateRand}>{card.translate}</div>
        </div>
    )
};
export default CardRand;