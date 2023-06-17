import { setInput, setSearchWord } from '../store/reducers/upMenu';
import { IInput } from '../store/reducers/upMenu';
import { AppDispatch } from '../store/store';
type FunctType = (
    e: React.MouseEvent<HTMLDivElement>,
    input: IInput,
    dispatch: AppDispatch
) => void;
export const inputSearchHandler: FunctType = (e, input, dispatch) => {
    const element = e.target as HTMLDivElement;
    if (element.id === '1') {
        return false;
    }
    if (!input.isOpen) {
        dispatch(setInput({ isOpen: true, after: input.after }));
    } else {
        dispatch(setInput({ isOpen: false, after: input.after }));
        dispatch(setSearchWord(''));
    }
};