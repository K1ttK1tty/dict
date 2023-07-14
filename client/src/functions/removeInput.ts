// redux
import { setSearchWord, setInput } from '../store/reducers/upMenu';
// types
import { TRemoveInput } from './functoinModels';
export const removeInput: TRemoveInput = (elem, input, dispatch) => {
    const divElement = elem.target as HTMLDivElement;
    const classElement = divElement.className;

    if (input.isOpen && classElement !== 'ifNotThisThenClose') {
        dispatch(setSearchWord(''));
        dispatch(setInput({ isOpen: false, after: input.after }));
    }
};