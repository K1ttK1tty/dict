// types
import { ICard, IInputValue } from '../store/reducers/authorization/Authorization/AuthTypes';
type FunctType = (
    cards: ICard[],
    oldCard: ICard,
    newCard: IInputValue,
) => ICard[];
export const changeCardFields: FunctType = (cards, oldCard, newCard) => {
    const newState: ICard[] = JSON.parse(JSON.stringify(cards));
    newState.map(card => {
        if (card.id === oldCard.id) {
            card.word = newCard.word;
            card.translate = newCard.translate;
            card.theme = newCard.theme;
            card.note = newCard.note;
            card.time;
            card.color;
        }
    });
    return newState;
};