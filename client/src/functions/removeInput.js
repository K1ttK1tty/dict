import { setSearchWord, setInput, setIsUserMenuOpen } from "../store/reducers/upMenu"
import { setOptionState } from "../store/reducers/authorization/Authorization/AuthSlice"
import cl from '../components/UI/BtnAddCard/BtnAddCard.module.css';
export const removeInput = (elem, input, chooseTheme, optionState, isUserMenuOpen, dispatch) => {
    let a = false;
    const elemTarget = elem.target
    const classElement = elemTarget.className; // simplification
    const btnClass = classElement !== [cl.btnAddCard, 'noClick'].join(' '); // track button click

    if (input.isOpen && classElement !== 'ifNotThisThenClose') {
        dispatch(setSearchWord(''));
        dispatch(setInput({ isOpen: false, after: input.after }));
    }

    if (optionState.open) {
        if ((elemTarget.parentNode.id === 'options' || chooseTheme) && btnClass) a = true;
        if (elemTarget.id === 'close') a = false;
        dispatch(setOptionState({ open: false, removeMark: a }));
    }

    if (isUserMenuOpen) {
        dispatch(setIsUserMenuOpen(false))
    }

}