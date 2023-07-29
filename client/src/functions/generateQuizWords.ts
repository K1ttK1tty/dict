import { setInputReq, setValidateArr } from '../store/reducers/GamesSlice';
import { setServerMessage } from '../store/reducers/authorization/Authorization/AuthSlice';
import { ICard } from '../store/storeModels';

import { TDenerateQuizWords } from './functoinModels';

import { getArrayWithRandomValue } from './getRandomInt';

export const generateQuizWords: TDenerateQuizWords = (
    inputReq,
    setTestArray,
    currentColor,
    testByFavorite,
    cards,
    dispatch,
) => {
    if (inputReq > 50) {
        dispatch(setServerMessage('Давай округлим до 50))))'));
        dispatch(setInputReq(50));
        return;
    }
    dispatch(setValidateArr([]));
    const inputsWithAnswer: NodeListOf<HTMLInputElement> = document.querySelectorAll('.inptReq');
    for (let index = 0; index < inputsWithAnswer.length; index++) {
        inputsWithAnswer[index].value = '';
    }

    const maxIterations = inputReq ? inputReq : 5;
    let arr: ICard[] = [];
    const arrWithColors: ICard[] = [];
    if (currentColor) {
        cards.forEach(card => {
            if (card.color === currentColor) {
                arrWithColors.push(card);
            }
        });
        if (arrWithColors.length < 1) {
            dispatch(setServerMessage('Карточек с таким цветом нет.'));
            return;
        }
        arr = getArrayWithRandomValue(arrWithColors, maxIterations);
    } else if (testByFavorite) {
        cards.forEach(card => {
            if (card.favorite === true) {
                arrWithColors.push(card);
            }
        });
        if (arrWithColors.length < 1) {
            dispatch(setServerMessage('В избранном нет карточек.'));
            return;
        }
        arr = getArrayWithRandomValue(arrWithColors, maxIterations);
    } else {
        arr = getArrayWithRandomValue(cards, maxIterations);
    }
    setTestArray(arr);
};
