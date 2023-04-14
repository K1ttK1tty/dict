import React from 'react';
import Card from './Card';
const SetCards = function ({ Cards, modalChangeCard }) {
    return (
        <div>
            {Cards.map((card, index) =>
                < Card modalChangeCard={modalChangeCard} card={card} key={card.word + index} index={index} />
            )}
        </div>
    )
};
export default SetCards;