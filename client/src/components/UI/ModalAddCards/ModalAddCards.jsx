import React, { useEffect } from 'react';
// components
import FormAddCard from './FormAddCard';
//functions
import { keyClose } from '../../../functions/keyClose';
import { removeModal } from '../../../functions/removeModal';
//styles
import cl from '../Modal/Modal.module.css'
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue, setThemeInputValue } from '../../../store/reducers/modalRenameCard';
import { setIsModalAddCardActive } from '../../../store/reducers/modalAddCard';

const ModalAddCards = function ({ modalAdd }) {
    const dispatch = useDispatch()
    const isModalAddCardActive = useSelector(state => state.modalAddCard.isModalAddCardActive)
    const chooseTheme = useSelector(state => state.AuthSlice.chooseTheme)

    useEffect(() => {
        if (chooseTheme) dispatch(setThemeInputValue(chooseTheme))
        return () => dispatch(setInputValue({ word: '', translate: '', theme: '' }))
    }, [isModalAddCardActive]);

    let vis = [cl.modal];
    if (isModalAddCardActive) vis = [cl.modal, cl.active].join(' ')
    
    return (
        <div
            className={vis}
            onKeyDown={e => keyClose(e, setIsModalAddCardActive, dispatch, setInputValue)}
            onClick={() => removeModal(setIsModalAddCardActive, dispatch, setInputValue)}
        >
            <div onClick={e => (e.stopPropagation())} className={cl.modalContent}>
                <div className={cl.modalMarg}>
                    <div className={cl.modalNav}>
                        <h5 className={cl.modalTitle}>Creating card</h5>
                        <button
                            onClick={() => removeModal(setIsModalAddCardActive, dispatch, setInputValue)}
                            className={cl.modalClose}
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