import React, { memo } from 'react';
// components
import IconRemove from './icons/IconRemove';
import IconEdit from './icons/IconEdit';
// functions
import { removeCard } from '../../../functions/removeCard';
import { editWord } from '../../../functions/editWord';
// styles
import styles from './WordCard.module.css'
//redux
import { useSelector, useDispatch } from 'react-redux';

const Card = memo(function ({ card, index, modalChangeCard }) {
    const dispatch = useDispatch()
    const { cards, user } = useSelector(state => state.AuthSlice)

    return (
        <div className={styles.card} >
            <h4 className={styles.word}>{card.word}</h4>
            <p className={styles.translate}>{card.translate}</p>

            <div
                onClick={() => editWord(card, index, modalChangeCard, dispatch)}
                className={styles.edit}
            ><IconEdit /></div>

            <div
                onClick={() => removeCard(card.id, cards, user.email, dispatch)}
                className={styles.remove}
            ><IconRemove /></div>
        </div>
    )
});
export default Card;