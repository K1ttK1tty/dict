export const removeModal = (setModal, dispatch, object) => {
    dispatch(setModal(false))
    if (object) dispatch(object({ word: '', translate: '', theme: ''}))
}