import React, {useState, useRef} from 'react';
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
import {_AddNewCard} from '../functions/_AddNewCard'
import { ADDNewTheme } from '../functions/ADDNewTheme.js'
import { _removeTheme } from '../functions/_removeTheme.js';
import { paramsModal,btnStyle } from '../consts/consts';
//styles
import cl from '../components/UI/BtnAddCard/BtnAddCard.module.css';
import themecss from '../styles/theme.css'
import vocabularyCss from '../styles/Vocabulary.css'
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setSearchWord } from '../store/upMenu';
import { setInput } from '../store/upMenu';



const Vocabulary = function ({ Cards, setCards, selectOptions, setSelectOptions }) {
    // const { height, width } = useScrollbarSize();
    //redux
    const searchWord = useSelector(state=> state.upMenu.searchWord)
    const input = useSelector (state => state.upMenu.input);
    const dispatch = useDispatch()




    const [chooseTheme, setChooseTheme] = useState('');
    const [modal, setModal] = useState(false);
    const [modalCards, setModalCards] = useState(false);
    const [index, setIndex] = useState();
    const [stateOption, setStateOption] = useState({ option: false, remove: false });
    const [replaceOptionName, setReplaceOptionName] = useState('Choose a theme');
    const [inputValue, setInputValue] = useState({ word: '', translate: '', theme: '' });
    const [editCard, setEditCard] = useState({ word: '', translate: '', theme: '' });
    const modalAdd = useRef();
    const modalChangeCard = useRef();







    function AddNewCard(e) {
        e.preventDefault()
        if (inputValue.word && inputValue.translate) {
            setCards([...Cards, inputValue])
            addNewTheme(selectOptions, inputValue.theme)
            setInputValue({ word: '', translate: '', theme: '', });
        } else window.alert('Поля "Word" и "Translate" должны быть заполнены')
        setModalCards(!modalCards);
    };

    function addNewTheme(selectOptions, newTheme) {
        ADDNewTheme(selectOptions, newTheme, setSelectOptions);
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
            setStateOption({ option: false, remove: a });
        };
    };

    function removeTheme() {
        _removeTheme(setSelectOptions, selectOptions, chooseTheme, setReplaceOptionName, setChooseTheme)
    }

    const selectedAndSearchedWord = useCards(Cards, chooseTheme, searchWord);
    function modalAddCard() {
        setModalCards(!modalCards);
        setTimeout(() => { modalAdd.current.focus(); }, 200);
    }
    // if (modal || modalCards) paramsModal = { overflow: 'hidden', paddingRight: width };

    return (
        <div onClick={removeInput} className={"searchWrapper"} style={paramsModal}>
            <MenuVoc/>
            <Modal
                modalChangeCard={modalChangeCard}
                index={index}
                Cards={Cards}
                setCards={setCards}
                setEditCard={setEditCard}
                editCard={editCard}
                setModal={setModal}
                inputValue={inputValue}
                setInputValue={setInputValue}
                modal={modal}
            />
            <ModalAddCards
                modalAdd={modalAdd}
                AddNewCard={AddNewCard}
                inputValue={inputValue}
                setInputValue={setInputValue}
                modalCards={modalCards}
                setModalCards={setModalCards}
            />
            <div className="CardsField">
                <div className='wrap'>
                    <BtnAddCard onClick={modalAddCard} style={btnStyle}>Create new card</BtnAddCard>
                    <MySelect
                        replaceOptionName={replaceOptionName}
                        setReplaceOptionName={setReplaceOptionName}
                        stateOption={stateOption}
                        setStateOption={setStateOption}
                        setChooseTheme={setChooseTheme}
                        selectOptions={selectOptions}
                    />
                    {selectedAndSearchedWord.length !== 0 ?
                        < SetCard
                            setIndex={setIndex}
                            inputValue={inputValue}
                            editCard={editCard}
                            setEditCard={setEditCard}
                            setModal={setModal}
                            remove={removeCard}
                            Cards={selectedAndSearchedWord}
                            modalChangeCard={modalChangeCard}
                        />
                        : <RemoveTheme chooseTheme={chooseTheme} removeTheme={removeTheme} />}

                </div>
            </div>
        </div >
    )
};
export default Vocabulary;