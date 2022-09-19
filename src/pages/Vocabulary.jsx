import React from 'react';
import { useState, useMemo } from 'react';
import vocabularyCss from '../styles/Vocabulary.css'
import MenuVoc from '../components/MenuVoc';
import SetCard from '../components/UI/WordCard/SetCard';
import InputAddCard from '../components/UI/InputAddCard/InputAddCard';
import BtnAddCard from '../components/UI/BtnAddCard/BtnAddCard';
import MySelect from '../components/UI/MySelect/MySelect';
import Modal from '../components/UI/Modal/Modal';
const Vocabulary = function () {

    const [searchWord, setSearchWord] = useState('');
    const [chooseTheme, setChooseTheme] = useState('');
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
        {
            word: '1232',
            translate: 'no12341234 1234 1234 1234 1234 123 12 3412 3441 2346dsfg sdfgsdrtgwergsd  sefgewrrgsdfgerg werg sdrg erg werwerun',
            theme: 'noun',
        },
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

    const selectedThemes = useMemo(() => {
        return [...Cards].filter(card => card.theme.toLowerCase().includes(chooseTheme.toLowerCase()));
    }, [chooseTheme, Cards]);

    const selectedAndSearchedWord = useMemo(() => {
        return selectedThemes.filter(card => card.word.toLowerCase().includes(searchWord.toLowerCase()));
    }, [selectedThemes, searchWord])

    const [modal, setModal] = useState(false);


    const [editCard, setEditCard] = useState(
        {
            word: '',
            translate: '',
            theme: '',
        }
    )

    const [index, setIndex] = useState()

    function AddNewCard(e) {
        e.preventDefault()

        if (inputValue.word && inputValue.translate) {
            setCards([...Cards, inputValue])

            setSelectOptions([...selectOptions, inputValue.theme])

            setInputValue({ word: '', translate: '', theme: '', });
        } else {
            window.alert('Поля "Word" и "Translate" должны быть заполнены')
        }

    }


    function removeCard(cardClick) {
        setCards(selectedAndSearchedWord.filter(card => cardClick.word != card.word && cardClick.translate != card.translate))
        console.log(cardClick)
    }

    console.log(selectedAndSearchedWord)

    function removeInput(elem) {
        if (elem.target.id != 1 && elem.target.id != 2) {
            setInput(
                {
                    before: false,
                    after: '',
                }
            )
        }
    }

    return (
        <div onClick={removeInput} className="searchWrapper">
            <MenuVoc input={input} setInput={setInput} searchWord={searchWord} setSearchWord={setSearchWord} cards={Cards} />
            <Modal index={index} Cards={Cards} setCards={setCards} editCard={editCard} setModal={setModal} inputValue={inputValue} setInputValue={setInputValue} modal={modal}></Modal>
            <div className="CardsField">
                <div className='wrap'>

                    <MySelect chooseTheme={chooseTheme} setChooseTheme={setChooseTheme} selectOptions={selectOptions} setSelectOptions={setSelectOptions} />
                    {/* сделать по клику вне селекта его закрытие, перенести состояние в этот компонент */}


                    <form>
                        <InputAddCard placeholder={'Word'} inputValue={inputValue.word} setInputValue={e => setInputValue({ ...inputValue, word: e })}></InputAddCard>
                        <InputAddCard placeholder={'Translate'} inputValue={inputValue.translate} setInputValue={e => setInputValue({ ...inputValue, translate: e })}></InputAddCard>
                        <InputAddCard placeholder={'Theme'} inputValue={inputValue.theme} setInputValue={e => setInputValue({ ...inputValue, theme: e })}></InputAddCard>
                        <BtnAddCard onClick={AddNewCard} type='submit'>Добавить Карточку</BtnAddCard>


                    </form>


                    {selectedAndSearchedWord.length !== 0 ? < SetCard setIndex={setIndex} inputValue={inputValue} editCard={editCard} setEditCard={setEditCard} setModal={setModal} remove={removeCard} Cards={selectedAndSearchedWord} /> : <h4 className='noCards'>Пустота...</h4>}





                </div>














            </div>
        </div >

    )
};
export default Vocabulary;