import React, { memo } from 'react';
import CardRand from '../CardRand/CardRand'
const CardsRandom = memo(function ({ cardsGame }) {
    return (
        <div>
            {
                cardsGame.map((card, index) => <CardRand index={index} key={index + card.word} card={card} />)
            }
        </div>
    )
});
export default CardsRandom;