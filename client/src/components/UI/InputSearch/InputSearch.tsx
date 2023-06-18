import { FC, useState, useEffect, useRef, memo } from 'react';
// components
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import SearchParamsMenu from './SearchParamsMenu';
// styles
import style from './InputSearch.module.css';
//redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setSearchWord, setInput } from '../../../store/reducers/upMenu';
const InputSearch: FC = memo(function () {
    const dispatch = useAppDispatch();
    const { input } = useAppSelector(state => state.upMenu);
    const inputElement = useRef<HTMLInputElement | null>(null);
    const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState<boolean>(false);
    let isHidden = style.blockHidden;
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
    useEffect(() => {
        if (!input.isOpen) {
            setIsDropDownMenuOpen(false);
        }
    }, [input.isOpen]);

    const inputClass = [style.searchBlock, isHidden].join(' ');
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
    return (
        <div className={inputClass} onMouseDown={e => e.stopPropagation()}>
            <input
                placeholder={' Искать'}
                ref={inputElement}
                onKeyDown={handleKey}
                onChange={e => searching(e.target.value)}
                className={style.inputSearch}
            />
            <div
                className={style.dotsWrapper}
                onMouseDown={() => setIsDropDownMenuOpen(!isDropDownMenuOpen)}
            >
                <div className={style.dots} onMouseDown={() => setIsDropDownMenuOpen(!isDropDownMenuOpen)}></div>
            </div>
            <DropDownMenu
                isMenuOpen={isDropDownMenuOpen}
                setIsMenuOpen={setIsDropDownMenuOpen}
                dinamicClassName={style.DropDownMenuClassName}
                content={<SearchParamsMenu />}
            />
        </div>
    );
});
export default InputSearch;