import React from 'react';
import CardRand from '../CardRand/CardRand'
const CardsRandom = function ({ cardsGame,setInput,validate,}) {

    return (
        <div>
            {
                cardsGame.map((card,index) => <CardRand validate={validate} index={index} setInput={setInput} key={index+card.word} card={card}/>)
            }
        </div>
    )
};
export default CardsRandom;