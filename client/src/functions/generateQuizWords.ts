// redux
import { setValidateArr, setChanger, setCardsNumber, setInputReq } from '../store/reducers/GamesSlice';
// types
import { TDenerateQuizWords } from './functoinModels';
export const generateQuizWords: TDenerateQuizWords = (e, inputReq, dispatch) => {
    e.preventDefault();
    dispatch(setValidateArr([]));
    dispatch(setCardsNumber(inputReq));
    dispatch(setChanger());
    dispatch(setInputReq(0));
    const inputsWithAnswer: NodeListOf<HTMLInputElement> = document.querySelectorAll('.inptReq');
    for (let index = 0; index < inputsWithAnswer.length; index++) {
        inputsWithAnswer[index].value = '';
    }
};