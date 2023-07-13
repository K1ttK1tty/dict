// functions
import { getArrayWithRandomValue } from './getRandomInt';
// redux
import { setValidateArr, setInputReq } from '../store/reducers/GamesSlice';
import { setServerMessage } from '../store/reducers/authorization/Authorization/AuthSlice';
// types
import { TDenerateQuizWords } from './functoinModels';
import { ICard } from '../store/reducers/authorization/Authorization/AuthTypes';
export const generateQuizWords: TDenerateQuizWords = (inputReq, setTestArray, currentColor, cards, dispatch) => {
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
        cards.map((card) => {
            if (card.color === currentColor) {
                arrWithColors.push(card);
            }
        });
        arr = getArrayWithRandomValue(arrWithColors, maxIterations);
    } else {
        arr = getArrayWithRandomValue(cards, maxIterations);
    }
    setTestArray(arr);
};