import React from 'react';
import CardRand from '../CardRand/CardRand'
const CardsRandom = function ({ cardsGame }) {
    return (
        <div>
            {
                cardsGame.map((card, index) => <CardRand index={index} key={index + card.word} card={card} />)
            }
        </div>
    )
};
export default CardsRandom;