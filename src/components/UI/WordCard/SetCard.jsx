import React from 'react';
import Card from './Card';
const SetCards = function ({ Cards, remove,setModal,editCard, setEditCard,inputValue,setIndex}) {


    // Cards.map(card=> console.log(card.word))
    return (
        <div>


            {Cards.map((card, index) =>

                // console.log(card.word.includes(searchWord));

                < Card setIndex={setIndex} setEditCard={setEditCard} setModal={setModal} remove={remove} card={card} key={card.word + index} index={index} />

            )}



        </div>

    )




};
export default SetCards;