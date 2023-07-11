import { FC, useState, useEffect, useRef, memo } from 'react';
// components
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import SearchParamsMenu from './SearchParamsMenu';
// functions
import { debounce } from '../../../functions/debounce';
// styles
import style from './InputSearch.module.css';
//redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setSearchWord, setInput } from '../../../store/reducers/upMenu';
const InputSearch: FC = memo(function () {
    const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>(0);
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
    const searching = (value: string) => {
        debounce(timeoutId, setTimeoutId, () => dispatch(setSearchWord(value)), 400);
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
                <div
                    className={style.dots}
                    onMouseDown={() => setIsDropDownMenuOpen(!isDropDownMenuOpen)}
                >
                </div>
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