import { setChangeCard } from "../store/Cards"
import { setEditCard } from "../store/modalRenameCard"
import { setModal } from "../store/modalRenameCard"
import { setIndexCard } from "../store/modalRenameCard"
export const editWord = (card, index, modalChangeCard, dispatch) => {
    dispatch(setIndexCard(index))
    dispatch(setChangeCard(card))
    dispatch(setEditCard(card))
    dispatch(setModal(true))
    setTimeout(() => {
        modalChangeCard.current.focus();
    }, 170);
}