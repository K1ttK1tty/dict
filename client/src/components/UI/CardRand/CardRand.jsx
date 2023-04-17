import React from 'react';
// components
import Input from '../Input/Input';
// styles
import styles from '../CardRand/CardRand.module.css'
import '../../../styles/Games.css'
//redux
import { useSelector } from 'react-redux';
const CardRand = function ({ card, index }) {
    const validateArr = useSelector(state => state.GamesSlice.validateArr)
    let validateWord = 'hidden';
    if (validateArr[index]) validateWord = validateArr[index] + 'Color';

    return (
        <div className={[styles.cardRand]}>
            <div className='wordBlock'>
                <div className={['wordShared', validateWord].join(' ')}>{card.word}</div>
                <Input validClass={validateArr[index]} />
            </div>
            <div className={styles.translateRand}>{card.translate}</div>
        </div>
    )
};
export default CardRand;