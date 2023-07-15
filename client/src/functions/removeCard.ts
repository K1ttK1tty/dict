// redux
import { setCards, setID } from '../store/reducers/authorization/Authorization/AuthSlice';
import { UpdateCards } from '../store/reducers/authorization/Authorization/ActionCreator';
// types
import { TRemoveCard } from './functoinModels';
export const removeCard: TRemoveCard = (cardClickID, Cards, email, dispatch) => {
    const cards = [...Cards.filter(card => cardClickID !== card.id)];
    console.log(cards)
    dispatch(UpdateCards({ email, cards }));
    dispatch(setCards(cards));
    dispatch(setID());
};