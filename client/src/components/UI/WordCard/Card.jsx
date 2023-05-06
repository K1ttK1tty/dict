import React, { memo } from 'react';
import { isMobile } from 'react-device-detect';
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
    const openMobalInMobile = isMobile
        ? () => editWord(card, index, modalChangeCard, dispatch)
        : null
    return (
        <div onClick={openMobalInMobile} className={styles.card} >
            <h4 className={styles.word}>{card.word}</h4>
            <p className={styles.translate}>{card.translate}</p>
            <div
                onClick={() => editWord(card, index, modalChangeCard, dispatch)}
                className={
                    isMobile
                        ? styles.removeIcon
                        : styles.edit
                }
            >
                <IconEdit />
            </div>
            <div
                onClick={() => removeCard(card.id, cards, user.email, dispatch)}
                className={isMobile
                    ? styles.removeIcon
                    : styles.remove
                }
            ><IconRemove /></div>
        </div>
    )
});
export default Card;