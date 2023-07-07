// redux
import { setSearchWord, setInput} from '../store/reducers/upMenu';
import { setOptionState } from '../store/reducers/authorization/Authorization/AuthSlice';
// styles
import cl from '../components/UI/BtnAddCard/BtnAddCard.module.css';
// types
import { TRemoveInput } from './functoinModels';
export const removeInput: TRemoveInput = (elem, input, chooseTheme, optionState, dispatch) => {
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
};