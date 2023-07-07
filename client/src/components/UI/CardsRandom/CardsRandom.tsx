import { FC, memo } from 'react';
import CardRand from '../CardRand/CardRand';
// types
import { ICardsRandom } from './CardsRandomModel';
const CardsRandom: FC<ICardsRandom> = memo(function ({ cardsGame, testByWord }) {
    return (
        <>
            {
                cardsGame.map((card, index) =>
                    <CardRand
                        index={index}
                        key={index + card.word}
                        card={card}
                        testByWord={testByWord}
                    />
                )
            }
        </>
    );
});
export default CardsRandom;