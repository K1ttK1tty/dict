import { TRemoveModal } from './functoinModels';

export const removeModal: TRemoveModal = (setModal, dispatch, object) => {
    if (setModal) setModal(false);
    if (object && dispatch) dispatch(object({ id: 0, word: '', translate: '', theme: '', note: '', favorite: false }));
};
