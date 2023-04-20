export const keyClose = (e, closeModal, dispatch, object) => {
    if (e.code === 'Escape') {

        if (dispatch) {
            dispatch(closeModal(false));
        } else {
            closeModal(false)
        }

        if (object) dispatch(object({ word: '', translate: '', theme: '' }))
    }
}