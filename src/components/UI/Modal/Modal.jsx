import React from 'react';
import cl from './Modal.module.css'
import InputAddCard from '../InputAddCard/InputAddCard';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
import { inputAddCardstyles, btnForm } from '../../../consts/consts';
import { keyClose } from '../../../functions/keyClose';
const Modal = function ({ modal, setInputValue, inputValue, setModal, setEditCard, editCard, setCards, Cards, index, modalChangeCard }) {
    let visible = [cl.modal];
    if (modal) visible = [cl.modal, cl.active].join(' ')
    function removeModal() {
        setEditCard({ word: '', translate: '', theme: '', })
        shared();
    };
    function ChangeCard(e) {
        e.preventDefault();
        setCards([...Cards.slice(0, index), { word: inputValue.word, translate: inputValue.translate, theme: editCard.theme, }, ...Cards.slice(index + 1)]);
        shared();
    };
    function shared() {
        setModal(false);
        setInputValue({ word: '', translate: '', theme: '', });
    };

    return (
        <div onKeyDown={e => keyClose(e, setModal, setInputValue)} onClick={removeModal} className={visible}>
            <div onClick={e => (e.stopPropagation())} className={cl.modalContent}>
                <div className={cl.modalMarg}>
                    <div className={cl.modalNav}>
                        <h5 className={cl.modalTitle}>Edit card</h5>
                        <button onClick={removeModal} className={cl.modalClose} aria-label="close">&times;</button>
                    </div>
                </div>
                <div className={cl.modalInputs}>
                    <form>
                        <div className={cl.inputDiv}><p className={cl.inputP}>Word:</p><InputAddCard modalChangeCard={modalChangeCard} inputValue={inputValue.word} setInputValue={e => setInputValue({ ...inputValue, word: e })} placeholder={editCard.word} style={inputAddCardstyles}></InputAddCard></div>
                        <div className={cl.inputDiv}><p className={cl.inputP}>Translate:</p><InputAddCard inputValue={inputValue.translate} setInputValue={e => setInputValue({ ...inputValue, translate: e })} placeholder={editCard.translate} style={inputAddCardstyles}></InputAddCard></div>
                        <div className={cl.inputDiv}><p className={cl.inputP}>Theme: </p><InputAddCard disabled={true} inputValue={inputValue.theme} setInputValue={e => setInputValue({ ...inputValue, theme: e })} placeholder={editCard.theme} style={inputAddCardstyles}></InputAddCard></div>
                        <BtnAddCard aria={'change'} onClick={ChangeCard} type='submit' style={btnForm}>Change</BtnAddCard>
                    </form>
                </div>
            </div>
        </div>
    )
};
export default Modal;