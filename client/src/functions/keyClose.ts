import { TKeyClose } from './functoinModels';
export const keyClose: TKeyClose = (e, closeModal, dispatch, object) => {
    if (e.code === 'Escape' && closeModal) {
        closeModal(false);
        if (object && dispatch) dispatch(object({ id: 0, word: '', translate: '', theme: '', note: '' }));
    }
};