import React from 'react';
import cl from './WordCard.module.css'
import IconEdit from './IconEdit';
import IconRemove from './IconRemove';

const Card = function ({ card, remove, setModal,setEditCard, index,setIndex}) {
    function tt() {
        remove(card);
    }

    function editWord() {
        setIndex(index);
        setEditCard(card)
        setModal(true);
    }


    return (
        <div className={cl.card} >
            <h4 className={cl.word}>{card.word}</h4>
            <p className={cl.translate}>{card.translate}</p>
            <div onClick={editWord} className={cl.edit}><IconEdit/></div>
            <div onClick={tt} className={cl.remove}><IconRemove/></div>
        </div>
    )
};
export default Card;