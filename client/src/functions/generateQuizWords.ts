// functions
import { getRandomInt } from './getRandomInt';
// redux
import { setValidateArr, setInputReq } from '../store/reducers/GamesSlice';
// types
import { TDenerateQuizWords } from './functoinModels';
import { ICard } from '../store/reducers/authorization/Authorization/AuthTypes';
export const generateQuizWords: TDenerateQuizWords = (e, inputReq, setTestArray, currentColor, cards, dispatch) => {
    e.preventDefault();
    dispatch(setValidateArr([]));
    dispatch(setInputReq(0));
    const inputsWithAnswer: NodeListOf<HTMLInputElement> = document.querySelectorAll('.inptReq');
    for (let index = 0; index < inputsWithAnswer.length; index++) {
        inputsWithAnswer[index].value = '';
    }

    const arr: ICard[] = [];
    if (currentColor) {
        cards.map(card => {
            if (arr.length > 5) return;
            if (card.color === currentColor) arr.push(card);
        });
    } else {
        for (let index = 0; index < inputReq; index++) {
            arr.push(cards[getRandomInt(cards.length)]);
        }
    }
    setTestArray(arr);
};