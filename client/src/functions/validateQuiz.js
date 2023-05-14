import { setValidateArr } from "../store/reducers/GamesSlice"
export const validateQuiz = (e, array, setCardsGame, dispatch) => {
    const state = [];
    e.preventDefault();
    const inputs = document.querySelectorAll('.inptReq');
    for (let index = 0; index < inputs.length; index++) {
        const input = inputs[index];

        const wordInCard = array[index].word.toLowerCase().split(' ').join('');
        const inputValue = input.value.toLowerCase().split(' ').join('');

        if (wordInCard === inputValue) {
            state.push('trueWord')
        } else if (wordInCard.includes(inputValue) && inputValue !== 'to' && inputValue !== '') {
            state.push('almost')

        } else state.push('falseWord')

    }
    setCardsGame([])
    dispatch(setValidateArr(state));
}