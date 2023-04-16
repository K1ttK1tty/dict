import { setChangeCard } from "../store/reducers/authorization/AuthSlice"
import { setEditCard, setModal, setIndexCard } from "../store/reducers/modalRenameCard"
export const editWord = (card, index, modalChangeCard, dispatch) => {
    dispatch(setIndexCard(index))
    dispatch(setChangeCard(card))
    dispatch(setEditCard(card))
    dispatch(setModal(true))
    setTimeout(() => {
        modalChangeCard.current.focus();
    }, 170);
}