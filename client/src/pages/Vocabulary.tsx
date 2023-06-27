import { FC, useRef, useState, useEffect, useMemo, memo } from 'react';
// hooks
import { useCards } from '../hooks/useCards';
//components
import SetCard from '../components/UI/WordCard/SetCard';
import ModalEditCard from '../components/UI/Modal/ModalEditCard/ModalEditCard';
import ModalAddCards from '../components/UI/Modal/ModalAddCards/ModalAddCards';
import RemoveTheme from '../components/RemoveTheme';
import CardsControl from '../components/UI/CardsControl/CardsControl';
import CardsInfo from '../components/UI/CardsInfo/CardsInfo';
import ScrollToTop from '../components/UI/ScrollToTop/ScrollToTop';
import ModalEditThemes from '../components/UI/Modal/ModalEditThemes/ModalEditThemes';
//functions 
import { removeInput } from '../functions/removeInput';
//styles
import '../styles/theme.css';
import '../styles/Vocabulary.css';
import btnStyle from '../components/UI/Modal/ModalAddCards/FormAddCard.module.css';
// import btnStyle from '../components/UI/ModalAddCards/FormAddCard.module.css';
//color-picker
import ColorPicker from '../components/UI/ColorPicker/ColorPicker';
//redux
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
    setColorModeOn,
    setColorRemoveMode,
    setGetCurrentColorMode,
    setCurrentColor,
    setColorsBeforePaint
} from '../store/reducers/ColorPicker';
// types
import { IColorObject } from '../models/models';
interface IVocabulary {
    doubleRowCards: boolean;
    setDoubleRowCards: (state: boolean) => void;
    wordsOrder: boolean;
    setWordsOrder: (state: boolean) => void;
}
const Vocabulary: FC<IVocabulary> = memo(function ({ doubleRowCards, setDoubleRowCards, wordsOrder, setWordsOrder }) {
    const [isAttached, setIsAttached] = useState<boolean>(true);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    // authorization
    const { cards } = useAppSelector(state => state.AuthSlice);
    //redux  
    const { searchWord,
        input,
        isSearchByWord,
        isLetterCaseInclude
    } = useAppSelector(state => state.upMenu);
    const { chooseTheme, optionState } = useAppSelector(state => state.AuthSlice);
    const dispatch = useAppDispatch();
    const modalAdd = useRef<HTMLInputElement | null>(null);
    const modalChangeCard = useRef<HTMLInputElement | null>(null);
    //color-pixelwindow
    // const pageTheme = useAppSelector(state => state.ColorPicker.pageTheme);
    const pageTheme = localStorage.getItem('theme');
    const colorModeOn = useAppSelector(state => state.ColorPicker.colorModeOn);
    const colorRemoveMode = useAppSelector(state => state.ColorPicker.colorRemoveMode);
    const getCurrentColorMode = useAppSelector(state => state.ColorPicker.getCurrentColorMode);
    const currentColor = useAppSelector(state => state.ColorPicker.currentColor);
    const colorsBeforePaint = useAppSelector(state => state.ColorPicker.colorsBeforePaint);
    const selectedAndSearchedWord = useCards(
        cards,
        searchWord,
        chooseTheme,
        wordsOrder,
        isSearchByWord,
        isLetterCaseInclude,
    );
    const [color, setColor] = useState<string>('#0dccce');
    const [allElementsArray, setAllElementsArray] = useState<HTMLElement[]>([]);
    const body = document.body;
    let arrOfCurrentElements: HTMLElement[] = useMemo(() => {
        return [];
    }, []);

    function click(e: MouseEvent) {
        const element = e.target as HTMLElement;
        if (
            element.className !== 'noCLick' &&
            element.className !== 'react-colorful__interactive' &&
            element.className !== 'react-colorful__pointer react-colorful__saturation-pointer'
        ) {

            if (!arrOfCurrentElements.includes(element)) {
                arrOfCurrentElements.push(element);
                dispatch(setColorsBeforePaint([...colorsBeforePaint, element.style.background]));
            }

            if (colorRemoveMode) element.style.background = '';
            else if (getCurrentColorMode) {

                if (currentColor) element.style.background = currentColor;
                else {
                    dispatch(setCurrentColor(element.style.background));
                    setColor(element.style.background);
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
                });
            }

            dispatch(setGetCurrentColorMode(false)); // remove all mods
            dispatch(setColorRemoveMode(false)); // remove all mods

            const y = [];
            for (let index = 0; index < arrOfCurrentElements.length; index++) {
                const element = arrOfCurrentElements[index];
                if (!allElementsArray.includes(element)) {
                    y.push(element);
                }
            }

            setAllElementsArray([...allElementsArray].concat(y));
            dispatch(setColorsBeforePaint([]));
        }
        dispatch(setCurrentColor(''));
        dispatch(setColorModeOn(!colorModeOn));
    }
    function removeAllColors() {
        if (colorModeOn) {
            const resultArray = allElementsArray.concat(arrOfCurrentElements);

            resultArray.map(elem => {
                elem.style.background = '';
            });

            arrOfCurrentElements = [];
            setAllElementsArray([]);
            dispatch(setColorsBeforePaint([]));
            dispatch(setCurrentColor(''));
            colorObject.light.colors = [];
            colorObject.dark.colors = [];
        }
    }
    function removeCurrent() {
        if (colorModeOn) {
            dispatch(setGetCurrentColorMode(false));
            dispatch(setColorRemoveMode(!colorRemoveMode));
        }
        dispatch(setCurrentColor(''));
    }
    function getCurrentColor() {
        if (colorModeOn) {
            dispatch(setColorRemoveMode(false));
            dispatch(setGetCurrentColorMode(!getCurrentColorMode));
        }
        dispatch(setCurrentColor(''));
    }

    useEffect(() => {
        if (colorModeOn) body.addEventListener('click', click);
        else body.removeEventListener('click', click);

        if (colorModeOn) document.body.className = 'paintBrush'; // set cursors
        else document.body.className = '';

        return () => {
            body.removeEventListener('click', click);
            document.body.className = '';
        };

    }, [
        colorModeOn,
        color,
        colorRemoveMode,
        getCurrentColorMode,
        arrOfCurrentElements.length,
        currentColor,
        colorsBeforePaint
    ]
    );

    const colorObject: IColorObject = useMemo(() => {
        return {
            light: { elements: [], colors: [] },
            dark: { elements: [], colors: [] }
        };
    }, []);

    // проверить как ведут себя массивы элементов при точечном удалении цвета
    useEffect(() => {

        if (pageTheme === 'light') {

            colorObject.light.elements = [...allElementsArray];
            colorObject.light.colors = [];

            for (let index = 0; index < allElementsArray.length; index++) {
                const element = allElementsArray[index];
                colorObject.light.colors = [...colorObject.light.colors, element.style.background];
            }

        } else {
            colorObject.dark.elements = [...allElementsArray];
            colorObject.dark.colors = [];

            for (let index = 0; index < allElementsArray.length; index++) {
                const element = allElementsArray[index];
                colorObject.dark.colors = [...colorObject.dark.colors, element.style.background];
            }
        }
    }, [
        allElementsArray,
        pageTheme,
        colorObject.dark,
        colorObject.light
    ]);
    // console.log(pageTheme)
    // console.log(colorObject)
    // console.log(allElementsArray)

    useEffect(() => {
        if (pageTheme === 'light') {
            for (let index = 0; index < colorObject.light.elements.length; index++) {
                const element = colorObject.light.elements[index];

                element.style.background = colorObject.light.colors[index];
            }
        } else {
            for (let index = 0; index < colorObject.dark.elements.length; index++) {
                const element = colorObject.dark.elements[index];

                element.style.background = colorObject.dark.colors[index];
            }
        }
    }, [
        pageTheme,
        colorObject.dark.colors,
        colorObject.dark.elements,
        colorObject.light.colors,
        colorObject.light.elements
    ]);

    return (
        <div
            // onScroll={() => console.log(document.body.scrollTop)}
            onMouseDown={e => removeInput(e, input, chooseTheme, optionState, dispatch)}
            className={'searchWrapper pageContent'}
        >
            <ScrollToTop />
            <ModalEditCard modalChangeCard={modalChangeCard} />
            <ModalAddCards modalAdd={modalAdd} />
            <ModalEditThemes
                isOpenModal={isOpenModal}
                setIsModal={setIsOpenModal}
            />
            <div className={isAttached ? 'CardsField' : 'CardsField paddingTop124'}>
                <div className="wrap">
                    <CardsControl
                        btnStyle={btnStyle}
                        modalAdd={modalAdd}
                        isAttached={isAttached}
                        setIsAttached={setIsAttached}
                        doubleRowCards={doubleRowCards}
                        setDoubleRowCards={setDoubleRowCards}
                        isOpenModal={isOpenModal}
                        setIsModal={setIsOpenModal}
                        wordsOrder={wordsOrder}
                        setWordsOrder={setWordsOrder}
                    />
                    {
                        isAttached &&
                        <CardsInfo
                            doubleRowCards={doubleRowCards}
                            setDoubleRowCards={setDoubleRowCards}
                            wordsOrder={wordsOrder}
                            setWordsOrder={setWordsOrder}
                        />}

                    {
                        /* <ColorPicker color={color} setColor={setColor} />
                        <div
                            className="noCLick"
                            onClick={devMode}
                            style={
                                {
                                    background: colorModeOn ? 'red' : 'teal', color: 'white', width: '100px',
                                    cursor: 'pointer', marginBottom: '20px', textAlign: 'center', borderRadius: '20px',
                                    padding: '5px'
                                }
                            }
                        >
                        Change mode {colorModeOn ? 'on' : 'off'}
                        </div>
                        <div
                            className="noCLick"
                            onClick={removeCurrent}
                            style={
                                {
                                    background: colorRemoveMode ? 'green' : 'teal', color: 'white', width: '100px',
                                    cursor: 'pointer', marginBottom: '20px', textAlign: 'center',
                                    borderRadius: '20px', padding: '5px'
                                }
                            }
                        >
                        Выборочно отменить {colorRemoveMode ? 'on' : 'off'}
                        </div>
    
                        <div
                            className="noCLick"
                            onClick={getCurrentColor}
                            style={
                                {
                                    background: getCurrentColorMode ? 'green' : 'teal', color: 'white',
                                    width: '100px', cursor: 'pointer', marginBottom: '20px', textAlign: 'center',
                                    borderRadius: '20px', padding: '5px'
                                }
                            }
                        >
                         {currentColor ? 'Крашу в ' + currentColor : 'Копирую'}
                         </div>
    
                        <div
                            className="noCLick"
                            onClick={removeAllColors}
                            style={{
                                background: 'pink', color: 'black', width: '100px', cursor: 'pointer',
                                marginBottom: '20px', textAlign: 'center', borderRadius: '20px', padding: '5px'
                            }}
                        >
                        Убрать все цвета
                        </div> */
                    }
                    {
                        selectedAndSearchedWord.length
                            ? < SetCard
                                Cards={selectedAndSearchedWord}
                                modalChangeCard={modalChangeCard}
                                doubleRowCards={doubleRowCards}
                            />
                            : <RemoveTheme />
                    }
                </div>
            </div>
        </div >
    );
});
export default Vocabulary;