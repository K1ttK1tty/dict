import React, { useRef, memo } from 'react';
// styles
import style from './InputSearch.module.css'
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setSearchWord, setInput } from '../../../store/reducers/upMenu';
const InputSearch = memo(function () {
    const dispatch = useDispatch()
    const searchWord = useSelector(state => state.upMenu.searchWord)
    const input = useSelector(state => state.upMenu.input)
    const inputElement = useRef()

    function handleKey(key) {
        if (key.keyCode === 27) {
            inputElement.current.blur();
            dispatch(setSearchWord(''))
            dispatch(setInput({ isOpen: false, after: input.after }))
        }
    }

    let isHidden = style.inputHidden;
    if (input.isOpen) {
        isHidden = '';
        setTimeout(() => {
            inputElement.current.focus();
        }, 300);
    }
    const inputClass = [style.inputSearch, isHidden].join(' ')

    return <input
        onClick={e => e.stopPropagation()}
        value={searchWord}
        placeholder={' Искать'}
        ref={inputElement}
        onKeyDown={handleKey}
        onChange={e => dispatch(setSearchWord(e.target.value))}
        className={inputClass}
    />
});
export default InputSearch;