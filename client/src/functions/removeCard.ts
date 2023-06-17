// redux
import { setCards, setID } from '../store/reducers/authorization/Authorization/AuthSlice';
import { UpdateCards } from '../store/reducers/authorization/Authorization/ActionCreator';
// types
import { AppDispatch } from '../store/store';
import { ICard } from '../store/reducers/authorization/Authorization/AuthTypes';
type FunctType = (
    cardClickID: number,
    Cards: ICard[],
    email: string,
    dispatch: AppDispatch,
) => void;
export const removeCard: FunctType = (cardClickID, Cards, email, dispatch) => {
    const cards = [...Cards.filter(card => cardClickID !== card.id)];
    dispatch(UpdateCards({ email, cards }));
    dispatch(setCards(cards));
    dispatch(setID());
};