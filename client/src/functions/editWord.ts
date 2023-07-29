import { setChangeCard } from '../store/reducers/authorization/Authorization/AuthSlice';
import { setEditCard, setIndexCard } from '../store/reducers/modalRenameCard';

import { TEditWord } from './functoinModels';

export const editWord: TEditWord = (card, index, setIsEditCardModal, modalChangeCard, dispatch) => {
    dispatch(setIndexCard(index));
    dispatch(setChangeCard(card));
    dispatch(setEditCard(card));
    setIsEditCardModal(true);
    setTimeout(() => {
        if (modalChangeCard.current) modalChangeCard.current.focus();
    }, 170);
};
