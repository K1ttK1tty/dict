import { setSearchWord, setInput, setIsUserMenuOpen } from "../store/reducers/upMenu"
import { setOptionState } from "../store/reducers/authorization/Authorization/AuthSlice"
import cl from '../components/UI/BtnAddCard/BtnAddCard.module.css';
export const removeInput = (elem, input, chooseTheme, optionState, isUserMenuOpen, dispatch) => {
    let a = false;
    const classElement = elem.target.className; // simplification
    const btnClass = classElement !== [cl.btnAddCard, 'noClick'].join(' '); // track button click

    if (input.isOpen && classElement !== 'ifNotThisThenClose') {
        dispatch(setSearchWord(''));
        dispatch(setInput({ isOpen: false, after: input.after }));
    }

    if (optionState.open) {
        if ((elem.target.parentNode.id === 'options' || chooseTheme) && btnClass) a = true;
        if (elem.target.id === 'close') a = false;
        dispatch(setOptionState({ open: false, removeMark: a }));
    }

    if (isUserMenuOpen) {
        dispatch(setIsUserMenuOpen(false))
    }

}