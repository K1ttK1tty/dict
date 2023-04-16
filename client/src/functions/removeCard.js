import { setCards,setID } from "../store/reducers/authorization/AuthSlice"
export const removeCard = (cardClickID, Cards, dispatch) => {
    const cards = [...Cards.filter(card => cardClickID !== card.id)]
    dispatch(setCards(cards))
    dispatch(setID())
}