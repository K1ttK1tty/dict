import React from 'react';
import cl from './WordCard.module.css'
import IconEdit from './IconEdit';
import IconRemove from './IconRemove';
import { removeCard } from '../../../functions/removeCard';
import { editWord } from '../../../functions/editWord';
//redux
import { useSelector, useDispatch } from 'react-redux';
const Card = function ({ card, index, modalChangeCard }) {
    const dispatch = useDispatch()
    const Cards = useSelector(state => state.AuthSlice.cards)
    return (
        <div className={cl.card} >
            <h4 className={cl.word}>{card.word}</h4>
            <p className={cl.translate}>{card.translate}</p>

            <div
                onClick={() => editWord(card, index, modalChangeCard, dispatch)}
                className={cl.edit}
            ><IconEdit /></div>

            <div
                onClick={() => removeCard(card.id, Cards, dispatch)}
                className={cl.remove}
            ><IconRemove /></div>

        </div>
    )
};
export default Card;