import React from 'react';
import cl from './Modal.module.css'
import InputAddCard from '../InputAddCard/InputAddCard';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
import { inputAddCardstyles, btnForm } from '../../../consts/consts';
import { keyClose } from '../../../functions/keyClose';
import { removeModal } from '../../../functions/removeModal';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setModal, setEditCard } from '../../../store/reducers/modalRenameCard';
import { changeCardFields } from '../../../store/reducers/authorization/AuthSlice';
const ModalEditCard = function ({ modalChangeCard }) {
    const isModalActive = useSelector(state => state.modalRenameCard.isModalActive)
    const editCard = useSelector(state => state.modalRenameCard.editCard)
    const changeCard = useSelector(state => state.AuthSlice.changeCard)
    const dispatch = useDispatch();

    let visible = [cl.modal];
    if (isModalActive) visible = [cl.modal, cl.active].join(' ');
    function removeModalEditCard() {
        dispatch(setEditCard({ word: '', translate: '', theme: '' }))
        removeModal(setModal, dispatch)
    };
    function ChangeCard(e) {
        e.preventDefault();
        dispatch(changeCardFields({ old: changeCard, new: editCard }))
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
                    <form>
                        <div className={cl.inputDiv}>
                            <p className={cl.inputP}>Word:</p>
                            <InputAddCard
                                modalChangeCard={modalChangeCard}
                                inputValue={editCard.word}
                                setValue={e => dispatch(setEditCard({ ...editCard, word: e }))}
                                style={inputAddCardstyles}
                            />
                        </div>
                        <div className={cl.inputDiv}>
                            <p className={cl.inputP}>Translate:</p>
                            <InputAddCard
                                inputValue={editCard.translate}
                                setValue={e => dispatch(setEditCard({ ...editCard, translate: e }))}
                                style={inputAddCardstyles}
                            />
                        </div>
                        <div className={cl.inputDiv}>
                            <p className={cl.inputP}>Theme: </p>
                            <InputAddCard
                                disabled={true}
                                inputValue={editCard.theme}
                                setValue={e => dispatch(setEditCard({ ...editCard, theme: e }))}
                                style={inputAddCardstyles}
                            />
                        </div>
                        <BtnAddCard aria={'change'} onClick={ChangeCard} style={btnForm} children='Change' />
                    </form >
                </div >
            </div >
        </div >
    )
};
export default ModalEditCard;