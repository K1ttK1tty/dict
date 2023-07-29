import { FC, memo } from 'react';

import { ICardsRandom } from './CardsRandomModel';

import CardRand from '../CardRand/CardRand';

const CardsRandom: FC<ICardsRandom> = memo(function ({ cardsGame, testByWord }) {
    return (
        <>
            {cardsGame.map((card, index) => (
                <CardRand index={index} key={index + card.word} card={card} testByWord={testByWord} />
            ))}
        </>
    );
});
export default CardsRandom;
