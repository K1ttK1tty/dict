import { FC, useRef, memo } from 'react';
// styles
import style from './InputSearch.module.css';
//redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setSearchWord, setInput } from '../../../store/reducers/upMenu';
const InputSearch: FC = memo(function () {
    const dispatch = useAppDispatch();
    const { input } = useAppSelector(state => state.upMenu);
    const inputElement = useRef<HTMLInputElement | null>(null);

    let isHidden:string = style.inputHidden;
    if (input.isOpen) {
        isHidden = '';
        setTimeout(() => {
            if (inputElement.current) {
                inputElement.current.focus();
            }
        }, 300);
    } else if (inputElement.current) {
        if (inputElement.current) {
            inputElement.current.value = '';
        }
        setTimeout(() => {
            dispatch(setSearchWord(''));
        }, 300);
    }
    const inputClass:string = [style.inputSearch, isHidden].join(' ');
    const handleKey = (key: React.KeyboardEvent) => {
        if (key.key === 'Escape') {
            if (inputElement.current) {
                inputElement.current.blur();
            }
            dispatch(setSearchWord(''));
            dispatch(setInput({ isOpen: false, after: input.after }));
        }
    };

    let typingTimeOut: number | undefined;
    const searching = (value: string) => {
        clearTimeout(typingTimeOut);
        typingTimeOut = setTimeout(() => {
            dispatch(setSearchWord(value));
        }, 400);
    };
    return <input
        onClick={e => e.stopPropagation()}
        placeholder={' Искать'}
        ref={inputElement}
        onKeyDown={handleKey}
        onChange={e => searching(e.target.value)}
        className={inputClass}
    />;
});
export default InputSearch;