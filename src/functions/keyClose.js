export const keyClose = (e,closeModal, object)=>{
    if (e.code === 'Escape'){
        closeModal(false)
        object({ word: '', translate: '', theme: '', })
    }
}