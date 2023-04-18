import React from 'react';
// components
import FormEditCard from './FormEditCard';
// functions
import { keyClose } from '../../../functions/keyClose';
import { removeModal } from '../../../functions/removeModal';
// styles
import style from './Modal.module.css'
// redux
import { useSelector, useDispatch } from 'react-redux';
import { setModal, setEditCard } from '../../../store/reducers/modalRenameCard';
const ModalEditCard = function ({ modalChangeCard }) {
    const isModalActive = useSelector(state => state.modalRenameCard.isModalActive)
    const dispatch = useDispatch();

    let visible = isModalActive
        ? [style.modal, style.active].join(' ')
        : style.modal;

    return (
        <div
            onKeyDown={e => keyClose(e, setModal, dispatch)}
            onClick={() => removeModal(setModal, dispatch, setEditCard)}
            className={visible}
        >
            <div onClick={e => (e.stopPropagation())} className={style.modalContent}>
                <div className={style.modalMarg}>
                    <div className={style.modalNav}>
                        <h5 className={style.modalTitle}>Edit card</h5>
                        <button
                            onClick={() => removeModal(setModal, dispatch, setEditCard)}
                            className={style.modalClose}
                            aria-label="close"
                        >
                            &times;
                        </button>
                    </div>
                </div>
                <div className={style.modalInputs}>
                    <FormEditCard modalChangeCard={modalChangeCard} />
                </div >
            </div >
        </div >
    )
};
export default ModalEditCard;