import React from 'react';
// components
import IconRemove from './IconRemove';
import IconEdit from './IconEdit';
// functions
import { removeCard } from '../../../functions/removeCard';
import { editWord } from '../../../functions/editWord';
// styles
import cl from './WordCard.module.css'
//redux
import { useSelector, useDispatch } from 'react-redux';

const Card = function ({ card, index, modalChangeCard }) {
    const dispatch = useDispatch()
    const { cards, user } = useSelector(state => state.AuthSlice)

    return (
        <div className={cl.card} >
            <h4 className={cl.word}>{card.word}</h4>
            <p className={cl.translate}>{card.translate}</p>

            <div
                onClick={() => editWord(card, index, modalChangeCard, dispatch)}
                className={cl.edit}
            ><IconEdit /></div>

            <div
                onClick={() => removeCard(card.id, cards, user.email, dispatch)}
                className={cl.remove}
            ><IconRemove /></div>
        </div>
    )
};
export default Card;