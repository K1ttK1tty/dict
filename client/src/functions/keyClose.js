export const keyClose = (e, closeModal, dispatch, object) => {
    if (e.code === 'Escape') {
        dispatch(closeModal(false));
        if (object) dispatch(object({ word: '', translate: '', theme: ''}))
    }
}