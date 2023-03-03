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
import { setGetCurrentColorMode } from '../store/ColorPicker';
import { setCurrentColor } from '../store/ColorPicker';
import { setColorsBeforePaint } from '../store/ColorPicker';
import { setToggleWordsOrder } from '../store/Cards';
const Vocabulary = function () {
    // const { height, width } = useScrollbarSize();
    // if (modal || modalCards) paramsModal = { overflow: 'hidden', paddingRight: width };
    //redux  
    const Cards = useSelector(state => state.Cards.cards);
    const searchWord = useSelector(state => state.upMenu.searchWord);
    const input = useSelector(state => state.upMenu.input);
    const chooseTheme = useSelector(state => state.select.chooseTheme);
    const optionState = useSelector(state => state.select.optionState);
    const dispatch = useDispatch();
    const modalAdd = useRef();
    const modalChangeCard = useRef();
    //color-pixel
    const pageTheme = useSelector(state => state.ColorPicker.pageTheme)
    const colorModeOn = useSelector(state => state.ColorPicker.colorModeOn)
    const colorRemoveMode = useSelector(state => state.ColorPicker.colorRemoveMode)
    const getCurrentColorMode = useSelector(state => state.ColorPicker.getCurrentColorMode)
    const currentColor = useSelector(state => state.ColorPicker.currentColor)
    const colorsBeforePaint = useSelector(state => state.ColorPicker.colorsBeforePaint)
    const toggleWordsOrder = useSelector(state => state.Cards.toggleWordsOrder)
    const selectedAndSearchedWord = useCards([...Cards], chooseTheme, searchWord, toggleWordsOrder);
    const [color, setColor] = useState('#0dccce')
    const [allElementsArray, setAllElementsArray] = useState([])
    const body = document.body;
    let arrOfCurrentElements = useMemo(() => {
        return []
    }, [colorModeOn])


    function click(e) {
        const element = e.target;
        if (element.className !== 'noCLick' && element.className !== 'react-colorful__interactive' && element.className !== 'react-colorful__pointer react-colorful__saturation-pointer') {

            if (!arrOfCurrentElements.includes(element)) {
                arrOfCurrentElements.push(element)
                dispatch(setColorsBeforePaint([...colorsBeforePaint, element.style.background]))
            }

            if (colorRemoveMode) element.style.background = '';
            else if (getCurrentColorMode) {

                if (currentColor) element.style.background = currentColor;
                else {

                    dispatch(setCurrentColor(element.style.background))
                    setColor(element.style.background)
                }

            } else element.style.background = color; // paint
        }
    }

    function devMode() {
        if (colorModeOn) {

            let isExit = true;
            if (arrOfCurrentElements.length) {
                isExit = window.confirm('Выход из режима редактирования. Сохранить изменения?');

            }

            if (!isExit) { // if not save
                arrOfCurrentElements.map((elem, index) => { // return to previous colors
                    elem.style.background = colorsBeforePaint[index];
                })
            }

            dispatch(setGetCurrentColorMode(false)) // remove all mods
            dispatch(setColorRemoveMode(false)) // remove all mods

            const y = []
            for (let index = 0; index < arrOfCurrentElements.length; index++) {
                const element = arrOfCurrentElements[index];
                if (!allElementsArray.includes(element)) {
                    y.push(element)
                }
            }

            setAllElementsArray([...allElementsArray].concat(y))
            dispatch(setColorsBeforePaint([]))
        }
        dispatch(setCurrentColor(''))
        dispatch(setColorModeOn(!colorModeOn))
    }
    function removeAllColors() {
        if (colorModeOn) {
            const resultArray = allElementsArray.concat(arrOfCurrentElements)

            resultArray.map(elem => {
                elem.style.background = '';
            })

            arrOfCurrentElements = [];
            setAllElementsArray([]);
            dispatch(setColorsBeforePaint([]));
            dispatch(setCurrentColor(''))
            colorObject.light.colors = []
            colorObject.dark.colors = []
        }
    }
    function removeCurrent() {
        if (colorModeOn) {
            dispatch(setGetCurrentColorMode(false))
            dispatch(setColorRemoveMode(!colorRemoveMode))
        }
        dispatch(setCurrentColor(''))
    }
    function getCurrentColor() {
        if (colorModeOn) {
            dispatch(setColorRemoveMode(false))
            dispatch(setGetCurrentColorMode(!getCurrentColorMode))
        }
        dispatch(setCurrentColor(''))
    }

    useEffect(() => {
        if (colorModeOn) body.addEventListener('click', click)
        else body.removeEventListener('click', click)



        if (colorModeOn) document.body.className = 'paintBrush' // set cursors
        else document.body.className = ''



        return () => {
            body.removeEventListener('click', click)
            document.body.className = ''
        }

    }, [colorModeOn, color, colorRemoveMode, getCurrentColorMode, arrOfCurrentElements.length, currentColor, colorsBeforePaint]);

    const colorObject = useMemo(() => {
        return {
            light: { elements: [], colors: [] },
            dark: { elements: [], colors: [] }
        }

    }, [])

    // проверить как ведут себя массивы элементов при точечном удалении цвета
    useEffect(() => {

        if (pageTheme === 'light') {

            colorObject.light.elements = [...allElementsArray]
            colorObject.light.colors = []

            for (let index = 0; index < allElementsArray.length; index++) {
                const element = allElementsArray[index];
                colorObject.light.colors = [...colorObject.light.colors, element.style.background]
            }

        } else {
            colorObject.dark.elements = [...allElementsArray]
            colorObject.dark.colors = []

            for (let index = 0; index < allElementsArray.length; index++) {
                const element = allElementsArray[index];
                colorObject.dark.colors = [...colorObject.dark.colors, element.style.background]
            }

        }

    }, [allElementsArray]);
    // console.log(pageTheme)
    console.log(colorObject)
    console.log(allElementsArray)


    useEffect(() => {

        if (pageTheme === 'light') {

            for (let index = 0; index < colorObject.light.elements.length; index++) {
                const element = colorObject.light.elements[index];

                element.style.background = colorObject.light.colors[index]

            }
        } else {

            for (let index = 0; index < colorObject.dark.elements.length; index++) {
                const element = colorObject.dark.elements[index];

                element.style.background = colorObject.dark.colors[index]

            }
        }
    }, [pageTheme]);


    return (
        <div
            onClick={elem => removeInput(elem, input, chooseTheme, optionState, dispatch)}
            className={'searchWrapper'}
            style={paramsModal}
        >
            <MenuVoc />
            <div className='wordsCount'>Всего слов: {Cards.length} </div>
            <div className='inputOrder' >Алфавитный порядок: <input defaultChecked={true} onChange={() => dispatch(setToggleWordsOrder())} type="checkbox" /></div>
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
                        style={{ background: colorRemoveMode ? 'green' : 'teal', color: 'white', width: '100px', cursor: 'pointer', marginBottom: '20px', textAlign: 'center', borderRadius: '20px', padding: '5px' }}
                    >Выборочно отменить {colorRemoveMode ? 'on' : 'off'}</div>

                    <div
                        className='noCLick'
                        onClick={getCurrentColor}
                        style={{ background: getCurrentColorMode ? 'green' : 'teal', color: 'white', width: '100px', cursor: 'pointer', marginBottom: '20px', textAlign: 'center', borderRadius: '20px', padding: '5px' }}
                    > {currentColor ? 'Крашу в ' + currentColor : "Копирую"}</div>

                    <div
                        className='noCLick'
                        onClick={removeAllColors}
                        style={{ background: 'pink', color: 'black', width: '100px', cursor: 'pointer', marginBottom: '20px', textAlign: 'center', borderRadius: '20px', padding: '5px' }}
                    >Убрать все цвета</div>


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