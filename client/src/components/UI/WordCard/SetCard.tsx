import { FC, memo } from 'react';
import Card from './Card';
// style
import '../../../styles/Vocabulary.css';
// types
import { ICard } from '../../../store/reducers/authorization/Authorization/AuthTypes';
interface ISetCards {
    Cards: ICard[];
    modalChangeCard: React.MutableRefObject<HTMLInputElement | null>;
    doubleRowCards: boolean;
}
const SetCards: FC<ISetCards> = memo(function ({ Cards, modalChangeCard, doubleRowCards }) {
    const cardsPosition = doubleRowCards ? 'CardsPosition' : '';
    return (
        <div className={cardsPosition}>
            {Cards.map((card, index) =>
                < Card
                    modalChangeCard={modalChangeCard}
                    card={card}
                    key={Math.random() + card.word}
                    index={index}
                    doubleRowCards={doubleRowCards}
                />
            )}
        </div>
    );
});
export default SetCards;