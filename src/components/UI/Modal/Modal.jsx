import React from 'react';
import cl from './Modal.module.css'
import InputAddCard from '../InputAddCard/InputAddCard';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
const Modal = function ({ modal, setInputValue, inputValue, setModal, editCard, setCards, Cards, index,...props }) {
    let visible = [cl.modal]

    if (modal) {
        visible = [cl.modal, cl.active].join(' ')

    }
    function removeModal() {
        setModal(false);
        // visible = [cl.modal]
    }
    function ChangeCard(e) {
        e.preventDefault()
        // console.log(Cards)
        // filterCardsAfterEdit(editCard);
        // removeCard(editCard);
        setCards([...Cards.slice(0, index), { word: inputValue.word, translate: inputValue.translate, theme: editCard.theme, }, ...Cards.slice(index + 1)]);
        setModal(false);
        setInputValue({ word: '', translate: '', theme: '', });

        // Cards.filter(card=> setCards([card.word != inputValue.word]))

    }



    return (
        <div className={visible}>
            <div className={cl.modalContent}>
                <div className={cl.modalMarg}>
                    <div className={cl.modalNav}>
                        <h5 style={{ fontSize: '20px', fontWeight: '500' }} className={cl.modalTitle}>Edit card</h5>
                        <div onClick={removeModal} className={cl.modalClose}>&times;</div>
                    </div>
                    <hr />
                </div>
                <div className={cl.modalInputs}>
                    <form>

                        <div className={cl.inputDiv}><p className={cl.inputP}>Word:</p><InputAddCard inputValue={inputValue.word} setInputValue={e => setInputValue({ ...inputValue, word: e })} placeholder={editCard.word} style={{ marginBottom: '18px', border: 'none', borderBottom: '1px solid black', borderRadius: '0px' }}></InputAddCard></div>
                        <div className={cl.inputDiv}><p className={cl.inputP}>Translate:</p><InputAddCard inputValue={inputValue.translate} setInputValue={e => setInputValue({ ...inputValue, translate: e })} placeholder={editCard.translate} style={{ marginBottom: '18px', border: 'none', borderBottom: '1px solid black', borderRadius: '0px', }}></InputAddCard></div>
                        <div className={cl.inputDiv}><p className={cl.inputP}>Theme: </p><InputAddCard disabled={true} inputValue={inputValue.theme} setInputValue={e => setInputValue({ ...inputValue, theme: e })} placeholder={editCard.theme} style={{ marginBottom: '18px', border: 'none', borderBottom: '1px solid black', borderRadius: '0px', }}></InputAddCard></div>
                        <BtnAddCard onClick={ChangeCard} type='submit' style={{ fontSize: '18px', padding: '12px', background: 'rgb(146, 146, 146)', width: '100%' }}>Change</BtnAddCard>
                        {/* <InputAddCard style={{marginBottom:'15px',border:'0.5px solid black'}}></InputAddCard> */}
                    </form>
                </div>

            </div>
        </div>
    )
};
export default Modal;