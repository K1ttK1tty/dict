import { FC, memo } from 'react';
import CardRand from '../CardRand/CardRand';
// types
import { ICard } from '../../../store/reducers/authorization/Authorization/AuthTypes';
interface ICardsRandom {
    cardsGame: ICard[];
}
const CardsRandom: FC<ICardsRandom> = memo(function ({ cardsGame }) {
    return (
        <>
            {
                cardsGame.map((card, index) => <CardRand index={index} key={index + card.word} card={card} />)
            }
        </>
    );
});
export default CardsRandom;