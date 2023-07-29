import { setCards, setID } from '../store/reducers/authorization/Authorization/AuthSlice';

import { updatedCards } from './UpdateCards';
import { TRemoveCard } from './functoinModels';

export const removeCard: TRemoveCard = (
    cardClickID,
    Cards,
    email,
    data,
    currentDictionary,
    selectOptions,
    dispatch,
) => {
    const cards = [...Cards.filter(card => cardClickID !== card.id)];
    updatedCards(currentDictionary, email, data, cards, selectOptions, dispatch);
    dispatch(setCards(cards));
    dispatch(setID());
};
