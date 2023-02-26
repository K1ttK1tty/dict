import React from 'react';
import Card from './Card';
const SetCards = function ({ Cards, remove, modalChangeCard }) {
    return (
        <div>
            {Cards.map((card, index) =>
                < Card modalChangeCard={modalChangeCard} remove={remove} card={card} key={card.word + index} index={index} />
            )}
        </div>
    )
};
export default SetCards;