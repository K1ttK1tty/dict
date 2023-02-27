import React, { useRef } from 'react';
import { useCards } from '../hooks/useCards';
// import useScrollbarSize from 'react-scrollbar-size';
//components
import MenuVoc from '../components/MenuVoc';
import SetCard from '../components/UI/WordCard/SetCard';
import BtnAddCard from '../components/UI/BtnAddCard/BtnAddCard';
import MySelect from '../components/UI/MySelect/MySelect';
import ModalEditCard from '../components/UI/Modal/ModalEditCard';
import ModalAddCards from '../components/UI/ModalAddCards/ModalAddCards';
import RemoveTheme from '../components/RemoveTheme';
//functions
import { paramsModal, btnStyle } from '../consts/consts';
import { removeInput } from '../functions/removeInput';
import { modalAddCard } from '../functions/modalAddCard';
//styles
import '../styles/theme.css';
import '../styles/Vocabulary.css';
//redux
import { useSelector, useDispatch } from 'react-redux';

const Vocabulary = function () {
    // const { height, width } = useScrollbarSize();
    //redux  
    const Cards = useSelector(state => state.Cards.cards);
    const searchWord = useSelector(state => state.upMenu.searchWord);
    const input = useSelector(state => state.upMenu.input);
    const chooseTheme = useSelector(state => state.select.chooseTheme);
    const optionState = useSelector(state => state.select.optionState)
    const dispatch = useDispatch();
    const modalAdd = useRef();
    const modalChangeCard = useRef();

    const selectedAndSearchedWord = useCards([...Cards], chooseTheme, searchWord);
    // if (modal || modalCards) paramsModal = { overflow: 'hidden', paddingRight: width };
    return (
        <div
            onClick={elem => removeInput(elem, input, chooseTheme, optionState, dispatch)}
            className={"searchWrapper"}
            style={paramsModal}
        >
            <MenuVoc />
            <ModalEditCard modalChangeCard={modalChangeCard} />
            <ModalAddCards modalAdd={modalAdd} />
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