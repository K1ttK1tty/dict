export const removeModal = (setModal, dispatch, object) => {
    if (dispatch) dispatch(setModal(false))
    else setModal(false)
    
    if (object) dispatch(object({ word: '', translate: '', theme: '' }))
}