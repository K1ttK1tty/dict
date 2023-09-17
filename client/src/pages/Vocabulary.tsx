import { FC, memo, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';

import RemoveTheme from '../components/RemoveTheme';
import CardsControl from '../components/UI/CardsControl/CardsControl';
import CardsInfo from '../components/UI/CardsInfo/CardsInfo';
import ColorPicker from '../components/UI/ColorPicker/ColorPicker';
import ModalAddCards from '../components/UI/Modal/ModalAddCards/ModalAddCards';
import ModalDictionary from '../components/UI/Modal/ModalDictionary/ModalDictionary';
import ModalEditCard from '../components/UI/Modal/ModalEditCard/ModalEditCard';
import ModalEditThemes from '../components/UI/Modal/ModalEditThemes/ModalEditThemes';
import SetCard from '../components/UI/WordCard/SetCard';

import { removeInput } from '../functions/removeInput';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useCards } from '../hooks/useCards';

import '../styles/Vocabulary.css';
import '../styles/theme.css';

import {
    setColorModeOn,
    setColorRemoveMode,
    setColorsBeforePaint,
    setCurrentColor,
    setGetCurrentColorMode,
} from '../store/reducers/ColorPicker';

import { IColorObject, IVocabulary } from '../models/models';

import { getSelectedTheme } from '../Tests/StoreTests/Selectors';

const Vocabulary: FC<IVocabulary> = memo(function ({
    isSelectOpen,
    setIsSelectOpen,
    isAttached,
    setIsAttached,
    selectedColorOrNewLabel,
    setSelectedColorOrNewLabel,
}) {
    const [isEditThemesModal, setIsEditThemesModal] = useState<boolean>(false);
    const [color, setColor] = useState<string>('#0dccce');
    const [allElementsArray, setAllElementsArray] = useState<HTMLElement[]>([]);
    const [isAddCardModal, setIsAddCardModal] = useState<boolean>(false);
    const [isEditCardModal, setIsEditCardModal] = useState<boolean>(false);
    const [isDictionaryModal, setIsDictionaryModal] = useState<boolean>(false);

    const modalAdd = useRef<HTMLInputElement | null>(null);
    const modalChangeCard = useRef<HTMLInputElement | null>(null);

    const dispatch = useAppDispatch();
    const { cards } = useAppSelector(state => state.AuthSlice);
    const selectedTheme = useAppSelector(getSelectedTheme);
    const { searchWord, input, isSearchByWord, isLetterCaseInclude } = useAppSelector(state => state.upMenu);
    const colorModeOn = useAppSelector(state => state.ColorPicker.colorModeOn);
    const colorRemoveMode = useAppSelector(state => state.ColorPicker.colorRemoveMode);
    const getCurrentColorMode = useAppSelector(state => state.ColorPicker.getCurrentColorMode);
    const currentColor = useAppSelector(state => state.ColorPicker.currentColor);
    const colorsBeforePaint = useAppSelector(state => state.ColorPicker.colorsBeforePaint);
    // const pageTheme = localStorage.getItem('theme');
    const selectedAndSearchedWord = useCards(
        cards,
        searchWord,
        selectedTheme,
        isSearchByWord,
        isLetterCaseInclude,
        selectedColorOrNewLabel,
    );
    const calculatedArray = useDeferredValue(selectedAndSearchedWord);
    const stale = calculatedArray !== selectedAndSearchedWord;
    const body = document.body;
    let arrOfCurrentElements: HTMLElement[] = useMemo(() => {
        return [];
    }, []);

    const click = (e: MouseEvent) => {
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
    };
    const devMode = () => {
        if (colorModeOn) {
            let isExit = true;
            if (arrOfCurrentElements.length) {
                isExit = window.confirm('Выход из режима редактирования. Сохранить изменения?');
            }

            if (!isExit) {
                // if not save
                arrOfCurrentElements.forEach((elem, index) => {
                    // return to previous colors
                    elem.style.background = colorsBeforePaint[index];
                });
                // arrOfCurrentElements.fore((elem, index) => {
                // });
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
    };
    const removeAllColors = () => {
        if (colorModeOn) {
            const resultArray = allElementsArray.concat(arrOfCurrentElements);

            resultArray.forEach(elem => {
                elem.style.background = '';
            });
            // resultArray.map(elem => {
            //     elem.style.background = '';
            // });

            arrOfCurrentElements = [];
            setAllElementsArray([]);
            dispatch(setColorsBeforePaint([]));
            dispatch(setCurrentColor(''));
            colorObject.light.colors = [];
            colorObject.dark.colors = [];
        }
    };
    const removeCurrent = () => {
        if (colorModeOn) {
            dispatch(setGetCurrentColorMode(false));
            dispatch(setColorRemoveMode(!colorRemoveMode));
        }
        dispatch(setCurrentColor(''));
    };
    const getCurrentColor = () => {
        if (colorModeOn) {
            dispatch(setColorRemoveMode(false));
            dispatch(setGetCurrentColorMode(!getCurrentColorMode));
        }
        dispatch(setCurrentColor(''));
    };

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
        colorsBeforePaint,
    ]);

    const colorObject: IColorObject = useMemo(() => {
        return {
            light: { elements: [], colors: [] },
            dark: { elements: [], colors: [] },
        };
    }, []);

    // проверить как ведут себя массивы элементов при точечном удалении цвета

    // useEffect(() => {
    //     if (pageTheme === 'light') {

    //         colorObject.light.elements = [...allElementsArray];
    //         colorObject.light.colors = [];

    //         for (let index = 0; index < allElementsArray.length; index++) {
    //             const element = allElementsArray[index];
    //             colorObject.light.colors = [...colorObject.light.colors, element.style.background];
    //         }

    //     } else {
    //         colorObject.dark.elements = [...allElementsArray];
    //         colorObject.dark.colors = [];

    //         for (let index = 0; index < allElementsArray.length; index++) {
    //             const element = allElementsArray[index];
    //             colorObject.dark.colors = [...colorObject.dark.colors, element.style.background];
    //         }
    //     }
    // }, [
    //     allElementsArray,
    //     pageTheme,
    //     colorObject.dark,
    //     colorObject.light
    // ]);
    // console.log(pageTheme)
    // console.log(colorObject)
    // console.log(allElementsArray)

    // useEffect(() => {
    //     if (pageTheme === 'light') {
    //         for (let index = 0; index < colorObject.light.elements.length; index++) {
    //             const element = colorObject.light.elements[index];

    //             element.style.background = colorObject.light.colors[index];
    //         }
    //     } else {
    //         for (let index = 0; index < colorObject.dark.elements.length; index++) {
    //             const element = colorObject.dark.elements[index];

    //             element.style.background = colorObject.dark.colors[index];
    //         }
    //     }
    // }, [
    //     pageTheme,
    //     colorObject.dark.colors,
    //     colorObject.dark.elements,
    //     colorObject.light.colors,
    //     colorObject.light.elements
    // ]);

    return (
        <div
            data-testid="vocabulary"
            onMouseDown={e => {
                removeInput(e, input, dispatch);
                setIsSelectOpen({ ...isSelectOpen, open: false });
            }}
            className={'searchWrapper pageContent'}
        >
            <ModalEditCard
                modalChangeCard={modalChangeCard}
                isEditCardModal={isEditCardModal}
                setIsEditCardModal={setIsEditCardModal}
            />
            <ModalAddCards modalAdd={modalAdd} isAddCardModal={isAddCardModal} setIsAddCardModal={setIsAddCardModal} />
            <ModalEditThemes setIsEditThemesModal={setIsEditThemesModal} isEditThemesModal={isEditThemesModal} />
            <ModalDictionary isModal={isDictionaryModal} setIsModal={setIsDictionaryModal} />
            <div className={isAttached ? 'CardsField' : 'CardsField paddingTop124'}>
                <div className="wrap">
                    <CardsControl
                        modalAdd={modalAdd}
                        isAttached={isAttached}
                        setIsAttached={setIsAttached}
                        setIsModal={setIsEditThemesModal}
                        setIsAddCardModal={setIsAddCardModal}
                        isSelectOpen={isSelectOpen}
                        setIsSelectOpen={setIsSelectOpen}
                        setSelectedColorOrNewLabel={setSelectedColorOrNewLabel}
                        selectedColorOrNewLabel={selectedColorOrNewLabel}
                        setIsDictionaryModal={setIsDictionaryModal}
                    />
                    {isAttached.attach && (
                        <CardsInfo
                            selectedColorOrNewLabel={selectedColorOrNewLabel}
                            setIsDictionaryModal={setIsDictionaryModal}
                        />
                    )}
                    {calculatedArray.length ? (
                        <SetCard
                            stale={stale}
                            Cards={calculatedArray}
                            modalChangeCard={modalChangeCard}
                            setIsEditCardModal={setIsEditCardModal}
                            selectedColorOrNewLabel={selectedColorOrNewLabel}
                        />
                    ) : (
                        <RemoveTheme
                            setIsSelectOpen={setIsSelectOpen}
                            isSelectOpen={isSelectOpen}
                            selectedColorOrNewLabel={selectedColorOrNewLabel}
                        />
                    )}
                </div>
            </div>
        </div>
    );
});
export default Vocabulary;
