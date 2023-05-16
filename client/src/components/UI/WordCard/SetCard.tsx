import { FC, memo } from 'react';
import Card from './Card';
// types
import { ICards } from '../../../store/reducers/authorization/Authorization/AuthTypes';
interface ISetCards {
    Cards: ICards[];
    modalChangeCard: React.MutableRefObject<HTMLInputElement | undefined>;
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