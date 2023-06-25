// redux
import { setValidateArr } from '../store/reducers/GamesSlice';
// types
import { AppDispatch } from '../store/store';
import { ICard } from '../store/reducers/authorization/Authorization/AuthTypes';
type FunctType = (
    e: React.MouseEvent<HTMLButtonElement>,
    array: ICard[],
    testByWord: boolean,
    dispatch: AppDispatch,
) => void;
export const validateQuiz: FunctType = (e, array, testByWord, dispatch) => {
    const state: string[] = [];
    e.preventDefault();
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.inptReq');
    if (testByWord) {
        for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index];
            const wordInCard = array[index].word.toLowerCase().split(' ').join('');
            const inputValue = input.value.toLowerCase().split(' ').join('');
            if (wordInCard === inputValue) {
                state.push('trueWord');
            } else if (wordInCard.includes(inputValue) && inputValue !== 'to' && inputValue !== '') {
                state.push('almost');

            } else state.push('falseWord');
        }
        dispatch(setValidateArr(state));
    } else {
        for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index];
            const wordInCard = array[index].translate.toLowerCase().split(' ').join('');
            const inputValue = input.value.toLowerCase().split(' ').join('');
            if (wordInCard === inputValue) {
                state.push('trueWord');
            } else if (wordInCard.includes(inputValue) && inputValue !== 'to' && inputValue !== '') {
                state.push('almost');

            } else state.push('falseWord');
        }
        dispatch(setValidateArr(state));
    }
};