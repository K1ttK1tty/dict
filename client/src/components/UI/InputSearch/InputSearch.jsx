import React, { useRef, memo } from 'react';
// styles
import style from './InputSearch.module.css'
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setSearchWord, setInput } from '../../../store/reducers/upMenu';
const InputSearch = memo(function () {
    const dispatch = useDispatch()
    const { input } = useSelector(state => state.upMenu)
    const inputElement = useRef()

    let isHidden = style.inputHidden;
    if (input.isOpen) {
        isHidden = '';
        setTimeout(() => {
            inputElement.current.focus();
        }, 300);
    } else if (inputElement.current) {
        inputElement.current.value = ''
        setTimeout(() => {
            dispatch(setSearchWord(''))
        }, 300);
    }
    const inputClass = [style.inputSearch, isHidden].join(' ')

    const handleKey = (key) => {
        if (key.keyCode === 27) {
            inputElement.current.blur();
            dispatch(setSearchWord(''))
            dispatch(setInput({ isOpen: false, after: input.after }))
        }
    }

    let typingTimeOut;
    const searching = (value) => {
        clearTimeout(typingTimeOut)
        typingTimeOut = setTimeout(() => {
            dispatch(setSearchWord(value))
        }, 400);
    }

    return <input
        onClick={e => e.stopPropagation()}
        placeholder={' Искать'}
        ref={inputElement}
        onKeyDown={handleKey}
        onChange={e => searching(e.target.value)}
        className={inputClass}
    />
});
export default InputSearch;