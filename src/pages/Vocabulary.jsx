import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import vocabularyCss from '../styles/Vocabulary.css'
import themecss from '../styles/theme.css'
import MenuVoc from '../components/MenuVoc';
import SetCard from '../components/UI/WordCard/SetCard';
import BtnAddCard from '../components/UI/BtnAddCard/BtnAddCard';
import cl from '../components/UI/BtnAddCard/BtnAddCard.module.css';
import MySelect from '../components/UI/MySelect/MySelect';
import Modal from '../components/UI/Modal/Modal';
import { useCards } from '../hooks/useCards';
import ModalAddCards from '../components/UI/ModalAddCards/ModalAddCards';
import RemoveTheme from '../components/RemoveTheme';
import useScrollbarSize from 'react-scrollbar-size';
const Vocabulary = function ({ Cards, setCards }) {
    // const { height, width } = useScrollbarSize();
    const [searchWord, setSearchWord] = useState('');
    const [chooseTheme, setChooseTheme] = useState('');
    const [modal, setModal] = useState(false);
    const [modalCards, setModalCards] = useState(false);
    const [index, setIndex] = useState();
    const [stateOption, setStateOption] = useState({ option: false, remove: false });
    const [replaceOptionName, setReplaceOptionName] = useState('Choose a theme');
    const [selectOptions, setSelectOptions] = useState(['noun', 'verb',])
    const [inputValue, setInputValue] = useState({ word: '', translate: '', theme: '' });
    const [input, setInput] = useState({ before: false, after: '' });
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
        let opt = [...selectOptions];
        let a = 0;
        for (let index = 0; index < opt.length; index++) {
            const element = opt[index];
            if (element == newTheme) a = 1;
        }
        if (!a) setSelectOptions([...selectOptions, newTheme]);
    };

    function removeCard(cardClick) {
        setCards(Cards.filter(card => cardClick.word != card.word && cardClick.translate != card.translate))
    };

    function removeInput(elem) {
        let a = false;
        const idElement = elem.target.id; // simplification
        const classElement = elem.target.className; // simplification
        const btnClass = classElement !== [cl.btnAddCard, 'noClick'].join(' '); // track button click

        if (input.before && idElement != 1 && idElement != 2) {
            setSearchWord('');
            setInput({ before: false, after: input.after })
        };


        if (idElement != 'select1' && idElement != 'select2' && classElement != 'selSVG' && idElement != 'select3') {
            if ((elem.target.parentNode.id == 'options' || chooseTheme) && btnClass) a = true;
            setStateOption({ option: false, remove: a });
        };
    };

    function removeTheme() {
        setSelectOptions(selectOptions.filter(theme => theme != chooseTheme));
        setReplaceOptionName('Choose a theme');
        setChooseTheme('');
    }

    const selectedAndSearchedWord = useCards(Cards, chooseTheme, searchWord);
    function modalAddCard() {
        setModalCards(!modalCards);
        setTimeout(() => { modalAdd.current.focus(); }, 200);
    }

    let paramsModal = { overflow: 'auto', paddingRight: '0px' };
    // if (modal || modalCards) paramsModal = { overflow: 'hidden', paddingRight: width };
    const btnStyle = { margin: '0px auto', display: 'block' };
    return (
        <div onClick={removeInput} className={"searchWrapper"} style={paramsModal}>
            <MenuVoc
                input={input}
                setInput={setInput}
                searchWord={searchWord}
                setSearchWord={setSearchWord}
                cards={Cards}
            />
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