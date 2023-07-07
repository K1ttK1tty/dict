// redux
import { setChangeCard } from '../store/reducers/authorization/Authorization/AuthSlice';
import { setEditCard, setModal, setIndexCard } from '../store/reducers/modalRenameCard';
// types
import { TEditWord } from './functoinModels';
export const editWord: TEditWord = (card, index, modalChangeCard, dispatch) => {
    dispatch(setIndexCard(index));
    dispatch(setChangeCard(card));
    dispatch(setEditCard(card));
    dispatch(setModal(true));
    setTimeout(() => {
        if (modalChangeCard.current) modalChangeCard.current.focus();
    }, 170);
};