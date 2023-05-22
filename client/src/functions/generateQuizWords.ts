// redux
import { setValidateArr, setChanger, setCardsNumber, setInputReq } from '../store/reducers/GamesSlice';
// types
import { AppDispatch } from '../store/store';
type FunctType = (
    e: React.MouseEvent<HTMLButtonElement>,
    inputReq: number,
    dispatch: AppDispatch,
) => void;
export const generateQuizWords:FunctType = (e, inputReq, dispatch) => {
    e.preventDefault();
    dispatch(setValidateArr([]));
    dispatch(setCardsNumber(inputReq));
    dispatch(setChanger());
    dispatch(setInputReq(0));
    const tt:NodeListOf<HTMLInputElement> = document.querySelectorAll('.inptReq');
    for (let index = 0; index < tt.length; index++) {
        tt[index].value = '';
    }
};