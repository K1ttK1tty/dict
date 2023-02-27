import React, { useEffect } from 'react';
import InputAddCard from '../InputAddCard/InputAddCard';
import BtnAddCard from '../BtnAddCard/BtnAddCard';
//functions
import { keyClose } from '../../../functions/keyClose';
import { removeModal } from '../../../functions/removeModal';
import { addNewCard } from '../../../functions/addNewCard';
//styles
import cl from '../Modal/Modal.module.css'
import { styles } from '../../../consts/consts';
import { btnStyleModalAddCards } from '../../../consts/consts';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue } from '../../../store/modalRenameCard';
import { setIsModalAddCardActive } from '../../../store/modalAddCard';
import { setThemeInputValue } from '../../../store/modalRenameCard';
const ModalAddCards = function ({ modalAdd }) {
    const dispatch = useDispatch()
    const selectOptions = useSelector(state => state.select.selectOptions)
    const Cards = useSelector(state => state.Cards.cards)
    const inputValue = useSelector(state => state.modalRenameCard.inputValue)
    const isModalAddCardActive = useSelector(state => state.modalAddCard.isModalAddCardActive)
    const chooseTheme = useSelector(state => state.select.chooseTheme)

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

                <form>
                    <InputAddCard
                        modalAdd={modalAdd}
                        style={styles} placeholder={'Word'}
                        inputValue={inputValue.word}
                        setValue={e => dispatch(setInputValue({ ...inputValue, word: e }))}
                    />
                    <InputAddCard
                        style={styles}
                        placeholder={'Translate'}
                        inputValue={inputValue.translate}
                        setValue={e => dispatch(setInputValue({ ...inputValue, translate: e }))}
                    />
                    <InputAddCard
                        style={styles}
                        placeholder={'Theme'}
                        inputValue={inputValue.theme}
                        setValue={e => dispatch(setInputValue({ ...inputValue, theme: e }))}
                    />
                    <BtnAddCard
                        aria={'Create'}
                        style={btnStyleModalAddCards}
                        onClick={e => addNewCard(e, inputValue, Cards, selectOptions, dispatch)}
                        type='submit'
                        children='Create'
                    />
                </form>

            </div>
        </div>
    )
};
export default ModalAddCards;