import { setSearchWord } from "../store/upMenu"
import { setInput } from "../store/upMenu"
import { setOptionState } from "../store/select"
import cl from '../components/UI/BtnAddCard/BtnAddCard.module.css';
export const removeInput = (elem, input, chooseTheme, dispatch) => {
    let a = false;
    const idElement = elem.target.id; // simplification
    const classElement = elem.target.className; // simplification
    const btnClass = classElement !== [cl.btnAddCard, 'noClick'].join(' '); // track button click

    if (input.isOpen && idElement != 1 && idElement != 2) {
        dispatch(setSearchWord(''))
        dispatch(setInput({ isOpen: false, after: input.after }))
    };

    if (idElement != 'select1' && idElement != 'select2' && classElement != 'selSVG' && idElement != 'select3') {
        if ((elem.target.parentNode.id == 'options' || chooseTheme) && btnClass) a = true;
        dispatch(setOptionState({ open: false, removeMark: a }))
    };
}