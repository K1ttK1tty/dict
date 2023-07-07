// redux
import { setIsModalAddCardActive } from '../store/reducers/modalAddCard';
import { TModalAddCard } from './functoinModels';
export const modalAddCard: TModalAddCard = (modalAdd, dispatch) => {
    dispatch(setIsModalAddCardActive(true));
    setTimeout(() => {
        if (modalAdd.current) {

            // modalAdd.current.focus();
            // console.log(modalAdd.current.getBoundingClientRect())
            // window.scrollTo()

        }
    }, 200);
};