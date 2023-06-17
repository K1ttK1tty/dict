// redux
import { setChangeCard } from '../store/reducers/authorization/Authorization/AuthSlice';
import { setEditCard, setModal, setIndexCard } from '../store/reducers/modalRenameCard';
// types
import { ICard } from '../store/reducers/authorization/Authorization/AuthTypes';
import { AppDispatch } from '../store/store';
type FunctType = (
    card: ICard,
    index: number,
    modalChangeCard: React.MutableRefObject<HTMLInputElement | null>,
    dispatch: AppDispatch,
) => void;
export const editWord: FunctType = (card, index, modalChangeCard, dispatch) => {
    dispatch(setIndexCard(index));
    dispatch(setChangeCard(card));
    dispatch(setEditCard(card));
    dispatch(setModal(true));
    setTimeout(() => {
        if (modalChangeCard.current) modalChangeCard.current.focus();
    }, 170);
};