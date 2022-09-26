import React from 'react';
import { useState, useMemo } from 'react';
import vocabularyCss from '../styles/Vocabulary.css'
import MenuVoc from '../components/MenuVoc';
import SetCard from '../components/UI/WordCard/SetCard';
import BtnAddCard from '../components/UI/BtnAddCard/BtnAddCard';
import MySelect from '../components/UI/MySelect/MySelect';
import Modal from '../components/UI/Modal/Modal';
import { useCards } from '../hooks/useCards';
import ModalAddCards from '../components/UI/ModalAddCards/ModalAddCards';
const Vocabulary = function () {
    const [searchWord, setSearchWord] = useState('');
    const [chooseTheme, setChooseTheme] = useState('');
    const [modal, setModal] = useState(false);
    const [modalCards, setModalCards] = useState(false)

    const [selectOptions, setSelectOptions] = useState([
        'noun',
        'verb',
    ])
    const [Cards, setCards] = useState([
        {
            word: 'Value',
            translate: 'Значение',
            theme: 'noun',
        },
        {
            word: 'to gather',
            translate: 'Собирать, коллекционировать',
            theme: 'verb',
        },
        {
            word: 'to mount',
            translate: 'Монтировать, устанавливать',
            theme: 'verb',
        },
        {
            word: 'to confess',
            translate: 'Признаваться, сознаваться',
            theme: 'verb',
        },
        {
            word: 'to outclass',
            translate: 'Превосходить',
            theme: 'verb',
        },
        {
            word: 'to handle',
            translate: 'обрабатывать',
            theme: 'verb',
        },
        {
            word: 'shared',
            translate: 'общий',
            theme: 'noun',
        },
        // {
        //     word: '1232',
        //     translate: 'no12341234 1234 1234 1234 1234 123 12 3412 3441 2346dsfg sdfgsdrtgwergsd  sefgewrrgsdfgerg werg sdrg erg werwerun',
        //     theme: 'noun',
        // },
    ]);
    const [inputValue, setInputValue] = useState(
        {
            word: '',
            translate: '',
            theme: '',
        }
    );
    const [input, setInput] = useState({
        before: false,
        after: '',
    });

    const [editCard, setEditCard] = useState(
        {
            word: '',
            translate: '',
            theme: '',
        }
    );

    const [index, setIndex] = useState();

    function AddNewCard(e) {
        e.preventDefault()
        if (inputValue.word && inputValue.translate) {
            setCards([...Cards, inputValue])
            addNewTheme(selectOptions, inputValue.theme)
            setInputValue({ word: '', translate: '', theme: '', });
        } else {
            window.alert('Поля "Word" и "Translate" должны быть заполнены')
        }
        setModalCards(!modalCards);
    };

    function addNewTheme(selectOptions, newTheme) {
        let opt = [...selectOptions];
        let a = 0;
        for (let index = 0; index < opt.length; index++) {
            const element = opt[index];
            if (element == newTheme) a = 1;
        }
        if (!a) setSelectOptions([...selectOptions, newTheme])
    };

    function removeCard(cardClick) {
        setCards(Cards.filter(card => cardClick.word != card.word && cardClick.translate != card.translate))
    };
    const [stateOption, setStateOption] = useState({ option: false, remove: false });

    function removeInput(elem) {
        let a = false;
        if (elem.target.id != 1 && elem.target.id != 2) {
            setSearchWord('');
            setInput(
                {
                    before: false,
                    after: '',
                }
            )
        };
        if (elem.target.id != 'select1' && elem.target.id != 'select2' && elem.target.className != 'selSVG' && elem.target.id != 'select3') {
            if (elem.target.parentNode.id == 'options') {
                a = true;
            } else a = false;
            if (chooseTheme) a = true;
            setStateOption({ option: false, remove: a });
        };
    };


    const selectedAndSearchedWord = useCards(Cards, chooseTheme, searchWord);
    function modalAddCard() {
        setModalCards(!modalCards);
    }


    return (
        <div onClick={removeInput} className="searchWrapper">
            <MenuVoc input={input} setInput={setInput} searchWord={searchWord} setSearchWord={setSearchWord} cards={Cards} />
            <Modal index={index} Cards={Cards} setCards={setCards} setEditCard={setEditCard} editCard={editCard} setModal={setModal} inputValue={inputValue} setInputValue={setInputValue} modal={modal}></Modal>
            <ModalAddCards AddNewCard={AddNewCard} inputValue={inputValue} setInputValue={setInputValue} modalCards={modalCards} setModalCards={setModalCards} />
            <div className="CardsField">
                <div className='wrap'>

                    <BtnAddCard onClick={modalAddCard} style={{ margin: '0px auto', display: 'block' }}>Create new card</BtnAddCard>
                    <MySelect stateOption={stateOption} setStateOption={setStateOption} setChooseTheme={setChooseTheme} selectOptions={selectOptions} />

                    {selectedAndSearchedWord.length !== 0 ? < SetCard setIndex={setIndex} inputValue={inputValue} editCard={editCard} setEditCard={setEditCard} setModal={setModal} remove={removeCard} Cards={selectedAndSearchedWord} /> : <h4 className='noCards'>Пустота...</h4>}
                </div>
            </div>
        </div >

    )
};
export default Vocabulary;