import { setValidateArr } from "../store/GamesSlice";
import { setCardsNumber } from "../store/GamesSlice";
import { setInputReq } from "../store/GamesSlice";
import { setChanger } from "../store/GamesSlice";
export const FGenerate = (e, inputReq,  dispatch) => {
    e.preventDefault();
    dispatch(setValidateArr([]));
    dispatch(setCardsNumber(inputReq));
    dispatch(setChanger())
    dispatch(setInputReq(''));
    let tt = document.querySelectorAll('.inptReq');
    for (let index = 0; index < tt.length; index++) {
        tt[index].value = '';
    };
}