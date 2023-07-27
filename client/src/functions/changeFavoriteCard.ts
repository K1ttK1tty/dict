// functions
import { setCards } from '../store/reducers/authorization/Authorization/AuthSlice';
import { updatedCards } from './UpdateCards';
// models
import { ICard } from '../store/storeModels';
import { TSwitchFavorite } from './functoinModels';
export const switchFavorite: TSwitchFavorite = (
    cards,
    cardId,
    currentDictionary,
    selectOptions,
    email,
    data,
    dispatch
) => {
    const newCards: ICard[] = JSON.parse(JSON.stringify(cards));
    const currentCardId = cardId;
    newCards.map(card => {
        if (card.id === currentCardId) {
            card.favorite = !card.favorite;
        }
    });
    dispatch(setCards(newCards));
    updatedCards(currentDictionary, email, data, newCards, selectOptions, dispatch);
};