import { FC, memo } from 'react';
import CardRand from '../CardRand/CardRand';
// types
import { ICard } from '../../../store/reducers/authorization/Authorization/AuthTypes';
interface ICardsRandom {
    cardsGame: ICard[];
    testByWord: boolean;
}
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