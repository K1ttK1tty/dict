import { setIsModalAddCardActive } from "../store/reducers/modalAddCard"
export const modalAddCard = (modalAdd, dispatch) => {
    dispatch(setIsModalAddCardActive(true));
    setTimeout(() => { modalAdd.current.focus() }, 200);
}