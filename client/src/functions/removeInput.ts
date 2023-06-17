// redux
import { setSearchWord, setInput, setIsUserMenuOpen } from '../store/reducers/upMenu';
import { setOptionState } from '../store/reducers/authorization/Authorization/AuthSlice';
// styles
import cl from '../components/UI/BtnAddCard/BtnAddCard.module.css';
// types
import { AppDispatch } from '../store/store';
import { IInput } from '../store/reducers/upMenu';
import { IOptionState } from '../store/reducers/authorization/Authorization/AuthTypes';
type FunctType = (
    elem: React.MouseEvent<HTMLDivElement>,
    input: IInput,
    chooseTheme: string,
    optionState: IOptionState,
    isUserMenuOpen: boolean,
    dispatch: AppDispatch,
) => void;
export const removeInput: FunctType = (elem, input, chooseTheme, optionState, isUserMenuOpen, dispatch) => {
    let a = false;
    const divElement = elem.target as HTMLDivElement;
    const parentElement = divElement.parentNode as HTMLElement;
    const classElement = divElement.className; // simplification
    const btnClass = classElement !== [cl.btnAddCard, 'noClick'].join(' '); // track button click
    if (input.isOpen && classElement !== 'ifNotThisThenClose') {
        dispatch(setSearchWord(''));
        dispatch(setInput({ isOpen: false, after: input.after }));
    }
    if (optionState.open) {
        if ((divElement.parentNode && parentElement.id === 'options' || chooseTheme) && btnClass) a = true;
        if (divElement.id === 'close') a = false;
        dispatch(setOptionState({ open: false, removeMark: a }));
    }
    if (isUserMenuOpen) {
        dispatch(setIsUserMenuOpen(false));
    }
};