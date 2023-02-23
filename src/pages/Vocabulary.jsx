import React, { useState, useRef } from 'react';
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
//styles
import cl from '../components/UI/BtnAddCard/BtnAddCard.module.css';
import themecss from '../styles/theme.css'
import vocabularyCss from '../styles/Vocabulary.css'
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setSearchWord } from '../store/upMenu';
import { setInput } from '../store/upMenu';
import { setInputValue } from '../store/modalRenameCard';
import { setIsModalAddCardActive } from '../store/modalAddCard';
import { setOptionName } from '../store/select';
import { setOptionState } from '../store/select';
import { setSelectOptions } from '../store/select';
const Vocabulary = function ({ Cards, setCards }) {
    // const { height, width } = useScrollbarSize();

    //redux
    const searchWord = useSelector(state => state.upMenu.searchWord)
    const input = useSelector(state => state.upMenu.input);
    const inputValue = useSelector(state => state.modalRenameCard.inputValue)
    const optionState = useSelector(state => state.select.optionState)
    const selectOptions = useSelector(state => state.select.selectOptions)
    const dispatch = useDispatch()

    const [chooseTheme, setChooseTheme] = useState('');
    const modalAdd = useRef();
    const modalChangeCard = useRef();

    function AddNewCard(e) {
        e.preventDefault()
        if (inputValue.word && inputValue.translate) {
            setCards([...Cards, inputValue])
            addNewTheme(selectOptions, inputValue.theme)

            dispatch(setIsModalAddCardActive(false));
            dispatch(setInputValue({ word: '', translate: '', theme: '', }))
        } else window.alert('Поля "Word" и "Translate" должны быть заполнены')
    };

    function addNewTheme(selectOptions, newTheme) {
        // ADDNewTheme(selectOptions, newTheme, setSelectOptions);

        let opt = [...selectOptions];
        let a = 0;
        for (let index = 0; index < opt.length; index++) {
            const element = opt[index];
            if (element == newTheme) a = 1;
        }
        if (!a) dispatch(setSelectOptions([...selectOptions, newTheme]))
    };

    function removeCard(cardClick) {
        setCards(Cards.filter(card => cardClick.word != card.word && cardClick.translate != card.translate))
    };

    function removeInput(elem) {
        let a = false;
        const idElement = elem.target.id; // simplification
        const classElement = elem.target.className; // simplification
        const btnClass = classElement !== [cl.btnAddCard, 'noClick'].join(' '); // track button click

        if (input.isOpen && idElement != 1 && idElement != 2) {
            dispatch(setSearchWord(''))
            dispatch(setInput({ isOpen: false, after: input.after }))
        };

        if (idElement != 'select1' && idElement != 'select2' && classElement != 'selSVG' && idElement != 'select3') {
            if ((elem.target.parentNode.id == 'options' || chooseTheme) && btnClass) a = true;
            dispatch(setOptionState({ open: false, removeMark: a }))
        };
    };

    function removeTheme() {
        // _removeTheme(setSelectOptions, selectOptions, chooseTheme, setChooseTheme)
        dispatch(setSelectOptions(selectOptions.filter(theme => theme != chooseTheme)))
        setChooseTheme('');
        dispatch(setOptionName('Choose a theme'))
        dispatch(setOptionState({ ...optionState, removeMark: false }))
    }

    const selectedAndSearchedWord = useCards(Cards, chooseTheme, searchWord);
    function modalAddCard() {
        dispatch(setIsModalAddCardActive(true));
        setTimeout(() => { modalAdd.current.focus() }, 200);
    }
    // if (modal || modalCards) paramsModal = { overflow: 'hidden', paddingRight: width };
    return (
        <div onClick={removeInput} className={"searchWrapper"} style={paramsModal}>
            <MenuVoc />
            <Modal
                Cards={Cards}
                setCards={setCards}
                modalChangeCard={modalChangeCard}
            />
            <ModalAddCards
                modalAdd={modalAdd}
                AddNewCard={AddNewCard}
            />
            <div className="CardsField">
                <div className='wrap'>
                    <BtnAddCard onClick={modalAddCard} style={btnStyle}>Create new card</BtnAddCard>
                    <MySelect setChooseTheme={setChooseTheme}/>
                    {selectedAndSearchedWord.length !== 0 ?
                        < SetCard
                            remove={removeCard}
                            Cards={selectedAndSearchedWord}
                            modalChangeCard={modalChangeCard}
                        />
                        : <RemoveTheme removeTheme={removeTheme} />}

                </div>
            </div>
        </div >
    )
};
export default Vocabulary;