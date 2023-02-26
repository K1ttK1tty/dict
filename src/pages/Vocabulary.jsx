import React, { useRef } from 'react';
import { useCards } from '../hooks/useCards';
import useScrollbarSize from 'react-scrollbar-size';
//components
import MenuVoc from '../components/MenuVoc';
import SetCard from '../components/UI/WordCard/SetCard';
import BtnAddCard from '../components/UI/BtnAddCard/BtnAddCard';
import MySelect from '../components/UI/MySelect/MySelect';
import Modal from '../components/UI/Modal/Modal';
import ModalAddCards from '../components/UI/ModalAddCards/ModalAddCards';
import RemoveTheme from '../components/RemoveTheme';
//functions
import { _AddNewCard } from '../functions/_AddNewCard'
import { ADDNewTheme } from '../functions/ADDNewTheme.js'
import { _removeTheme } from '../functions/_removeTheme.js';
import { paramsModal, btnStyle } from '../consts/consts';
import { removeInput } from '../functions/removeInput';
import { modalAddCard } from '../functions/modalAddCard';
//styles
import themecss from '../styles/theme.css'
import vocabularyCss from '../styles/Vocabulary.css'
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue } from '../store/modalRenameCard';
import { setIsModalAddCardActive } from '../store/modalAddCard';
import { setSelectOptions } from '../store/select';
import { setCards } from '../store/Cards';
import { setID } from '../store/Cards';
const Vocabulary = function () {
    // const { height, width } = useScrollbarSize();
    //redux
    const Cards = useSelector(state => state.Cards.cards)
    const searchWord = useSelector(state => state.upMenu.searchWord)
    const input = useSelector(state => state.upMenu.input);
    const inputValue = useSelector(state => state.modalRenameCard.inputValue)
    const selectOptions = useSelector(state => state.select.selectOptions)
    const chooseTheme = useSelector(state => state.select.chooseTheme)
    const dispatch = useDispatch()
    const modalAdd = useRef();
    const modalChangeCard = useRef();

    function AddNewCard(e) {
        e.preventDefault()
        if (inputValue.word && inputValue.translate) {
            dispatch(setCards([...Cards, { id: Cards.length + 1, ...inputValue }]))
            ADDNewTheme(selectOptions, inputValue.theme, setSelectOptions, dispatch)
            dispatch(setIsModalAddCardActive(false));
            dispatch(setInputValue({ word: '', translate: '', theme: '', }))
        } else window.alert('Поля "Word" и "Translate" должны быть заполнены')
    };

    function removeCard(cardClickID) {
        const cards = [...Cards.filter(card => cardClickID != card.id)]
        dispatch(setCards(cards))
        dispatch(setID())
    };

    const selectedAndSearchedWord = useCards([...Cards], chooseTheme, searchWord);
    // if (modal || modalCards) paramsModal = { overflow: 'hidden', paddingRight: width };
    return (
        <div
            onClick={elem => removeInput(elem, input, chooseTheme, dispatch)}
            className={"searchWrapper"}
            style={paramsModal}
        >
            <MenuVoc />
            <Modal modalChangeCard={modalChangeCard} />
            <ModalAddCards
                modalAdd={modalAdd}
                AddNewCard={AddNewCard}
            />
            <div className="CardsField">
                <div className='wrap'>
                    <BtnAddCard
                        onClick={() => modalAddCard(modalAdd, dispatch)}
                        style={btnStyle}
                        children='Create new card'
                    />
                    <MySelect />
                    {selectedAndSearchedWord.length !== 0 ?
                        < SetCard
                            remove={removeCard}
                            Cards={selectedAndSearchedWord}
                            modalChangeCard={modalChangeCard}
                        />
                        : <RemoveTheme chooseTheme={chooseTheme} />}
                </div>
            </div>
        </div >
    )
};
export default Vocabulary;