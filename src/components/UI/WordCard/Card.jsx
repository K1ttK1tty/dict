import React from 'react';
import cl from './WordCard.module.css'
import IconEdit from './IconEdit';
import IconRemove from './IconRemove';
import { setIndexCard } from '../../../store/modalRenameCard';
//redux
import { useDispatch } from 'react-redux';
import { setModal } from '../../../store/modalRenameCard';
import { setEditCard } from '../../../store/modalRenameCard';
const Card = function ({ card, remove, index, modalChangeCard }) {


    const dispatch = useDispatch()

    function tt() {
        remove(card);
    }
    function editWord() {
        dispatch(setIndexCard(index))
        dispatch(setEditCard(card))
        dispatch(setModal(true))
        setTimeout(() => {
            modalChangeCard.current.focus();
        }, 170);
    }


    return (
        <div className={cl.card} >
            <h4 className={cl.word}>{card.word}</h4>
            <p className={cl.translate}>{card.translate}</p>
            <div onClick={editWord} className={cl.edit}><IconEdit /></div>
            <div onClick={tt} className={cl.remove}><IconRemove /></div>
        </div>
    )
};
export default Card;