import { FC, memo } from 'react';
import CardRand from '../CardRand/CardRand';
// types
import { ICards } from '../../../store/reducers/authorization/Authorization/AuthTypes';
interface ICardsRandom {
    cardsGame: ICards[];
}
const CardsRandom: FC<ICardsRandom> = memo(function ({ cardsGame }) {
    return (
        <div>
            {
                cardsGame.map((card, index) => <CardRand index={index} key={index + card.word} card={card} />)
            }
        </div>
    );
});
export default CardsRandom;