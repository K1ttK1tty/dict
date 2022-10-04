import React from 'react';
import CardRand from '../CardRand/CardRand'
const CardsRandom = function ({ cardsGame, input,setInput}) {







    return (
        <div>

            {
                cardsGame.map((card,index) => <CardRand input={input} setInput={setInput} key={index+card.word} card={card}/>)


            }


        </div>
    )
};
export default CardsRandom;