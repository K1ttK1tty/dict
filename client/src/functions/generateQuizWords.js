import { setValidateArr } from "../store/reducers/GamesSlice";
import { setCardsNumber } from "../store/reducers/GamesSlice";
import { setInputReq } from "../store/reducers/GamesSlice";
import { setChanger } from "../store/reducers/GamesSlice";
export const generateQuizWords = (e, inputReq, dispatch) => {
    e.preventDefault();
    dispatch(setValidateArr([]));
    dispatch(setCardsNumber(inputReq));
    dispatch(setChanger())
    dispatch(setInputReq(0));
    let tt = document.querySelectorAll('.inptReq');
    for (let index = 0; index < tt.length; index++) {
        tt[index].value = '';
    };
}