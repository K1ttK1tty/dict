import React from 'react';
import cl from '../Modal/Modal.module.css'
import InputAddCard from '../InputAddCard/InputAddCard';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
const ModalAddCards = function ({ modalCards, setModalCards, inputValue, setInputValue, AddNewCard }) {
    let vis = [cl.modal];
    if (modalCards) vis = [cl.modal, cl.active].join(' ')
    const styles = { width: '100%', display: 'block', marginBottom: '15px', marginBottom: '18px', border: 'none', borderBottom: '1px solid black', borderRadius: '0px' };
    const h5Style = { fontSize: '20px', fontWeight: '500' };
    function removeModal() {
        setModalCards(!modalCards)
        setInputValue({ word: '', translate: '', theme: '' })
    }


    return (
        <div className={vis} onClick={removeModal}>
            <div onClick={e => (e.stopPropagation())} className={cl.modalContent}>
                <div className={cl.modalMarg}>
                    <div className={cl.modalNav}>
                        <h5 className={cl.modalTitle}>Creating card</h5>
                        <div onClick={removeModal} className={cl.modalClose}>&times;</div>
                    </div>
                </div>
                <form>
                    <InputAddCard style={styles} placeholder={'Word'} inputValue={inputValue.word} setInputValue={e => setInputValue({ ...inputValue, word: e })}></InputAddCard>
                    <InputAddCard style={styles} placeholder={'Translate'} inputValue={inputValue.translate} setInputValue={e => setInputValue({ ...inputValue, translate: e })}></InputAddCard>
                    <InputAddCard style={styles} placeholder={'Theme'} inputValue={inputValue.theme} setInputValue={e => setInputValue({ ...inputValue, theme: e })}></InputAddCard>
                    <BtnAddCard style={{ width: '100%', background: 'rgb(136, 214, 47)', border: 'none' }} onClick={AddNewCard} type='submit'>Create</BtnAddCard>
                </form>
            </div>
        </div>
    )
};
export default ModalAddCards;