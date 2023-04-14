import { setIsModalAddCardActive } from "../store/modalAddCard"
export const modalAddCard = (modalAdd, dispatch) => {
    dispatch(setIsModalAddCardActive(true));
    setTimeout(() => { modalAdd.current.focus() }, 200);
}