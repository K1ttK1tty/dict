import React, { useRef, useState, useEffect, useMemo } from 'react';
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
//functions and consts
import { paramsModal, btnStyle } from '../consts/consts';
import { removeInput } from '../functions/removeInput';
import { modalAddCard } from '../functions/modalAddCard';
//styles
import '../styles/theme.css';
import '../styles/Vocabulary.css';
//color-picker
import ColorPicker from '../components/UI/ColorPicker/ColorPicker';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setColorModeOn } from '../store/ColorPicker';
import { setColorRemoveMode } from '../store/ColorPicker';

const Vocabulary = function () {
    // const { height, width } = useScrollbarSize();
    //redux  
    const Cards = useSelector(state => state.Cards.cards);
    const searchWord = useSelector(state => state.upMenu.searchWord);
    const input = useSelector(state => state.upMenu.input);
    const chooseTheme = useSelector(state => state.select.chooseTheme);
    const optionState = useSelector(state => state.select.optionState);
    const colorModeOn = useSelector(state => state.ColorPicker.colorModeOn)
    const colorRemoveMode = useSelector(state => state.ColorPicker.colorRemoveMode)
    const dispatch = useDispatch();
    const modalAdd = useRef();
    const modalChangeCard = useRef();

    const selectedAndSearchedWord = useCards([...Cards], chooseTheme, searchWord);
    // if (modal || modalCards) paramsModal = { overflow: 'hidden', paddingRight: width };
    const [color, setColor] = useState('#fff')
    const [array, setArray] = useState([])
    const body = document.body
    let arrOfElements = useMemo(() => {
        return []
    }, [])

    function click(e) {
        const element = e.target;
        console.log(colorRemoveMode)
        if (element.className !== 'noCLick' && element.className !== 'react-colorful__interactive' && element.className !== 'react-colorful__pointer react-colorful__saturation-pointer') {
            if (colorRemoveMode) {
                element.style.background = '';
            } else {
                element.style.background = color;
                if (!arrOfElements.includes(element)) arrOfElements.push(element)
            }
        }
    }

    function devMode() {
        if (colorModeOn) {
            const isExit = window.confirm('Выход из режима редактирования. Сохранить изменения?');
            setArray(arrOfElements)
            if (!isExit) arrOfElements = []
        }
        dispatch(setColorModeOn(!colorModeOn))
    }
    function removeAllColors() {
        console.log('remove')
        console.log(array)

        array.map(elem => {
            elem.style.background = '';
        })
    }
    function removeCurrent() {
        dispatch(setColorRemoveMode(!colorRemoveMode))
    }

    useEffect(() => {
        if (colorModeOn) body.addEventListener('click', click)
        else body.removeEventListener('click', click)

        return () => body.removeEventListener('click', click)
    }, [colorModeOn, color, colorRemoveMode]);

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

                    <ColorPicker color={color} setColor={setColor} />

                    <div
                        className='noCLick'
                        onClick={devMode}
                        style={{ background: colorModeOn ? 'red' : 'teal', color: 'white', width: '100px', cursor: 'pointer', marginBottom: '20px', textAlign: 'center', borderRadius: '20px', padding: '5px' }}
                    >Change mode {colorModeOn ? 'on' : 'off'}</div>

                    <div
                        className='noCLick'
                        onClick={removeCurrent}
                        style={{ background: 'teal', color: 'white', width: '100px', cursor: 'pointer', marginBottom: '20px', textAlign: 'center', borderRadius: '20px', padding: '5px' }}
                    >Выборочно отменить {colorRemoveMode ? 'on' : 'off'}</div>

                    <div
                        className='noCLick'
                        onClick={removeAllColors}
                        style={{ background: 'pink', color: 'black', width: '100px', cursor: 'pointer', marginBottom: '20px', textAlign: 'center', borderRadius: '20px', padding: '5px' }}
                    >Отменить изменения</div>

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