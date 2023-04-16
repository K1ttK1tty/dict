import { setCards, setID } from "../store/reducers/authorization/AuthSlice"
import { UpdateCards } from "../store/reducers/asyncActions/ActionCreator"
export const removeCard = (cardClickID, Cards, email, dispatch) => {
    const cards = [...Cards.filter(card => cardClickID !== card.id)]
    dispatch(UpdateCards({ email, cards }))
    dispatch(setCards(cards))
    dispatch(setID())
}