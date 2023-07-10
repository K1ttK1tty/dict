// redux
import { setValidateArr } from '../store/reducers/GamesSlice';
// types
import { TValidateQuiz, TShared } from './functoinModels';
export const validateQuiz: TValidateQuiz = (e, array, testByWord, dispatch) => {
    const state: string[] = [];
    e.preventDefault();
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.inptReq');
    if (testByWord) {
        for (let index = 0; index < inputs.length; index++) {
            const wordInCard = array[index].translate.toLowerCase().split(' ').join('');
            shared(state, wordInCard, inputs, index);
        }
        dispatch(setValidateArr(state));
    } else {
        for (let index = 0; index < inputs.length; index++) {
            const wordInCard = array[index].word.toLowerCase().split(' ').join('');
            shared(state, wordInCard, inputs, index);
        }
        dispatch(setValidateArr(state));
    }
};
const shared: TShared = (state, wordInCard, inputs, index) => {
    const input = inputs[index];
    const inputValue = input.value.toLowerCase().split(' ').join('');
    if (wordInCard === inputValue) {
        state.push('trueWord');
    } else if (wordInCard.includes(inputValue) && inputValue !== 'to' && inputValue !== '') {
        state.push('almost');

    } else state.push('falseWord');
};