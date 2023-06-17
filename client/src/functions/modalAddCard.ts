// redux
import { setIsModalAddCardActive } from '../store/reducers/modalAddCard';
import { AppDispatch } from '../store/store';
type FunctType = (
    modalAdd: React.MutableRefObject<HTMLInputElement | null>,
    dispatch: AppDispatch
) => void;
export const modalAddCard: FunctType = (modalAdd, dispatch) => {
    dispatch(setIsModalAddCardActive(true));
    setTimeout(() => {
        if (modalAdd.current) modalAdd.current.focus();
    }, 200);
};