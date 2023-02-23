import React from 'react';
import cl from './Modal.module.css'
import InputAddCard from '../InputAddCard/InputAddCard';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
import { inputAddCardstyles, btnForm } from '../../../consts/consts';
import { keyClose } from '../../../functions/keyClose';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setModal } from '../../../store/modalRenameCard';
import { setInputValue } from '../../../store/modalRenameCard';
import { setEditCard } from '../../../store/modalRenameCard';
const Modal = function ({ setCards, Cards, modalChangeCard }) {

    const index = useSelector(state => state.modalRenameCard.indexCard)
    const isModalActive = useSelector(state => state.modalRenameCard.isModalActive)
    const inputValue = useSelector(state => state.modalRenameCard.inputValue)
    const editCard = useSelector(state => state.modalRenameCard.editCard)
    const dispatch = useDispatch();


    let visible = [cl.modal];
    if (isModalActive) visible = [cl.modal, cl.active].join(' ')
    function removeModal() {
        dispatch(setEditCard({ word: '', translate: '', theme: '', }))
        shared();
    };
    function ChangeCard(e) {
        e.preventDefault();
        setCards([...Cards.slice(0, index), { word: inputValue.word, translate: inputValue.translate, theme: inputValue.theme, }, ...Cards.slice(index + 1)]);
        shared();
    };
    function shared() {
        dispatch(setModal(false))
        dispatch(setInputValue({ word: '', translate: '', theme: '', }))

    }

    function keyClose(e) {
        if (e.code === 'Escape') {
            dispatch(setModal(false))
            dispatch(setInputValue({ word: '', translate: '', theme: '', }))
        }
    }


    return (
        <div onKeyDown={e => keyClose(e)} onClick={removeModal} className={visible}>
            <div onClick={e => (e.stopPropagation())} className={cl.modalContent}>
                <div className={cl.modalMarg}>
                    <div className={cl.modalNav}>
                        <h5 className={cl.modalTitle}>Edit card</h5>
                        <button onClick={removeModal} className={cl.modalClose} aria-label="close">&times;</button>
                    </div>
                </div>
                <div className={cl.modalInputs}>
                    <form>
                        <div className={cl.inputDiv}><p className={cl.inputP}>Word:</p><InputAddCard modalChangeCard={modalChangeCard} inputValue={inputValue.word} setValue={e => dispatch(setInputValue({ ...inputValue, word: e }))} placeholder={editCard.word} style={inputAddCardstyles} /></div>
                        <div className={cl.inputDiv}><p className={cl.inputP}>Translate:</p><InputAddCard inputValue={inputValue.translate} setValue={e => dispatch(setInputValue({ ...inputValue, translate: e }))} placeholder={editCard.translate} style={inputAddCardstyles} /></div>
                        <div className={cl.inputDiv}><p className={cl.inputP}>Theme: </p><InputAddCard disabled={true} inputValue={inputValue.theme} setValue={e => dispatch(setInputValue({ ...inputValue, theme: e }))} placeholder={editCard.theme} style={inputAddCardstyles} /></div>
                        <BtnAddCard aria={'change'} onClick={ChangeCard} type='submit' style={btnForm}>Change</BtnAddCard>
                    </form >
                </div >
            </div >
        </div >
    )
};
export default Modal;