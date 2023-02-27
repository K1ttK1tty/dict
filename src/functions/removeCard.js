import { setCards } from "../store/Cards"
import { setID } from "../store/Cards"
export const removeCard = (cardClickID, Cards, dispatch) => {
    const cards = [...Cards.filter(card => cardClickID !== card.id)]
    dispatch(setCards(cards))
    dispatch(setID())
}