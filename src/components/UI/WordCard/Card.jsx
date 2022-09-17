import React from 'react';
import cl from './WordCard.module.css'
import IconEdit from './IconEdit';
import IconRemove from './IconRemove';
const Card = function ({ card, remove,index }) {

    function tt() {
        remove(card);
    }
    // console.log(card.translate)
    // card.translate.map(translate=>console.log(translate))

    return (
        <div className={cl.card} >
            <h4 className={cl.word}>{card.word}</h4>
            <p className={cl.translate}>{card.translate}</p>
            <div className={cl.edit}><IconEdit height={'25px'} width={'25px'} stroke={'rgba(255, 255, 255, 0.75)'} /></div>
            <div onClick={tt} className={cl.remove}><IconRemove height={'25px'} width={'25px'} stroke={'rgba(255, 255, 255, 0.75)'} /></div>
        </div>
    )
};
export default Card;