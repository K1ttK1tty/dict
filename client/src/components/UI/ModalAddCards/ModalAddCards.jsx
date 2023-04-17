import React, { useEffect } from 'react';
// components
import FormAddCard from './FormAddCard';
//functions
import { keyClose } from '../../../functions/keyClose';
import { removeModal } from '../../../functions/removeModal';
//styles
import style from '../Modal/Modal.module.css'
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue } from '../../../store/reducers/modalRenameCard';
import { setIsModalAddCardActive } from '../../../store/reducers/modalAddCard';

const ModalAddCards = function ({ modalAdd }) {
    const dispatch = useDispatch()
    const isModalAddCardActive = useSelector(state => state.modalAddCard.isModalAddCardActive)

    useEffect(() => {
        return () => dispatch(setInputValue({ word: '', translate: '', theme: '' }))
    }, [isModalAddCardActive]);

    let vis = [style.modal];
    if (isModalAddCardActive) vis = [style.modal, style.active].join(' ')
    
    return (
        <div
            className={vis}
            onKeyDown={e => keyClose(e, setIsModalAddCardActive, dispatch, setInputValue)}
            onClick={() => removeModal(setIsModalAddCardActive, dispatch, setInputValue)}
        >
            <div onClick={e => (e.stopPropagation())} className={style.modalContent}>
                <div className={style.modalMarg}>
                    <div className={style.modalNav}>
                        <h5 className={style.modalTitle}>Creating card</h5>
                        <button
                            onClick={() => removeModal(setIsModalAddCardActive, dispatch, setInputValue)}
                            className={style.modalClose}
                            aria-label="close"
                        >&times;</button>
                    </div>
                </div>
                <FormAddCard modalAdd={modalAdd} />
            </div>
        </div>
    )
};
export default ModalAddCards;