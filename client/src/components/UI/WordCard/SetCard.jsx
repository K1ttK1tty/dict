import React, { memo } from 'react';
import Card from './Card';
const SetCards = memo(function ({ Cards, modalChangeCard }) {
    return (
        <>
            {Cards.map((card, index) =>
                < Card modalChangeCard={modalChangeCard} card={card} key={Math.random() + card.word} index={index} />
            )}
        </>
    )
});
export default SetCards;