import { FC, memo, useEffect, useRef, useState } from 'react';

import { debounce } from '../../../functions/debounce';
import { isNotEmpty } from '../../../functions/isNotEmpty';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import style from './InputSearch.module.css';

import { setInput, setSearchWord } from '../../../store/reducers/upMenu';

import DropDownMenu from '../DropDownMenu/DropDownMenu';
import SearchParamsMenu from './SearchParamsMenu';

const InputSearch: FC = memo(function () {
    const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | number>(0);
    const inputElement = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();
    const { input } = useAppSelector(state => state.upMenu);
    let isHidden = style.blockHidden;
    if (input.isOpen) isHidden = '';
    useEffect(() => {
        if (input.isOpen) {
            setTimeout(() => {
                if (inputElement.current) {
                    inputElement.current.focus();
                }
            }, 200);
        }
        if (!input.isOpen) {
            if (inputElement.current) {
                inputElement.current.value = '';
            }
            setIsDropDownMenuOpen(false);
            dispatch(setSearchWord(''));
        }
    }, [input.isOpen, dispatch]);

    const handleKey = (key: React.KeyboardEvent) => {
        if (key.key === 'Escape') {
            if (inputElement.current) {
                inputElement.current.blur();
            }
            dispatch(setSearchWord(''));
            dispatch(setInput({ isOpen: false, after: input.after }));
        }
    };
    const searching = (value: string) => {
        debounce(timeoutId, setTimeoutId, () => dispatch(setSearchWord(value.trim())), 400);
    };
    return (
        <div
            data-testid="inputSearch"
            className={[style.searchBlock, isHidden].join(' ')}
            onMouseDown={e => e.stopPropagation()}
        >
            <input
                data-testid="inputSearchElement"
                placeholder={' Искать'}
                ref={inputElement}
                onKeyDown={handleKey}
                onChange={e => searching(e.target.value)}
                className={style.inputSearch}
            />
            <div
                data-testid="inputSearchDots"
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
