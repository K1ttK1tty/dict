import React from 'react';
import InputAddCard from '../InputAddCard/InputAddCard';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
// import { keyClose } from '../../../functions/keyClose';
//styles
import cl from '../Modal/Modal.module.css'
import { styles } from '../../../consts/consts';
import { btnStyleModalAddCards } from '../../../consts/consts';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue } from '../../../store/modalRenameCard';
import { setIsModalAddCardActive } from '../../../store/modalAddCard';
const ModalAddCards = function ({ AddNewCard, modalAdd }) {

    const dispatch = useDispatch()
    const inputValue = useSelector(state => state.modalRenameCard.inputValue)
    const isModalAddCardActive = useSelector(state => state.modalAddCard.isModalAddCardActive)

    const btnStyle = btnStyleModalAddCards;

    let vis = [cl.modal];
    if (isModalAddCardActive) vis = [cl.modal, cl.active].join(' ')

    function removeModal() {
        dispatch(setIsModalAddCardActive(false))
        dispatch(setInputValue({ word: '', translate: '', theme: '' }))
    }

    function keyClose(e) {
        if (e.code === 'Escape') {
            dispatch(setIsModalAddCardActive(false))
            dispatch(setInputValue({ word: '', translate: '', theme: '' }))
        }
    }


    return (
        <div className={vis} onKeyDown={keyClose} onClick={removeModal}>
            <div onClick={e => (e.stopPropagation())} className={cl.modalContent}>
                <div className={cl.modalMarg}>
                    <div className={cl.modalNav}>
                        <h5 className={cl.modalTitle}>Creating card</h5>
                        <button onClick={removeModal} className={cl.modalClose} aria-label="close">&times;</button>
                    </div>
                </div>
                <form>
                    <InputAddCard modalAdd={modalAdd} style={styles} placeholder={'Word'} inputValue={inputValue.word} setValue={e => dispatch(setInputValue({ ...inputValue, word: e }))} />
                    <InputAddCard style={styles} placeholder={'Translate'} inputValue={inputValue.translate} setValue={e => dispatch(setInputValue({ ...inputValue, translate: e }))} />
                    <InputAddCard style={styles} placeholder={'Theme'} inputValue={inputValue.theme} setValue={e => dispatch(setInputValue({ ...inputValue, theme: e }))} />
                    <BtnAddCard aria={'Create'} style={btnStyle} onClick={AddNewCard} type='submit'>Create</BtnAddCard>
                </form>
            </div>
        </div>
    )
};
export default ModalAddCards;