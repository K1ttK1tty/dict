import { FC, memo } from 'react';
import Card from './Card';
// types
import { ICard } from '../../../store/reducers/authorization/Authorization/AuthTypes';
interface ISetCards {
    Cards: ICard[];
    modalChangeCard: React.MutableRefObject<HTMLInputElement | null>;
}
const SetCards: FC<ISetCards> = memo(function ({ Cards, modalChangeCard }) {
    return (
        <>
            {Cards.map((card, index) =>
                < Card modalChangeCard={modalChangeCard} card={card} key={Math.random() + card.word} index={index} />
            )}
        </>
    );
});
export default SetCards;