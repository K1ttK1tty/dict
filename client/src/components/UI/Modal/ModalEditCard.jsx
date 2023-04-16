import React from 'react';
// components
import FormEditCard from './FormEditCard';
// functions
import { keyClose } from '../../../functions/keyClose';
import { removeModal } from '../../../functions/removeModal';
// styles
import cl from './Modal.module.css'
// redux
import { useSelector, useDispatch } from 'react-redux';
import { setModal, setEditCard } from '../../../store/reducers/modalRenameCard';
const ModalEditCard = function ({ modalChangeCard }) {
    const isModalActive = useSelector(state => state.modalRenameCard.isModalActive)
    const dispatch = useDispatch();

    let visible = [cl.modal];
    if (isModalActive) visible = [cl.modal, cl.active].join(' ');
    function removeModalEditCard() {
        dispatch(setEditCard({ word: '', translate: '', theme: '' }))
        removeModal(setModal, dispatch)
    };

    return (
        <div
            onKeyDown={e => keyClose(e, setModal, dispatch)}
            onClick={removeModalEditCard}
            className={visible}
        >
            <div onClick={e => (e.stopPropagation())} className={cl.modalContent}>
                <div className={cl.modalMarg}>
                    <div className={cl.modalNav}>
                        <h5 className={cl.modalTitle}>Edit card</h5>
                        <button onClick={removeModalEditCard} className={cl.modalClose} aria-label="close">&times;</button>
                    </div>
                </div>
                <div className={cl.modalInputs}>
                    <FormEditCard modalChangeCard={modalChangeCard} />
                </div >
            </div >
        </div >
    )
};
export default ModalEditCard;