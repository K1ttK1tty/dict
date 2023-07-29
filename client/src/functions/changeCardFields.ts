import { ICard } from '../store/storeModels';

import { TChangeCardFields } from './functoinModels';

export const changeCardFields: TChangeCardFields = (cards, oldCard, newCard) => {
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
        return card;
    });
    return newState;
};
