import { setInput, setSearchWord } from '../store/reducers/upMenu';

import { TInputSearchHandler } from './functoinModels';

export const inputSearchHandler: TInputSearchHandler = (e, input, dispatch) => {
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
