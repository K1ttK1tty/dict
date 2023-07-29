import { setCards } from '../store/reducers/authorization/Authorization/AuthSlice';
import { ICard } from '../store/storeModels';

import { updatedCards } from './UpdateCards';
import { TSwitchFavorite } from './functoinModels';

export const switchFavorite: TSwitchFavorite = (
    cards,
    cardId,
    currentDictionary,
    selectOptions,
    email,
    data,
    dispatch,
) => {
    const newCards: ICard[] = JSON.parse(JSON.stringify(cards));
    const currentCardId = cardId;
    newCards.map(card => {
        if (card.id === currentCardId) {
            card.favorite = !card.favorite;
        }
        return card;
    });
    dispatch(setCards(newCards));
    updatedCards(currentDictionary, email, data, newCards, selectOptions, dispatch);
};
